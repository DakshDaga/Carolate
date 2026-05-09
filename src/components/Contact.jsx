import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

// Instagram SVG icon
function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

// WhatsApp SVG icon
function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.554 4.112 1.52 5.843L.057 23.625a.625.625 0 0 0 .763.776l5.88-1.522A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.66-.5-5.19-1.367l-.37-.214-3.49.903.926-3.396-.234-.384A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'expo.out' },
      });

      tl.fromTo(headingRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(subRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo(btnsRef.current, { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.4')
        .fromTo(footerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="contact">
      {/* Background decoration */}
      <div className={styles.bgDeco} />

      <div className={styles.inner}>
        <p className={styles.eyebrow}>GET IN TOUCH</p>
        <h2 ref={headingRef} className={styles.heading}>Ready to taste it?</h2>
        <p ref={subRef} className={styles.sub}>
          Carolate is made in small batches — reach out directly to order yours.<br />
          We'd love to hear from you.
        </p>

        <div ref={btnsRef} className={styles.buttons}>
          <a
            href="https://www.instagram.com/carolate.co?igsh=NThpaWJrOGFqZW93"
            target="_blank"
            rel="noreferrer"
            className={`${styles.btn} ${styles.btnInstagram}`}
          >
            <InstagramIcon />
            <span>DM on Instagram</span>
          </a>
          <a
            href="https://wa.me/9925227278"
            target="_blank"
            rel="noreferrer"
            className={`${styles.btn} ${styles.btnWhatsApp}`}
          >
            <WhatsAppIcon />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <p className={styles.handle}></p>
      </div>

      {/* Footer */}
      <footer ref={footerRef} className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerBrand}>Carolate</span>
          <span className={styles.footerDivider}>·</span>
          <span className={styles.footerTagline}>Chocolate, Reimagined.</span>
          <span className={styles.footerDivider}>·</span>
          <span className={styles.footerTagline}>Homemade with love and Lion's Mane, 2026</span>
        </div>
      </footer>
    </section>
  );
}
