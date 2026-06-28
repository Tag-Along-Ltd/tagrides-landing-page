'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Impact — judge-only slide. 3 outcome cards in a row + SDG chips
// across the bottom.
export function PrintImpact({ page, total, audience, watermark }) {
  const d = pitch.impact;
  return (
    <Slide page={page} total={total} audience={audience} watermark={watermark} section="Economic Impact">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8mm',
          marginBottom: '12mm',
          flex: 1,
        }}
      >
        {d.outcomes.map((o) => (
          <div
            key={o.label}
            style={{
              border: '1px solid #333',
              backgroundColor: '#1A1A1A',
              borderRadius: '4mm',
              padding: '8mm 7mm',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '30pt',
                fontWeight: 800,
                lineHeight: 1,
                color: '#F59E0B',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.02em',
              }}
            >
              {o.value}
            </div>
            <div
              style={{
                marginTop: '4mm',
                fontSize: '9.5pt',
                lineHeight: 1.5,
                color: '#B3B3B3',
              }}
            >
              {o.label}
            </div>
          </div>
        ))}
      </div>

      <div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '7.5pt',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#008080',
            marginBottom: '4mm',
          }}
        >
          United Nations SDG alignment
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3mm' }}>
          {d.sdgs.map((s) => (
            <span
              key={s.code}
              style={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #333',
                borderRadius: '999px',
                padding: '2.5mm 5mm',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3mm',
                fontSize: '9.5pt',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '7.5pt',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#008080',
                  backgroundColor: 'rgba(0,128,128,0.15)',
                  padding: '0.5mm 2mm',
                  borderRadius: '999px',
                }}
              >
                {s.code}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#E5E5E5' }}>
                {s.title}
              </span>
            </span>
          ))}
        </div>
      </div>
    </Slide>
  );
}
