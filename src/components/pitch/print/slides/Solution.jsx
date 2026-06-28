'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Solution — horizontal route line with 3 step circles, step cards
// below. Strip the path animation (not relevant in print). Cards keep
// just title + 1-line detail.
export function PrintSolution({ page, total, audience }) {
  const d = pitch.solution;
  return (
    <Slide page={page} total={total} audience={audience} section="Solution">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

      {/* Route diagram — static SVG, 3 stops on a curved line */}
      <div style={{ margin: '4mm 0 6mm 0', height: '24mm' }}>
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

      {/* 3 step cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '8mm',
          flex: 1,
        }}
      >
        {d.mechanics.map((m) => (
          <div
            key={m.step}
            style={{
              border: '1px solid #333',
              backgroundColor: '#1A1A1A',
              borderRadius: '4mm',
              padding: '6mm 7mm',
            }}
          >
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
