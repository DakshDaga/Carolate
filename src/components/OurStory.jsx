import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './OurStory.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = elementsRef.current.filter(Boolean);
      
      gsap.fromTo(targets,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="story">
      <div className={styles.inner}>
        <p className={styles.eyebrow} ref={(el) => (elementsRef.current[0] = el)}>OUR STORY</p>
        <h2 className={styles.mainQuote} ref={(el) => (elementsRef.current[1] = el)}>
          "We wanted chocolate <br />
          <span className={styles.highlightItalic}>without compromise."</span>
        </h2>

        <div className={styles.narrative}>
          <p className={styles.paragraph} ref={(el) => (elementsRef.current[2] = el)}>
            Carolate started with a simple frustration — every chocolate bar on the shelf was either
            <br className={styles.breakDesktop} /> delicious and unhealthy, or healthy and terrible.
          </p>
          <p className={styles.paragraph} ref={(el) => (elementsRef.current[3] = el)}>
            So we went back to basics. We chose <span className={styles.highlight}>Carob</span> for its natural sweetness, <span className={styles.highlight}>Lion's Mane</span> for
            <br className={styles.breakDesktop} /> cognitive power, and <span className={styles.highlight}>Spirulina</span> for superfood nutrition. The result? A chocolate that earns its
            <br className={styles.breakDesktop} /> place in your life.
          </p>
          <p className={styles.paragraph} ref={(el) => (elementsRef.current[4] = el)}>
            Homemade. Honest. Intentional.
          </p>
        </div>
      </div>
    </section>
  );
}
