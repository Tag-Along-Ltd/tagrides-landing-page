'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Solution — horizontal route line with 3 step circles, step cards
// below. Strip the path animation (not relevant in print). Cards keep
// just title + 1-line detail.
export function PrintSolution({ page, total, audience, watermark }) {
  const d = pitch.solution;
  return (
    <Slide page={page} total={total} audience={audience} watermark={watermark} section="Solution">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

      {/* Route diagram — static SVG, 3 stops on a curved line */}
      <div style={{ margin: '10mm 0 12mm 0', height: '36mm', flexShrink: 0 }}>
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }} aria-hidden>
          <path
            d="M 40 50 Q 250 10 500 50 T 960 50"
            stroke="#008080"
            strokeWidth="2"
            strokeDasharray="6 8"
            fill="none"
          />
          {[40, 500, 960].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={50} r={18} fill="#008080" opacity={0.18} />
              <circle cx={x} cy={50} r={11} fill="#008080" />
              <text
                x={x}
                y={56}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#0A0A0A"
                fontFamily="var(--font-mono)"
              >
                {i + 1}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* 3 step cards — stretch to fill remaining vertical space */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '8mm',
          flex: 1,
          alignItems: 'stretch',
        }}
      >
        {d.mechanics.map((m, i) => (
          <div
            key={m.step}
            style={{
              position: 'relative',
              border: '1px solid #333',
              borderTop: `3px solid ${i === 1 ? '#F59E0B' : '#008080'}`,
              backgroundColor: 'rgba(26,26,26,0.7)',
              borderRadius: '4mm',
              padding: '10mm 9mm',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            {/* Giant step number watermark inside the card */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                right: '6mm',
                bottom: '0mm',
                fontFamily: 'var(--font-display)',
                fontSize: '90pt',
                fontWeight: 800,
                color: i === 1 ? '#F59E0B' : '#008080',
                opacity: 0.08,
                lineHeight: 0.85,
                letterSpacing: '-0.04em',
              }}
            >
              0{m.step}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '7.5pt',
                letterSpacing: '0.24em',
                color: i === 1 ? '#F59E0B' : '#008080',
                textTransform: 'uppercase',
                marginBottom: '3mm',
                position: 'relative',
              }}
            >
              Step 0{m.step}
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13pt',
                fontWeight: 700,
                color: '#E5E5E5',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              {m.title}
            </h3>
            <p
              style={{
                fontSize: '10pt',
                lineHeight: 1.45,
                color: '#B3B3B3',
                margin: '3mm 0 0 0',
              }}
            >
              {m.detail}
            </p>
          </div>
        ))}
      </div>
    </Slide>
  );
}
