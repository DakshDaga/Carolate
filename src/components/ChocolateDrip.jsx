import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Left drip SVG path data
const LEFT_DRIPS = [
  { delay: 0, dur: 3.2, x: 12, width: 10 },
  { delay: 1.1, dur: 4.0, x: 28, width: 7 },
  { delay: 2.4, dur: 3.6, x: 6, width: 14 },
];
const RIGHT_DRIPS = [
  { delay: 0.6, dur: 3.8, x: -14, width: 9 },
  { delay: 1.8, dur: 3.0, x: -26, width: 12 },
  { delay: 3.0, dur: 4.2, x: -8, width: 7 },
];

function DripStream({ side, delay, dur, offset, width }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({ repeat: -1, delay });
    tl.fromTo(
      el,
      { scaleY: 0, transformOrigin: 'top center', opacity: 0.85 },
      { scaleY: 1, opacity: 1, duration: dur, ease: 'none' }
    ).to(el, { opacity: 0, duration: 0.4, ease: 'power2.in' });

    return () => tl.kill();
  }, [delay, dur]);

  const isLeft = side === 'left';
  const x = isLeft ? offset : window.innerWidth - offset - width;

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        [isLeft ? 'left' : 'right']: offset,
        width: width,
        height: '60vh',
        background: `linear-gradient(to bottom, #3d1a08ee, #1a0a04aa, transparent)`,
        borderRadius: '0 0 50% 50%',
        zIndex: 1,
        transformOrigin: 'top center',
        scaleY: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

export default function ChocolateDrip() {
  return (
    <>
      {LEFT_DRIPS.map((d, i) => (
        <DripStream key={`l${i}`} side="left" delay={d.delay} dur={d.dur} offset={d.x} width={d.width} />
      ))}
      {RIGHT_DRIPS.map((d, i) => (
        <DripStream key={`r${i}`} side="right" delay={d.delay} dur={d.dur} offset={Math.abs(d.x)} width={d.width} />
      ))}
    </>
  );
}
