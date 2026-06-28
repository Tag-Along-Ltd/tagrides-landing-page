'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Business Model — 2 revenue streams + 3 pricing levers. Same content
// as web but flatter layout: streams across the top, pricing across
// the bottom.
export function PrintModel({ page, total, audience }) {
  const d = pitch.model;
  return (
    <Slide page={page} total={total} audience={audience} section="Business Model">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

      {/* Revenue streams */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8mm',
          marginBottom: '8mm',
        }}
      >
        {d.streams.map((s, i) => (
          <div
            key={s.label}
            style={{
              border: '1px solid #333',
              backgroundColor: '#1A1A1A',
              borderRadius: '4mm',
              padding: '6mm 7mm',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '3mm',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '7.5pt',
                  letterSpacing: '0.2em',
                  color: '#008080',
                  textTransform: 'uppercase',
                }}
              >
                Stream 0{i + 1}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8pt',
                  fontWeight: 700,
                  color: '#008080',
                  backgroundColor: 'rgba(0,128,128,0.15)',
                  padding: '1mm 2.5mm',
                  borderRadius: '999px',
                }}
              >
                {s.share}
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14pt',
                fontWeight: 700,
                color: '#E5E5E5',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              {s.label}
            </h3>
            <p style={{ fontSize: '9.5pt', lineHeight: 1.5, color: '#B3B3B3', margin: '3mm 0 0 0' }}>
              {s.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Pricing levers */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '7.5pt',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#F59E0B',
          marginBottom: '3mm',
        }}
      >
        How the fare is set
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '5mm',
        }}
      >
        {d.pricing.map((p) => (
          <div
            key={p.label}
            style={{
              backgroundColor: '#141414',
              border: '1px solid #2a2a2a',
              borderRadius: '3mm',
              padding: '4mm 5mm',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '11pt',
                fontWeight: 700,
                color: '#E5E5E5',
                marginBottom: '1.5mm',
              }}
            >
              {p.label}
            </div>
            <div style={{ fontSize: '9pt', lineHeight: 1.4, color: '#B3B3B3' }}>
              {p.detail}
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}
