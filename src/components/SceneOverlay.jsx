import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SceneOverlay.module.css';

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    id: 'break',
    start: '20% top',
    end: '40% top',
    title: null,
    sub: 'Breaking the mold...',
    color: '#c9982a',
  },
  {
    id: 'carob',
    start: '45% top',
    end: '63% top',
    title: 'Carob',
    sub: 'Naturally sweet · Cocoa-free · No caffeine',
    color: '#9c5a30',
  },
  {
    id: 'lionsmane',
    start: '58% top',
    end: '78% top',
    title: "Lion's Mane",
    sub: 'Supports brain function · Natural nootropic',
    color: '#d8cfc0',
  },
  {
    id: 'spirulina',
    start: '73% top',
    end: '92% top',
    title: 'Spirulina',
    sub: 'Superfood nutrition · Rich in antioxidants',
    color: '#2d8a50',
  },
];

function PhaseLabel({ phase }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: '#scroll-story',
      start: phase.start,
      end: phase.end,
      onEnter: () =>
        gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }),
      onLeave: () =>
        gsap.to(el, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }),
      onEnterBack: () =>
        gsap.fromTo(el, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }),
      onLeaveBack: () =>
        gsap.to(el, { opacity: 0, y: 20, duration: 0.4 }),
    });
  }, [phase]);

  return (
    <div ref={ref} className={styles.label} style={{ '--phase-color': phase.color }}>
      {phase.title && <div className={styles.title}>{phase.title}</div>}
      <div className={styles.sub}>{phase.sub}</div>
    </div>
  );
}

export default function SceneOverlay() {
  const overlayRef = useRef(null);

  useEffect(() => {
    // Hide the entire overlay the moment the HTML content sections
    // start scrolling into view — i.e., the top of #content-start
    // reaches the bottom of the viewport.
    ScrollTrigger.create({
      trigger: '#content-start',
      start: 'top bottom',
      onEnter: () => {
        if (overlayRef.current) {
          gsap.set(overlayRef.current, { opacity: 0, pointerEvents: 'none' });
        }
      },
      onLeaveBack: () => {
        if (overlayRef.current) {
          gsap.set(overlayRef.current, { opacity: 1, pointerEvents: 'none' });
        }
      },
    });
  }, []);

  return (
    <div ref={overlayRef} className={styles.overlay}>
      {PHASES.map((p) => (
        <PhaseLabel key={p.id} phase={p} />
      ))}
    </div>
  );
}
