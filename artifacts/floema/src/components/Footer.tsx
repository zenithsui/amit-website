export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-yellow)',
      color: 'var(--color-text)',
      padding: 'clamp(60px, 8vw, 100px) var(--grid-margin) 40px',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 40,
          marginBottom: 80,
        }}>
          {/* Headquarters */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Headquarters
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--color-stone-700)' }}>
              address
            </p>
          </div>

          {/* Production */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Production
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--color-stone-700)' }}>
              address
            </p>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              AMIT
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--color-stone-700)' }}>
              email address
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(36,31,33,0.2)', marginBottom: 40 }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24,
        }}>
          {/* AMIT wordmark */}
          <a href="#" aria-label="AMIT homepage" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
            }}>
              AMIT
            </span>
          </a>

          {/* Single nav label */}
          <ul style={{ display: 'flex', listStyle: 'none' }}>
            <li>
              <span style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.04em',
                color: 'var(--color-stone-700)',
              }}>
                None
              </span>
            </li>
          </ul>

          {/* Made by */}
          <p style={{ fontSize: 11, color: 'var(--color-stone-700)' }}>made by amit</p>
        </div>
      </div>
    </footer>
  );
}
