import { useEffect } from 'react';

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutModal({ open, onClose }: AboutModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(36,31,33,0.55)',
          backdropFilter: 'blur(6px)',
          zIndex: 2000,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 'min(540px, 95vw)',
        background: 'var(--color-bg)',
        zIndex: 2001,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Yellow top accent bar */}
        <div style={{
          height: 6,
          background: 'linear-gradient(90deg, var(--color-yellow), #c6af88, var(--color-urban-coral))',
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close about panel"
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(36,31,33,0.07)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            color: 'var(--color-text)',
            transition: 'background 0.2s',
            zIndex: 10,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(36,31,33,0.14)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(36,31,33,0.07)')}
        >
          ✕
        </button>

        {/* Scrollable content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '48px 48px 60px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}>
          {/* Label */}
          <p style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-stone-500)',
            marginBottom: 20,
          }}>
            About Me
          </p>

          {/* Big name */}
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(64px, 12vw, 96px)',
            fontWeight: 400,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: 'var(--color-text)',
            marginBottom: 32,
          }}>
            AMIT
          </h1>

          {/* Info pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}>
            {[
              { label: 'Class', value: '10' },
              { label: 'Age', value: '15 yrs' },
              { label: 'Role', value: 'Student' },
            ].map(({ label, value }) => (
              <div key={label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--color-yellow)',
                borderRadius: 100,
                padding: '8px 18px',
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-stone-700)' }}>
                  {label}
                </span>
                <span style={{ width: 1, height: 14, background: 'rgba(36,31,33,0.25)' }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)' }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Decorative rule */}
          <div style={{
            width: '100%',
            height: 1,
            background: 'linear-gradient(to right, var(--color-text), transparent)',
            opacity: 0.15,
            marginBottom: 40,
          }} />

          {/* Bio section */}
          <div style={{ marginBottom: 48 }}>
            <p style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: 'var(--color-stone-700)',
              marginBottom: 20,
            }}>
              Hi there — I'm <strong style={{ color: 'var(--color-text)' }}>Amit</strong>, a 15-year-old student in Class 10 with a curiosity that never stops. I love exploring how technology, design, and creativity can come together to build things that matter.
            </p>
            <p style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: 'var(--color-stone-700)',
            }}>
              Whether it's designing a website, learning something new, or just dreaming about the future — I bring passion and energy to everything I do. This is my space on the internet. Welcome.
            </p>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
            marginBottom: 48,
            borderRadius: 12,
            overflow: 'hidden',
          }}>
            {[
              { number: '10', label: 'Class' },
              { number: '15', label: 'Years Old' },
              { number: '∞', label: 'Curiosity' },
              { number: '100%', label: 'Passion' },
            ].map(({ number, label }) => (
              <div key={label} style={{
                background: 'var(--color-ivory-100)',
                padding: '28px 24px',
              }}>
                <p style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 40,
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  color: 'var(--color-text)',
                  marginBottom: 6,
                }}>
                  {number}
                </p>
                <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', color: 'var(--color-stone-500)', textTransform: 'uppercase' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div style={{
            background: 'var(--color-yellow)',
            borderRadius: 12,
            padding: '32px 28px',
          }}>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.4,
              color: 'var(--color-text)',
            }}>
              "The best way to learn is to just start building."
            </p>
            <p style={{ marginTop: 16, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--color-stone-700)' }}>
              — AMIT
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
