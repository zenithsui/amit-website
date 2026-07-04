import { useRef, useEffect, useState } from 'react';

const BASE = import.meta.env.BASE_URL;

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
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

export default function AboutSection() {
  const { ref, inView } = useInView();
  const { ref: imgRef, inView: imgInView } = useInView(0.1);

  return (
    <section style={{
      background: 'var(--color-bg)',
      padding: 'clamp(80px, 10vw, 140px) var(--grid-margin)',
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(40px, 6vw, 100px)',
        alignItems: 'start',
      }}>
        {/* Left column */}
        <div ref={ref}>
          {/* Top rule */}
          <div style={{
            width: '100%',
            height: 1,
            background: 'var(--color-text)',
            opacity: 0.15,
            marginBottom: 40,
          }} />

          {/* Tagline row: label + image */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 40 }}>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(18px, 1.6vw, 24px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              flex: '0 0 auto',
            }}>
              Floema®<br />Est. 2007
            </h4>

            <div ref={imgRef} style={{
              flex: 1,
              borderRadius: 4,
              overflow: 'hidden',
              aspectRatio: '0.72',
              opacity: imgInView ? 1 : 0,
              transform: imgInView ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}>
              <img
                src={`${BASE}images/cnc-milling-machine-carving-a-51d0147a54.jpg`}
                alt="CNC milling machine carving a rectangular groove"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 3vw, 48px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(30px)',
            transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
          }}>
            Going beyond the expected is our calling. True sustainability demands creativity to be aligned with strict principles and answer to the highest standards. It keeps us on a journey of innovation, meticulously crafting each project to keep the environment on our side.
          </h2>
        </div>

        {/* Right column: large image */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          paddingTop: 80,
        }}>
          <div style={{
            borderRadius: 4,
            overflow: 'hidden',
            aspectRatio: '0.85',
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(40px)',
            transition: 'opacity 1s ease 0.35s, transform 1s ease 0.35s',
          }}>
            <img
              src={`${BASE}images/mata-nacional-do-bussaco-floem-e2f5e3b946.jpg`}
              alt="Mata Nacional do Buçaco — Floema"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div style={{
            borderRadius: 4,
            overflow: 'hidden',
            aspectRatio: '1.6',
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(40px)',
            transition: 'opacity 1s ease 0.5s, transform 1s ease 0.5s',
          }}>
            <img
              src={`${BASE}images/floema-details-outdoor-signage-e8739a303d.jpg`}
              alt="Floema outdoor signage details"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
