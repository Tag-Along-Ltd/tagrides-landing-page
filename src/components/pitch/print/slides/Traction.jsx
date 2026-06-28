'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Traction — 4 proof cards + backer rail. Bigger numbers, fewer
// supporting words. The story: backed, built, accumulating users.
export function PrintTraction({ page, total, audience, watermark }) {
  const d = pitch.traction;
  return (
    <Slide page={page} total={total} audience={audience} watermark={watermark} section="Traction">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

      {/* 4 proof stat cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '5mm',
          marginBottom: '8mm',
        }}
      >
        {d.proof.map((p) => (
          <div
            key={p.label}
            style={{
              border: '1px solid #333',
              backgroundColor: '#1A1A1A',
              borderRadius: '4mm',
              padding: '6mm',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '32pt',
                fontWeight: 800,
                lineHeight: 0.95,
                color: '#008080',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.02em',
              }}
            >
              {p.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '10.5pt',
                fontWeight: 700,
                color: '#E5E5E5',
                marginTop: '3mm',
                lineHeight: 1.2,
              }}
            >
              {p.label}
            </div>
            <div
              style={{
                fontSize: '8.5pt',
                color: '#B3B3B3',
                marginTop: '1.5mm',
                lineHeight: 1.4,
              }}
            >
              {p.context}
            </div>
          </div>
        ))}
      </div>

      {/* Backers chip rail */}
      <div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '7.5pt',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#F59E0B',
            marginBottom: '4mm',
          }}
        >
          Backed by
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3mm' }}>
          {d.backers.map((b) => (
            <span
              key={b.name}
              style={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #333',
                borderRadius: '999px',
                padding: '2mm 4mm',
                fontSize: '9pt',
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#E5E5E5' }}>
                {b.name}
              </span>
              <span style={{ color: '#555', margin: '0 2mm' }}>·</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8pt', color: '#888' }}>
                {b.note}
              </span>
            </span>
          ))}
        </div>
      </div>
    </Slide>
  );
}
