import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Navbar.module.css';

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Fade in on load
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out', delay: 0.5 }
    );

    // Add blur on scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} style={{ opacity: 0 }}>
      <div className={styles.logo}>
        <img src="/carolate_logo.png" alt="Carolate Logo" className={styles.logoImage} />
      </div>
      <ul className={styles.links}>
        <li><button className={styles.link} onClick={() => scrollTo('ingredients')}>Ingredients</button></li>
        <li><button className={styles.link} onClick={() => scrollTo('products')}>Shop</button></li>
        <li><button className={styles.link} onClick={() => scrollTo('story')}>Story</button></li>
        <li>
          <button className={styles.cta} onClick={() => scrollTo('contact')}>
            Order Now
          </button>
        </li>
      </ul>
    </nav>
  );
}
