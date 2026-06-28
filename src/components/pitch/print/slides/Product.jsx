'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Product — 4 phone screenshots in a single horizontal row, each in
// a thin dark frame. Caption monospace beneath each.
export function PrintProduct({ page, total, audience }) {
  const d = pitch.product;
  return (
    <Slide page={page} total={total} audience={audience} section="Product">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8mm',
          flex: 1,
          alignItems: 'start',
        }}
      >
        {d.flows.map((flow, i) => (
          <figure key={flow.title} style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '42mm',
                height: '88mm',
                borderRadius: '6mm',
                backgroundColor: '#1A1A1A',
                border: '1px solid #333',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flow.image}
                alt={flow.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <figcaption
              style={{
                marginTop: '4mm',
                fontFamily: 'var(--font-mono)',
                fontSize: '8pt',
                letterSpacing: '0.12em',
                color: '#B3B3B3',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              <span style={{ color: '#008080' }}>0{i + 1}</span> · {flow.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </Slide>
  );
}
