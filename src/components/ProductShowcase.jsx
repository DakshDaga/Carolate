import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProductShowcase.module.css';
import chocolateImg from '../../public/carolate_og.png';
import chocolateImg_nutty from '../../public/carolate_nutty.png';
import chocolateImg_gift from '../../public/carolate_gift_pack.png';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: 'classic',
    name: 'Classic Carolate',
    subtitle: 'The Original',
    description: 'Pure carob, lion\'s mane & spirulina. The chocolate that started it all.',
    price: 'Ask to order',
    tag: 'BESTSELLER',
    accent: '#c9982a',
    img: chocolateImg,
  },
  {
    id: 'nutty',
    name: 'Nutty Carolate',
    subtitle: 'With Almonds & Cashews',
    description: 'All the goodness of Classic, with added roasted nut crunch.',
    price: 'Ask to order',
    tag: 'NEW',
    accent: '#8c4a1c',
    img: chocolateImg_nutty,
  },
  {
    id: 'gift',
    name: 'Gift Pack',
    subtitle: 'All Varieties',
    description: 'A curated trio — the perfect way to introduce someone to Carolate.',
    price: 'Ask to order',
    tag: 'GIFT',
    accent: '#c9982a',
    img: chocolateImg_gift,
  },
];

function ProductCard({ product, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'expo.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <div ref={cardRef} className={styles.card} style={{ '--accent': product.accent }}>
      {product.tag && <div className={styles.tag}>{product.tag}</div>}

      <div className={styles.imageWrap}>
        <img src={product.img} alt={product.name} className={styles.image} />
        <div className={styles.imageGlow} />
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardSubtitle}>{product.subtitle}</div>
        <h3 className={styles.cardTitle}>{product.name}</h3>
        <p className={styles.cardDesc}>{product.description}</p>
        <div className={styles.cardFooter}>
          <span className={styles.price}>{product.price}</span>
          <a
            href="https://www.instagram.com/carolate.co?igsh=NThpaWJrOGFqZW93"
            target="_blank"
            rel="noreferrer"
            className={styles.orderBtn}
          >
            DM to Order →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  const headingRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' }
        }
      );
      gsap.fromTo(subRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', delay: 0.2,
          scrollTrigger: { trigger: subRef.current, start: 'top 85%' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="products">
      <div className={styles.header}>
        <p className={styles.eyebrow}>THE COLLECTION</p>
        <h2 ref={headingRef} className={styles.heading}>Our Chocolates</h2>
        <p ref={subRef} className={styles.subheading}>
          Every piece crafted by hand, in small batches.
        </p>
      </div>

      <div className={styles.grid}>
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
