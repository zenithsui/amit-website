import { useRef, useEffect, useState } from 'react';

const BASE = import.meta.env.BASE_URL;

function useInView(threshold = 0.1) {
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

const STEPS = [
  {
    title: 'We design',
    description: 'Our products are designed to guarantee functionality and viability',
    image: 'we-design-87e28bccf5.jpg',
    delay: 0,
  },
  {
    title: 'We build',
    description: 'Ensuring the technical and aesthetic aspects stay unaltered',
    image: 'we-build-915141eef1.jpg',
    delay: 0.15,
  },
  {
    title: 'We implement',
    description: 'Every solution is crafted to endure, with minimal environmental impact',
    image: 'we-implement-4e1d6c1191.jpg',
    delay: 0.3,
  },
];

export default function ProcessSection() {
  const { ref, inView } = useInView();

  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 140px) var(--grid-margin)',
      background: 'var(--color-bg)',
    }}>
      <div ref={ref} style={{
        maxWidth: 1400,
        margin: '0 auto',
      }}>
        {/* Top tagline */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          marginBottom: 80,
          alignItems: 'end',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 3.5vw, 56px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(30px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}>
            Made to last, designed to endure.
          </h3>
          <div style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.9s ease 0.2s',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--color-stone-700)' }}>
                Join our community. Sign up for news, updates and more.
              </p>
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: 0 }}>
                <label htmlFor="newsletter-email" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your email *"
                  aria-label="Email address"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: '1px solid rgba(36,31,33,0.2)',
                    borderRight: 'none',
                    borderRadius: '2px 0 0 2px',
                    background: 'transparent',
                    fontSize: 13,
                    outline: 'none',
                    color: 'var(--color-text)',
                  }}
                />
                <button type="submit" style={{
                  padding: '12px 16px',
                  background: 'var(--color-text)',
                  border: '1px solid var(--color-text)',
                  borderRadius: '0 2px 2px 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M6.176 0.464H7.872L11.184 4.864L7.872 9.248H6.176L8.304 6.48C8.496 6.224 8.576 6.048 8.576 5.872C8.576 5.648 8.416 5.504 8.144 5.504H0.576V4.208H8.144C8.416 4.208 8.576 4.08 8.576 3.84C8.576 3.68 8.496 3.504 8.304 3.248L6.176 0.464Z" fill="white"/>
                  </svg>
                </button>
              </form>
              <p style={{ fontSize: 11, color: 'var(--color-stone-500)' }}>
                By submitting your email you agree to our{' '}
                <a href="#" style={{ textDecoration: 'underline' }}>Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>

        {/* 3 steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(20px, 3vw, 40px)',
        }}>
          {STEPS.map((step) => (
            <div key={step.title} style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(60px)',
              transition: `opacity 0.9s ease ${step.delay + 0.3}s, transform 0.9s ease ${step.delay + 0.3}s`,
            }}>
              {/* Image with yellow reveal */}
              <div style={{
                borderRadius: 4,
                overflow: 'hidden',
                aspectRatio: '1.76',
                marginBottom: 20,
                position: 'relative',
              }}>
                <img
                  src={`${BASE}images/${step.image}`}
                  alt={step.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <p style={{
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 10,
                letterSpacing: '-0.01em',
              }}>
                {step.title}
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-stone-700)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
