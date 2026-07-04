import { useEffect, useRef } from 'react';

const BASE = import.meta.env.BASE_URL;

// Floating product images that appear in the hero
const HERO_IMAGES = [
  { src: 'byside-bench-plaza-60698bf091.png', x: 12, y: 18, w: 260, rot: -4 },
  { src: 'liatris-planter-9debdf4802.jpg', x: 72, y: 12, w: 200, rot: 3 },
  { src: 'belleville-bench-3d2a5c98ef.jpg', x: 55, y: 62, w: 220, rot: -2 },
  { src: 'directional-sign-frame-3aa445c952.jpg', x: 22, y: 65, w: 180, rot: 5 },
  { src: 'royal-ball-pyramid-28301507f4.jpg', x: 78, y: 55, w: 190, rot: -3 },
];

export default function HeroSection() {
  const imagesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let animFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.005;
      imagesRef.current.forEach((el, i) => {
        if (!el) return;
        const yOffset = Math.sin(time + i * 1.2) * 8;
        const rot = HERO_IMAGES[i].rot + Math.sin(time * 0.7 + i) * 1.5;
        el.style.transform = `translateY(${yOffset}px) rotate(${rot}deg)`;
      });
      animFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <header style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'var(--color-bg)',
    }}>
      {/* Floating background images */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            ref={(el) => { if (el) imagesRef.current[i] = el; }}
            style={{
              position: 'absolute',
              left: `${img.x}%`,
              top: `${img.y}%`,
              width: img.w,
              transform: `rotate(${img.rot}deg)`,
              transition: 'none',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(36,31,33,0.12)',
              willChange: 'transform',
            }}
          >
            <img
              src={`${BASE}images/${img.src}`}
              alt=""
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      {/* Center title */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 40px' }}>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(44px, 6vw, 88px)',
          fontWeight: 400,
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
          color: 'var(--color-text)',
          maxWidth: 900,
          margin: '0 auto',
        }}>
          Spaces for people,<br />made for life.
        </h1>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        zIndex: 2,
      }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', color: 'var(--color-stone-500)' }}>
          Scroll to Explore ↓
        </p>
      </div>
    </header>
  );
}
