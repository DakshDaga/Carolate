import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const scrollHintRef = useRef(null);
  const glowRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(glowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 2.2, ease: 'power2.out' }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 60, letterSpacing: '0.3em' },
        { opacity: 1, y: 0, letterSpacing: '0.08em', duration: 1.4, ease: 'expo.out' },
        '-=1.6'
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.6'
      )
      .fromTo(taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.7'
      )
      .fromTo(scrollHintRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      );

      // Scroll hint pulse
      gsap.to(scrollHintRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: 'sine.inOut',
        delay: 2,
      });

      // Scroll out fade
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '30% top',
          scrub: true,
        },
        opacity: 0,
        y: -60,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      {/* Central glow halo */}
      <div ref={glowRef} className={styles.glow} />

      {/* Content */}
      <div className={styles.content}>
        <p ref={subtitleRef} className={styles.subtitle}>HOMEMADE FUNCTIONAL CHOCOLATE</p>
        <h1 ref={titleRef} className={styles.title}>Carolate</h1>
        <p ref={taglineRef} className={styles.tagline}>
          Chocolate, <em>Reimagined.</em>
        </p>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollHintRef} className={styles.scrollHint}>
        <div className={styles.scrollDot} />
        <svg width="24" height="38" viewBox="0 0 24 38" fill="none">
          <rect x="1" y="1" width="22" height="36" rx="11" stroke="#c9982a" strokeOpacity="0.5" strokeWidth="1.5"/>
          <circle className={styles.scrollCircle} cx="12" cy="10" r="4" fill="#c9982a" opacity="0.8"/>
        </svg>
        <span className={styles.scrollText}>Scroll to explore</span>
      </div>
    </section>
  );
}
