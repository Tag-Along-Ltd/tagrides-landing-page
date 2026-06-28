'use client';

import { Slide, SlideHeading } from '../Slide';
import { AfricaMap } from '../../AfricaMap';
import pitch from '@/data/pitch.json';

// Market — Africa map on the left (we already have a great SVG), TAM
// numbers + 3 facts on the right. Skip the ECharts curve in print
// because it requires JS execution and adds nothing the numeric range
// can't say. The map carries the geographic story; the figures carry
// the size story.
export function PrintMarket({ page, total, audience }) {
  const d = pitch.market;
  const startYear = d.tam[0];
  const endYear   = d.tam[d.tam.length - 1];

  return (
    <Slide page={page} total={total} audience={audience} section="Market">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '10mm',
          flex: 1,
          alignItems: 'stretch',
        }}
      >
        {/* Left — Africa map */}
        <div
          style={{
            border: '1px solid #333',
            backgroundColor: '#1A1A1A',
            borderRadius: '4mm',
            padding: '5mm',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '7.5pt',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#888',
              marginBottom: '3mm',
            }}
          >
            Expansion path
          </div>
          <div style={{ flex: 1 }}>
            <AfricaMap className="size-full" />
          </div>
        </div>

        {/* Right — TAM headline + 3 facts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6mm' }}>
          {/* TAM growth headline */}
          <div
            style={{
              border: '1px solid #333',
              backgroundColor: '#1A1A1A',
              borderRadius: '4mm',
              padding: '6mm 7mm',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '7.5pt',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#888',
                marginBottom: '3mm',
              }}
            >
              Ride-sharing TAM, Africa
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28pt',
                fontWeight: 800,
                lineHeight: 1,
                color: '#008080',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              ${startYear.value}B <span style={{ color: '#666' }}>→</span> ${endYear.value}B
            </div>
            <div
              style={{
                fontSize: '9.5pt',
                color: '#B3B3B3',
                marginTop: '2mm',
              }}
            >
              between {startYear.year} and {endYear.year} (Statista)
            </div>
          </div>

          {/* 3 context facts */}
          {d.facts.map((f) => (
            <div
              key={f.label}
              style={{
                borderLeft: '2px solid #008080',
                paddingLeft: '4mm',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22pt',
                  fontWeight: 800,
                  lineHeight: 1,
                  color: '#E5E5E5',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {f.value}
              </div>
              <div
                style={{
                  fontSize: '9.5pt',
                  color: '#B3B3B3',
                  marginTop: '1mm',
                }}
              >
                {f.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
