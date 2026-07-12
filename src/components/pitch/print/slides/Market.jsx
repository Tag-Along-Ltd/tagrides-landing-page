'use client';

import { Slide, SlideHeading } from '../Slide';
import { AfricaMap } from '../../AfricaMap';
import pitch from '@/data/pitch.json';

// Market — geographic wedge on the left, bottom-up operating case and
// opportunity layers on the right. The print slide uses the same scenario
// data as the adaptive chart without depending on client-side rendering.
export function PrintMarket({ page, total, audience, watermark }) {
  const d = pitch.market;
  const firstCase = d.scale[0];

  return (
    <Slide page={page} total={total} audience={audience} watermark={watermark} section="Market">
      {/* The compact right column carries the assumptions, so repeating
          the full subtitle would crowd the fixed-height print slide. */}
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
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AfricaMap className="size-full" staticMode />
          </div>
        </div>

        {/* Right — five-city case + 3 facts. Compacted so the column's
            natural height fits within the available grid height.
            minHeight:0 + overflow:hidden ensure the column can't push
            the grid taller than its allotted space. No
            justify-content:space-between — items stack naturally with
            consistent 4mm gaps, leaving honest whitespace below if any. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4mm',
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          {/* Obtainable operating case */}
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
              Bottom-up five-city case
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
              {firstCase.display}
            </div>
            <div
              style={{
                fontSize: '8.5pt',
                color: '#B3B3B3',
                marginTop: '1.5mm',
              }}
            >
              annual rider fares · {firstCase.detail}
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

          {/* Assumption note keeps modeled opportunity distinct from
              reported third-party market forecasts. */}
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
            Broad route opportunity, realistic filtered demand, and the five-city case are shown
            separately.
            <span
              style={{
                display: 'block',
                marginTop: '2mm',
                fontFamily: 'var(--font-mono)',
                fontSize: '7.5pt',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#666',
              }}
            >
              {d.source}
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
}
