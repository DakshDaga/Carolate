import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './IngredientSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const INGREDIENTS = [
  {
    id: 'carob',
    name: 'Carob',
    imageSrc: '/img_carob.png',
    accentColor: '#8c4a1c',
    glowColor: 'rgba(140, 74, 28, 0.3)',
    tagline: 'The soul of every bar.',
    facts: [
      { icon: '◆', label: 'Cocoa-Free', desc: 'No theobromine, no crash' },
      { icon: '◆', label: 'Naturally Sweet', desc: 'Zero added sugar needed' },
      { icon: '◆', label: 'No Caffeine', desc: 'Enjoy anytime, peacefully' },
    ],
    visualLabel: 'CAROB POWDER',
    bgHue: 'radial-gradient(ellipse at 50% 60%, rgba(93,38,12,0.35) 0%, transparent 70%)',
  },
  {
    id: 'lionsmane',
    name: "Lion's Mane",
    imageSrc: '/img_lionsmane.png',
    accentColor: '#d8cfc0',
    glowColor: 'rgba(220, 210, 190, 0.2)',
    tagline: 'Feed your mind.',
    facts: [
      { icon: '◆', label: 'Brain Function', desc: 'Supports neuroplasticity' },
      { icon: '◆', label: 'Natural Nootropic', desc: 'Clarity without stimulants' },
      { icon: '◆', label: 'Adaptogenic', desc: 'Helps manage daily stress' },
    ],
    visualLabel: "LION'S MANE MUSHROOM",
    bgHue: 'radial-gradient(ellipse at 50% 60%, rgba(210, 200, 180, 0.12) 0%, transparent 70%)',
  },
  {
    id: 'spirulina',
    name: 'Spirulina',
    imageSrc: '/img_spirulina.png',
    accentColor: '#2d8a50',
    glowColor: 'rgba(45, 138, 80, 0.25)',
    tagline: 'Nature\'s superfood.',
    facts: [
      { icon: '◆', label: 'Superfood Nutrition', desc: '60% complete protein' },
      { icon: '◆', label: 'Rich in Antioxidants', desc: 'Phycocyanin powerhouse' },
      { icon: '◆', label: 'Alkalizing', desc: 'Balances your body\'s pH' },
    ],
    visualLabel: 'SPIRULINA',
    bgHue: 'radial-gradient(ellipse at 50% 60%, rgba(18, 65, 35, 0.4) 0%, transparent 70%)',
  },
];

function IngredientCard({ ingredient }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const factsRef = useRef([]);
  const orbRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'center center',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'expo.out' },
      });

      tl.fromTo(orbRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.0 }
      )
      .fromTo(labelRef.current,
        { opacity: 0, y: 10, letterSpacing: '0.5em' },
        { opacity: 1, y: 0, letterSpacing: '0.25em', duration: 0.8 },
        '-=0.5'
      )
      .fromTo(titleRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.9 },
        '-=0.6'
      )
      .fromTo(taglineRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7 },
        '-=0.5'
      )
      .fromTo(factsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
        '-=0.4'
      );

      // Subtle float animation instead of aggressive zooming
      gsap.to(orbRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={styles.ingredientCard}
      id={`ingredient-${ingredient.id}`}
    >
      {/* Background glow */}
      <div className={styles.bgGlow} style={{ background: ingredient.bgHue }} />

      {/* Visual orb */}
      <div ref={orbRef} className={styles.orbWrapper}>
        <div className={styles.softLight} style={{ '--orb-glow': ingredient.glowColor, '--orb-color': ingredient.accentColor }} />
        <img src={ingredient.imageSrc} alt={ingredient.name} className={styles.ingredientImage} />
        <div ref={labelRef} className={styles.orbLabel} style={{ color: ingredient.accentColor }}>
          {ingredient.visualLabel}
        </div>
      </div>

      {/* Text content */}
      <div className={styles.textContent}>
        <h2 ref={titleRef} className={styles.ingredientName} style={{ color: ingredient.accentColor }}>
          {ingredient.name}
        </h2>
        <p ref={taglineRef} className={styles.tagline}>{ingredient.tagline}</p>

        <div className={styles.facts}>
          {ingredient.facts.map((fact, i) => (
            <div
              key={fact.label}
              ref={(el) => (factsRef.current[i] = el)}
              className={styles.fact}
            >
              <span className={styles.factIcon} style={{ color: ingredient.accentColor }}>
                {fact.icon}
              </span>
              <div>
                <div className={styles.factLabel}>{fact.label}</div>
                <div className={styles.factDesc}>{fact.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Separator line */}
      <div className={styles.separator} style={{ background: `linear-gradient(to right, transparent, ${ingredient.accentColor}44, transparent)` }} />
    </div>
  );
}

export default function IngredientSections() {
  return (
    <div className={styles.wrapper} id="ingredients">
      {INGREDIENTS.map((ing) => (
        <IngredientCard key={ing.id} ingredient={ing} />
      ))}
    </div>
  );
}
