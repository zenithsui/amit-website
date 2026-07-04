import { useState } from 'react';

const BASE = import.meta.env.BASE_URL;

const COLLECTIONS = [
  {
    id: 'urban',
    label: 'Urban',
    color: '#f76c46',
    images: [
      'bike-rack-frame-857a101949.jpg',
      'community-table-plaza-5314fc0a91.jpg',
      'water-fountain-frame-665ffaeb1f.jpg',
      'directional-sign-frame-3aa445c952.jpg',
      'e-bike-charger-frame-eb0f961c67.jpg',
    ],
    href: '#',
  },
  {
    id: 'nature',
    label: 'Nature',
    color: '#c6af88',
    images: [
      'large-icnf-information-panel-i-e621b691c5.jpg',
      'trail-recycled-plastic-trail-m-400e2f2b08.png',
      'elevated-walkway-38ff78c8a9.jpg',
      'signage-2e72f36e3a.jpg',
    ],
    href: '#',
  },
  {
    id: 'golf',
    label: 'Golf',
    color: '#bacfa3',
    images: [
      'bidos-golf-course-bbdfebc1e0.png',
      'royal-ball-pyramid-28301507f4.jpg',
      'palmer-tee-sign-e3647a360f.png',
      'par-3-beacon-ec646bef6a.png',
    ],
    href: '#',
  },
  {
    id: 'replastic',
    label: 'Replastic',
    color: '#85a1c5',
    images: [
      'signage-02-df24707099.jpg',
      'signage-03-08fbb11b90.jpg',
      'oxalis-planter-faf284ca1c.jpg',
      'signage-04-2053fce52b.jpg',
    ],
    href: '#',
  },
];

export default function TheCollections() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredImgIdx, setHoveredImgIdx] = useState(0);

  const hoveredColl = COLLECTIONS.find(c => c.id === hoveredId);

  return (
    <section style={{
      padding: 'clamp(60px, 8vw, 120px) var(--grid-margin)',
      background: 'var(--color-bg)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <p style={{
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.06em',
        marginBottom: 60,
        color: 'var(--color-stone-500)',
      }}>
        The Collections
      </p>

      {/* Floating hover image */}
      {hoveredColl && (
        <div style={{
          position: 'absolute',
          right: '8%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 320,
          pointerEvents: 'none',
          zIndex: 5,
          opacity: 1,
          transition: 'opacity 0.3s',
        }}>
          <img
            src={`${BASE}images/${hoveredColl.images[hoveredImgIdx % hoveredColl.images.length]}`}
            alt={hoveredColl.label}
            style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 4, boxShadow: '0 20px 60px rgba(36,31,33,0.15)' }}
          />
        </div>
      )}

      {/* Collection list */}
      <div style={{ maxWidth: 800 }}>
        {COLLECTIONS.map((coll, i) => (
          <a
            key={coll.id}
            href={coll.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              padding: '28px 0',
              borderBottom: `1px solid rgba(36,31,33,${i < COLLECTIONS.length - 1 ? 0.12 : 0})`,
              textDecoration: 'none',
              color: 'var(--color-text)',
              transition: 'opacity 0.2s',
              opacity: hoveredId && hoveredId !== coll.id ? 0.4 : 1,
            }}
            onMouseEnter={() => {
              setHoveredId(coll.id);
              setHoveredImgIdx(Math.floor(Math.random() * coll.images.length));
            }}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Icon placeholder */}
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: coll.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <path d="M15.649 14.737H10.245V6.813C10.245 6.514 10.535 6.299 10.821 6.384L16.095 7.968V14.291C16.095 14.536 15.894 14.737 15.649 14.737ZM8.783 14.737H7.32V10.349H2.933V14.737H1.916C1.668 14.737 1.47 14.536 1.47 14.291V3.037H8.337C8.582 3.037 8.783 3.238 8.783 3.483V14.737ZM4.395 14.291V11.812H5.412C5.657 11.812 5.858 12.013 5.858 12.258V14.737H4.841C4.596 14.737 4.395 14.536 4.395 14.291ZM10.245 4.685V1.574H0.008V16.199H17.558V6.881L10.245 4.688V4.685Z" fill="currentColor"/>
              </svg>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              flex: 1,
            }}>
              {coll.label}
            </h3>

            {/* Arrow */}
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" style={{ flexShrink: 0 }}>
              <path d="M14.357 0.464H16.4L20.4 5.593L16.4 10.704H14.357L16.924 7.477C17.156 7.178 17.253 6.973 17.253 6.768C17.253 6.507 17.06 6.339 16.731 6.339H0V4.829H16.731C17.06 4.829 17.253 4.68 17.253 4.4C17.253 4.213 17.156 4.008 16.924 3.71L14.357 0.464Z" fill="currentColor"/>
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}
