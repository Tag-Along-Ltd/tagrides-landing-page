'use client';

import { Logo } from '@/components/brand/Logo';
import { Slide } from '../Slide';
import pitch from '@/data/pitch.json';

// Cover slide — luxury opener. Lots going on but composed: large
// brand mark, big title centered, generous decorated background with
// route-dot field + connecting curves echoing the web hero. Watermark
// from base Slide is disabled here because the cover has its own
// background system.
export function PrintCover({ page, total, audience, watermark: _watermark }) {
  const d = pitch.cover;
  return (
    <Slide
      page={page}
      total={total}
      audience={audience}
      section="Cover"
      bodyAlign="center"
      watermark="none"
    >
      {/* Background route-dot field — same visual vocabulary as the
          web cover, scaled for print. Connecting bezier paths give
          a sense of routes intersecting. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.55,
          zIndex: 0,
        }}
      >
        <RouteDots />
      </div>

      {/* Soft radial focus behind the title */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0,128,128,0.18), transparent 65%)',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col items-center justify-center text-center"
        style={{ gap: '4mm', zIndex: 2 }}
      >
        <Logo size={88} variant="color" />

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9pt',
            letterSpacing: '0.4em',
            color: '#888',
            textTransform: 'uppercase',
            marginTop: '6mm',
          }}
        >
          {d.eyebrow}
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '54pt',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#E5E5E5',
            maxWidth: '240mm',
            margin: '6mm 0 0 0',
          }}
        >
          Their route.{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #008080, #2EAD8A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Your ride.
          </span>
        </h1>

        <p
          style={{
            fontSize: '13pt',
            lineHeight: 1.5,
            color: '#B3B3B3',
            maxWidth: '180mm',
            margin: '8mm 0 0 0',
          }}
        >
          {d.subtitle}
        </p>

        {/* Decorative separator */}
        <div
          style={{
            margin: '12mm 0 4mm 0',
            display: 'flex',
            alignItems: 'center',
            gap: '4mm',
          }}
        >
          <span
            style={{
              width: '30mm',
              height: '0.4mm',
              background: 'linear-gradient(90deg, transparent, #008080)',
            }}
          />
          <span
            aria-hidden
            style={{
              width: '2mm',
              height: '2mm',
              transform: 'rotate(45deg)',
              backgroundColor: '#008080',
            }}
          />
          <span
            style={{
              width: '30mm',
              height: '0.4mm',
              background: 'linear-gradient(90deg, #008080, transparent)',
            }}
          />
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9pt',
            color: '#888',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ color: '#E5E5E5', fontWeight: 700, marginBottom: '1.5mm' }}>
            {d.presenter}
          </div>
          <div>{d.version}</div>
        </div>
      </div>
    </Slide>
  );
}

// SVG route-dot field. Twelve dots positioned percentage-based so the
// composition scales correctly. Connecting bezier arcs imply route
// intersections.
function RouteDots() {
  const dots = [
    { x: 6,  y: 16, r: 1.4 }, { x: 18, y: 30, r: 0.9 }, { x: 32, y: 12, r: 1.2 },
    { x: 48, y: 26, r: 1.6 }, { x: 64, y: 18, r: 1.0 }, { x: 80, y: 34, r: 1.3 },
    { x: 94, y: 60, r: 1.2 }, { x: 78, y: 72, r: 0.8 }, { x: 56, y: 82, r: 1.5 },
    { x: 36, y: 70, r: 1.1 }, { x: 14, y: 80, r: 1.4 }, { x: 4,  y: 50, r: 0.9 },
  ];
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ display: 'block' }}
    >
      {/* Curved route lines connecting the dots */}
      <path
        d="M 6 16 Q 24 22 32 12 T 64 18 T 94 60"
        stroke="#008080"
        strokeWidth="0.18"
        strokeDasharray="0.6 1.2"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M 4 50 Q 20 62 36 70 T 78 72 T 94 60"
        stroke="#F59E0B"
        strokeWidth="0.18"
        strokeDasharray="0.6 1.2"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M 14 80 Q 30 78 36 70 T 56 82"
        stroke="#008080"
        strokeWidth="0.16"
        strokeDasharray="0.5 1"
        fill="none"
        opacity="0.3"
      />
      {/* Dots */}
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r * 0.18}
          fill={i % 4 === 0 ? '#F59E0B' : '#008080'}
          opacity="0.7"
        />
      ))}
    </svg>
  );
}
