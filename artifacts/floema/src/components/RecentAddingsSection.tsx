import { useState } from 'react';

const BASE = import.meta.env.BASE_URL;

const PRODUCTS = [
  {
    name: 'Byside bench Plaza',
    category: 'Urban',
    categoryColor: '#f76c46',
    image: 'byside-bench-plaza-60698bf091.png',
    href: '#',
    colors: 4,
  },
  {
    name: 'Palmer tee sign',
    category: 'Golf',
    categoryColor: '#bacfa3',
    image: 'palmer-tee-sign-e3647a360f.png',
    href: '#',
    colors: 3,
  },
  {
    name: 'Liatris Planter',
    category: 'Urban',
    categoryColor: '#f76c46',
    image: 'liatris-planter-9debdf4802.jpg',
    href: '#',
    colors: 5,
  },
  {
    name: 'Belleville Bench',
    category: 'Urban',
    categoryColor: '#f76c46',
    image: 'belleville-bench-3d2a5c98ef.jpg',
    href: '#',
    colors: 3,
  },
];

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={product.href}
      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
        aspectRatio: '1',
        background: 'var(--color-ivory-100)',
        marginBottom: 16,
      }}>
        <img
          src={`${BASE}images/${product.image}`}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.6s ease',
          }}
        />

        {/* Explore label on hover (inside <a>, so use div not button) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1)' : 'scale(0.92)',
            transition: 'opacity 0.3s, transform 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--color-text)',
            color: 'var(--color-ivory-100)',
            padding: '10px 18px',
            borderRadius: 100,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8.357 2.879H10.4L14.4 8.008L10.4 13.119H8.357L10.924 9.892C11.156 9.594 11.253 9.388 11.253 9.183C11.253 8.922 11.06 8.754 10.731 8.754H1.6V7.244H10.731C11.06 7.244 11.253 7.094 11.253 6.814C11.253 6.628 11.156 6.423 10.924 6.124L8.357 2.879Z" fill="currentColor"/>
          </svg>
          Explore
        </div>

        {/* Colors badge */}
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <span style={{
            fontSize: 11,
            fontWeight: 500,
            color: 'var(--color-text)',
            background: 'rgba(242,239,234,0.9)',
            padding: '3px 10px',
            borderRadius: 100,
          }}>
            Colors +{product.colors}
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 6, color: 'var(--color-text)' }}>
            {product.name}
          </p>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: product.categoryColor,
            borderRadius: 100,
            padding: '3px 10px',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: 'var(--color-text)',
          }}>
            {product.category}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function RecentAddingsSection() {
  return (
    <section style={{
      padding: 'clamp(60px, 8vw, 120px) var(--grid-margin)',
      background: 'var(--color-bg)',
    }}>
      <p style={{
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.06em',
        marginBottom: 40,
        color: 'var(--color-stone-500)',
      }}>
        Recent Addings ↓
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'clamp(16px, 2vw, 28px)',
      }}>
        {PRODUCTS.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}
