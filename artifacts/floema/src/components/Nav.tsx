import { useState, useEffect } from 'react';

interface NavProps {
  onAboutClick: () => void;
}

export default function Nav({ onAboutClick }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '0 var(--grid-margin)',
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'background 0.3s ease, box-shadow 0.3s ease',
      background: scrolled ? 'rgba(242,239,234,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      boxShadow: scrolled ? '0 1px 0 rgba(36,31,33,0.08)' : 'none',
    }}>
      {/* Logo — AMIT wordmark */}
      <a href="#" aria-label="AMIT homepage" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 26,
          fontWeight: 400,
          letterSpacing: '-0.03em',
          color: 'var(--color-text)',
          lineHeight: 1,
        }}>
          AMIT
        </span>
      </a>

      {/* Nav links — only PRODUCTS and ABOUT */}
      <ul style={{ display: 'flex', gap: 32, alignItems: 'center', listStyle: 'none' }}>
        <li>
          <a href="#" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: 'var(--color-text)',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            PRODUCTS
          </a>
        </li>
        <li>
          <button
            onClick={onAboutClick}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: 'var(--color-text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              position: 'relative',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.7';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {/* Fancy underline dot */}
            <span style={{ position: 'relative' }}>
              ABOUT
              <span style={{
                position: 'absolute',
                bottom: -4,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'var(--color-urban-coral)',
                display: 'block',
              }} />
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
