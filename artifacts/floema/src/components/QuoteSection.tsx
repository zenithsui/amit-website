import { useRef, useEffect, useState } from 'react';

const BASE = import.meta.env.BASE_URL;

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function QuoteSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(80px, 10vw, 140px) var(--grid-margin)',
        background: 'var(--color-bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Yellow accent block */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: '10%',
        bottom: '10%',
        width: '40%',
        background: 'var(--color-yellow)',
        borderRadius: '4px 0 0 4px',
        transform: inView ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        transition: 'transform 0.8s ease',
        zIndex: 0,
      }} />

      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr',
        gap: 'clamp(40px, 6vw, 100px)',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Left: author card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Author image */}
          <div style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            overflow: 'hidden',
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'scale(0.9)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}>
            <img
              src={`${BASE}images/fernando-pinto---managing-part-2726298e1b.jpg`}
              alt="Fernando Pinto — Managing Partner"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s',
          }}>
            <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Amit</p>
            <p style={{ fontSize: 14, color: 'var(--color-stone-500)' }}>Class 10 Student · 15 Years Old</p>
          </div>

          {/* Description */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
          }}>
            <p style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: 'var(--color-stone-700)',
              maxWidth: 380,
            }}>
              Hi, I'm Amit — a 15-year-old student currently in Class 10. I'm passionate about design, technology, and building things that make a difference in the world around us.
            </p>
            <p style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: 'var(--color-stone-700)',
              maxWidth: 380,
              marginTop: 16,
            }}>
              Learning every day, one project at a time — exploring how great design and sustainability can come together to create spaces people truly love.
            </p>
          </div>

          {/* Landscape image */}
          <div style={{
            borderRadius: 4,
            overflow: 'hidden',
            aspectRatio: '1.4',
            maxWidth: 380,
            opacity: inView ? 1 : 0,
            transition: 'opacity 1s ease 0.6s',
          }}>
            <img
              src={`${BASE}images/berlengas-island--portugal-94ca663ce7.jpg`}
              alt="Berlengas Island, Portugal"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Right: large quote */}
        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(50px)',
          transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(36px, 4.5vw, 68px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--color-text)',
          }}>
            "We think outdoor furniture should look and feel good while doing good for our planet"
          </h2>
        </div>
      </div>
    </section>
  );
}
