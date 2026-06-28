'use client';

import { Slide, SlideHeading } from '../Slide';
import { AfricaMap } from '../../AfricaMap';
import pitch from '@/data/pitch.json';

// Market — Africa map on the left (we already have a great SVG), TAM
// numbers + 3 facts on the right. Skip the ECharts curve in print
// because it requires JS execution and adds nothing the numeric range
// can't say. The map carries the geographic story; the figures carry
// the size story.
export function PrintMarket({ page, total, audience, watermark }) {
  const d = pitch.market;
  const startYear = d.tam[0];
  const endYear   = d.tam[d.tam.length - 1];

  return (
    <Slide page={page} total={total} audience={audience} watermark={watermark} section="Market">
      {/* Subtitle deliberately dropped — the TAM box on the right
          already shows "$2.1B → $3.45B / Statista", which IS the
          subtitle's payload. Repeating it wastes ~25mm of vertical
          space the right column needs to fit cleanly. */}
      <SlideHeading eyebrow={d.eyebrow} title={d.title} />

      {/* Grid container — explicit minHeight:0 + overflow:hidden so
          neither column can push beyond the body's flex:1 allocation.
          Without this, the right column's natural content height + the
          map box's alignItems:stretch pairing would expand the grid
          past the slide's footer. */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: '10mm',
          flex: 1,
          alignItems: 'stretch',
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {/* Left — Africa map.
            Container principles:
            • overflow:hidden enforces the box owns its visual bounds
            • the map slot uses minHeight:0 so flexbox can actually
              shrink it (default min-height:auto would let the SVG's
              natural aspect-ratio height push beyond the parent) */}
        <div
          style={{
            border: '1px solid #333',
            backgroundColor: '#1A1A1A',
            borderRadius: '4mm',
            padding: '5mm',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            minHeight: 0,
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
              flexShrink: 0,
            }}
          >
            Expansion path
          </div>
          <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AfricaMap className="size-full" staticMode />
          </div>
        </div>

        {/* Right — TAM headline + 3 facts. Compacted so the column's
            natural height fits within the available grid height.
            minHeight:0 + overflow:hidden ensure the column can't push
            the grid taller than its allotted space. No
            justify-content:space-between — items stack naturally with
            consistent 4mm gaps, leaving honest whitespace below if any. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4mm', minHeight: 0, overflow: 'hidden' }}>
          {/* TAM growth headline */}
          <div
            style={{
              border: '1px solid #333',
              backgroundColor: '#1A1A1A',
              borderRadius: '4mm',
              padding: '5mm 6mm',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '7pt',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#888',
                marginBottom: '2mm',
              }}
            >
              Ride-sharing TAM, Africa
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22pt',
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
                fontSize: '8.5pt',
                color: '#B3B3B3',
                marginTop: '1.5mm',
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
                  fontSize: '18pt',
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
                  fontSize: '9pt',
                  color: '#B3B3B3',
                  marginTop: '1mm',
                }}
              >
                {f.label}
              </div>
            </div>
          ))}

          {/* Footer — global TAM trajectory in plain sentence form.
              No card chrome (the African TAM box above already uses
              that template, repeating it reads as duplicated structure).
              Just one sentence that anchors the $216B fact above with
              its 2024 baseline. */}
          <div
            style={{
              marginTop: '2mm',
              paddingTop: '4mm',
              borderTop: '1px solid #2a2a2a',
              fontSize: '10pt',
              lineHeight: 1.5,
              color: '#B3B3B3',
            }}
          >
            That <span style={{ color: '#E5E5E5', fontWeight: 600 }}>$216B</span> is the global ride-share market by 2029 — up from{' '}
            <span style={{ color: '#E5E5E5', fontWeight: 600 }}>$166B today</span>.
            <span style={{
              display: 'block',
              marginTop: '2mm',
              fontFamily: 'var(--font-mono)',
              fontSize: '7.5pt',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#666',
            }}>
              Source: Statista · 2024–2029 forecast
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
}
