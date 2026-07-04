import { useRef, useEffect, useState } from 'react';

const BASE = import.meta.env.BASE_URL;

const COLLECTIONS = [
  {
    index: '01',
    label: 'Urban',
    color: '#f76c46',
    title: 'Signage, furniture, and\nequipment for welcoming urban\nspaces',
    cta: 'SEE URBAN PRODUCTS',
    catalogueLabel: 'Urban Catalogue',
    catalogueDesc: 'Download the full range of our Urban collection',
    heroImg: 'restauradores-square-317bca4940.jpg',
    catalogueImg: 'urban-catalogue-cover-206491cdf3.png',
  },
  {
    index: '02',
    label: 'Outdoor',
    color: '#c6af88',
    title: 'Signage and equipment for all\nfacets of the great outdoors',
    cta: 'SEE OUTDOOR PRODUCTS',
    catalogueLabel: 'Outdoor Catalogue',
    catalogueDesc: 'Download the full range of our Outdoor collection',
    heroImg: 'paiva-walkways-95f82979ce.png',
    catalogueImg: 'large-icnf-information-panel-i-e621b691c5.jpg',
  },
  {
    index: '03',
    label: 'Golf',
    color: '#bacfa3',
    title: 'Refined signage and equipment\nfor exceptional golf courses',
    cta: 'SEE GOLF PRODUCTS',
    catalogueLabel: 'Golf Catalogue',
    catalogueDesc: 'Download the full range of our Golf collection',
    heroImg: 'bidos-golf-course-bbdfebc1e0.png',
    catalogueImg: 'catalogue-golf-collection-6c3650e15e.png',
  },
];

export default function CollectionsCtaSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      const idx = Math.min(COLLECTIONS.length - 1, Math.floor(progress * COLLECTIONS.length));
      setActiveIndex(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const coll = COLLECTIONS[activeIndex];

  return (
    <section
      ref={sectionRef}
      style={{ height: `${COLLECTIONS.length * 300}vh`, position: 'relative' }}
    >
      {/* Sticky panel */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--color-bg)',
      }}>
        {/* Made to Last label */}
        <div style={{
          position: 'absolute',
          top: 32,
          left: 'var(--grid-margin)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          zIndex: 10,
        }}>
          <div style={{ width: 120, height: 1, background: 'var(--color-text)', opacity: 0.3 }} />
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em' }}>Made to Last</p>
        </div>

        {/* Full-bleed hero image */}
        {COLLECTIONS.map((c, i) => (
          <div key={i} style={{
            position: 'absolute',
            inset: 0,
            opacity: i === activeIndex ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}>
            <img
              src={`${BASE}images/${c.heroImg}`}
              alt={c.label}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Dark overlay for text legibility */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(36,31,33,0.55) 0%, rgba(36,31,33,0.1) 60%, transparent 100%)',
            }} />
          </div>
        ))}

        {/* Content overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: `80px var(--grid-margin) 80px`,
          zIndex: 5,
        }}>
          {/* Index + tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#fff', letterSpacing: '0.06em' }}>
              {coll.index}
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: coll.color,
              borderRadius: 100,
              padding: '4px 12px',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'var(--color-text)',
            }}>
              {coll.label}
            </span>
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 3.8vw, 58px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#fff',
            maxWidth: 560,
            marginBottom: 40,
            whiteSpace: 'pre-line',
          }}>
            {coll.title}
          </h2>

          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* CTA Button */}
            <a href="#" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#fff',
              color: 'var(--color-text)',
              padding: '12px 24px',
              borderRadius: 100,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.06em',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-text)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--color-text)'; }}
            >
              {coll.cta}
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                <path d="M8.176 0.464H9.872L13.184 4.864L9.872 9.248H8.176L10.304 6.48C10.496 6.224 10.576 6.048 10.576 5.872C10.576 5.648 10.416 5.504 10.144 5.504H0.576V4.208H10.144C10.416 4.208 10.576 4.08 10.576 3.84C10.576 3.68 10.496 3.504 10.304 3.248L8.176 0.464Z" fill="currentColor"/>
              </svg>
            </a>

            {/* Catalogue download */}
            <a href="#" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              color: '#fff',
              fontSize: 13,
              fontWeight: 500,
              borderBottom: '1px solid rgba(255,255,255,0.4)',
              paddingBottom: 2,
            }}>
              <img
                src={`${BASE}images/${coll.catalogueImg}`}
                alt={coll.catalogueLabel}
                style={{ width: 32, height: 40, objectFit: 'cover', borderRadius: 2 }}
              />
              <span>{coll.catalogueLabel}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 0v8M2 5l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M0 10h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Collection dots */}
        <div style={{
          position: 'absolute',
          right: 'var(--grid-margin)',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          zIndex: 10,
        }}>
          {COLLECTIONS.map((_, i) => (
            <div key={i} style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.4)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}
