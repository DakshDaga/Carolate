import { useEffect, useRef } from 'react';
// Three.js chocolate scene — procedural 3D chocolate bar with scroll-driven burst
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Helper: build one chocolate "chunk" mesh ───────────────────────────────
function makeChunk(w, h, d, color = 0x3d1a08) {
  const geo = new THREE.BoxGeometry(w, h, d, 2, 2, 2);
  // Slightly distort vertices for organic feel
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setX(i, pos.getX(i) + (Math.random() - 0.5) * 0.04);
    pos.setY(i, pos.getY(i) + (Math.random() - 0.5) * 0.04);
    pos.setZ(i, pos.getZ(i) + (Math.random() - 0.5) * 0.04);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.35,
    metalness: 0.15,
    envMapIntensity: 1.2,
  });
  return new THREE.Mesh(geo, mat);
}

// ─── Chocolate bar built from individual segment chunks ──────────────────────
function buildChocolateBar(scene) {
  // Bar made of individual segments, each a separate mesh
  const group = new THREE.Group();
  const COLS = 4; // 4 columns × 2 rows = 8 segments
  const ROWS = 2;
  const segW = 0.45;
  const segH = 0.22;
  const segD = 0.18;
  const gap = 0.04;
  const chunks = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const chunk = makeChunk(segW, segH, segD, 0x3d1a08);
      chunk.position.set(
        (c - (COLS - 1) / 2) * (segW + gap),
        (r - (ROWS - 1) / 2) * (segH + gap),
        0
      );
      chunk.castShadow = true;
      group.add(chunk);

      // Store "home" position for reset and destination vector for explosion
      chunks.push({
        mesh: chunk,
        homeX: chunk.position.x,
        homeY: chunk.position.y,
        homeZ: chunk.position.z,
        // Random radial direction for the burst
        destX: (Math.random() - 0.5) * 6,
        destY: (Math.random() - 0.5) * 4 + 0.5,
        destZ: (Math.random() - 0.5) * 3 - 1,
        rotX: (Math.random() - 0.5) * Math.PI * 4,
        rotY: (Math.random() - 0.5) * Math.PI * 4,
        rotZ: (Math.random() - 0.5) * Math.PI * 2,
      });
    }
  }

  // Groove lines on top face using thin boxes
  for (let r = 0; r < ROWS - 1; r++) {
    const groove = new THREE.Mesh(
      new THREE.BoxGeometry((COLS * (segW + gap)), 0.012, 0.02),
      new THREE.MeshStandardMaterial({ color: 0x220d04, roughness: 0.8 })
    );
    groove.position.set(0, (r - (ROWS - 2) / 2) * (segH + gap) - segH / 2 - gap / 2, segD / 2 + 0.001);
    group.add(groove);
  }
  for (let c = 0; c < COLS - 1; c++) {
    const groove = new THREE.Mesh(
      new THREE.BoxGeometry(0.012, ROWS * (segH + gap), 0.02),
      new THREE.MeshStandardMaterial({ color: 0x220d04, roughness: 0.8 })
    );
    groove.position.set((c - (COLS - 2) / 2) * (segW + gap) - segW / 2 - gap / 2, 0, segD / 2 + 0.001);
    group.add(groove);
  }

  scene.add(group);
  return { group, chunks };
}

// ─── Ingredient particles (flour / powder particles) ────────────────────────
function buildIngredientParticles(color, count = 180) {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    sizes[i] = Math.random() * 18 + 4;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    color,
    size: 0.07,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  return new THREE.Points(geo, mat);
}

// ─── Main component ─────────────────────────────────────────────────────────
export default function ChocolateScene({ scrollContainerRef }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;

    // ── Scene & Camera ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 4.0);

    // ── Lights ──
    // Strong warm ambient — enough to illuminate the dark bar
    const ambientLight = new THREE.AmbientLight(0xffe8b0, 3.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffd580, 8.0);
    keyLight.position.set(2, 3, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4822a, 4.0);
    rimLight.position.set(-3, 1, 2);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffb84a, 5.0, 15);
    fillLight.position.set(0, 0, 3);
    scene.add(fillLight);

    // Golden glow underneath and behind
    const glowLight = new THREE.PointLight(0xf0a800, 4.0, 12);
    glowLight.position.set(0, -1.5, 2);
    scene.add(glowLight);

    const backLight = new THREE.DirectionalLight(0xff9050, 3.0);
    backLight.position.set(0, -1, -3);
    scene.add(backLight);

    // ── Chocolate bar ──
    const { group: barGroup, chunks } = buildChocolateBar(scene);
    barGroup.rotation.x = 0.2;
    barGroup.rotation.y = -0.1;
    // Explicitly center the bar, raised slightly above center
    barGroup.position.set(0, 0.15, 0);
    barGroup.scale.setScalar(1.7);

    // ── Ingredient particles ──
    const carobParticles = buildIngredientParticles(0x8c4a1c, 220);
    const lionsParticles = buildIngredientParticles(0xe8dcc8, 200);
    const spirulinaParticles = buildIngredientParticles(0x2a8a4a, 250);
    scene.add(carobParticles);
    scene.add(lionsParticles);
    scene.add(spirulinaParticles);

    // ── Floating idle animation ──
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl
      .to(barGroup.position, { y: 0.12, duration: 2.5, ease: 'sine.inOut' })
      .to(barGroup.rotation, { y: barGroup.rotation.y + 0.12, duration: 3, ease: 'sine.inOut' }, 0);

    // ── SCROLL TRIGGER MASTER TIMELINE ──
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-story',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });

    // Phase 1 (0–25%): Bar rotates, camera zooms in
    master.to(barGroup.rotation, { x: 0.6, y: 0.8, z: 0.1, duration: 0.25, ease: 'power2.inOut' }, 0);
    master.to(camera.position, { z: 2.8, duration: 0.25, ease: 'power2.inOut' }, 0);

    // Phase 2 (25–45%): BURST — chunks fly outward
    chunks.forEach((c) => {
      master.to(
        c.mesh.position,
        {
          x: c.destX,
          y: c.destY,
          z: c.destZ,
          duration: 0.2,
          ease: 'expo.out',
        },
        0.25
      );
      master.to(
        c.mesh.rotation,
        {
          x: c.rotX,
          y: c.rotY,
          z: c.rotZ,
          duration: 0.2,
          ease: 'expo.out',
        },
        0.25
      );
      // Change chunk color to carob as they burst
      master.to(c.mesh.material.color, { r: 0.55, g: 0.29, b: 0.12, duration: 0.15 }, 0.3);
    });
    master.to(barGroup.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.2 }, 0.25);

    // Phase 2b (45–55%): Carob particles appear, chunks fade
    master.to(carobParticles.material, { opacity: 0.85, duration: 0.1 }, 0.45);
    chunks.forEach((c) => {
      master.to(c.mesh.material, { opacity: 0, transparent: true, duration: 0.08 }, 0.45);
    });
    master.to(fillLight.color, { r: 0.5, g: 0.28, b: 0.08, duration: 0.1 }, 0.45);

    // Phase 3 (55–70%): Carob out, Lion's Mane in
    master.to(carobParticles.material, { opacity: 0, duration: 0.08 }, 0.55);
    master.to(lionsParticles.material, { opacity: 0.82, duration: 0.1 }, 0.58);
    master.to(fillLight.color, { r: 0.85, g: 0.82, b: 0.75, duration: 0.12 }, 0.58);
    master.to(scene.fog?.color || {}, {}, 0.58);

    // Phase 4 (70–90%): Lion's Mane out, Spirulina in
    master.to(lionsParticles.material, { opacity: 0, duration: 0.08 }, 0.70);
    master.to(spirulinaParticles.material, { opacity: 0.88, duration: 0.1 }, 0.73);
    master.to(fillLight.color, { r: 0.15, g: 0.52, b: 0.28, duration: 0.12 }, 0.73);

    // Phase 5 (90–100%): Everything dissolves, camera pulls back
    master.to(spirulinaParticles.material, { opacity: 0, duration: 0.1 }, 0.90);
    master.to(camera.position, { z: 5, duration: 0.1, ease: 'power2.in' }, 0.90);

    sceneRef.current = { renderer, scene, camera, barGroup, floatTl, master };

    // ── Render loop ──
    let animId;
    const tick = () => {
      animId = requestAnimationFrame(tick);
      renderer.render(scene, camera);
    };
    tick();

    // ── Resize ──
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      floatTl.kill();
      master.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
