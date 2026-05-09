import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhyCarolate.module.css';

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  { icon: '☕', title: 'Low Caffeine', desc: 'Sleep without guilt. Enjoy chocolate at any hour without the jitters or dependency.' },
  { icon: '🧠', title: 'Brain-Boosting Formula', desc: "Lion's Mane supports memory and focus. Every chocolate is a gentle cognitive upgrade." },
  { icon: '🌿', title: 'Homemade & Fresh', desc: 'Crafted in small batches, never mass-produced. You taste the difference.' },
  { icon: '✨', title: 'One-of-a-Kind Taste', desc: "You've never had chocolate quite like this. Carob's natural sweetness is unlike anything." },
  { icon: '💚', title: 'Superfood Nutrition', desc: 'Spirulina brings protein, antioxidants, and alkalinity to every single bite.' },
  { icon: '🤝', title: 'Made with Intent', desc: 'No compromise on ingredients. Every recipe crafted by someone who cared.' },
];

function ReasonCard({ reason, index }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.88, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: 'back.out(1.6)',
        delay: (index % 3) * 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <div ref={ref} className={styles.reasonCard}>
      <div className={styles.iconWrap}>{reason.icon}</div>
      <h3 className={styles.reasonTitle}>{reason.title}</h3>
      <p className={styles.reasonDesc}>{reason.desc}</p>
    </div>
  );
}

export default function WhyCarolate() {
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section className={styles.section} id="why">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>THE DIFFERENCE</p>
          <h2 ref={headingRef} className={styles.heading}>Why Carolate?</h2>
        </div>

        <div className={styles.grid}>
          {REASONS.map((r, i) => (
            <ReasonCard key={r.title} reason={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
