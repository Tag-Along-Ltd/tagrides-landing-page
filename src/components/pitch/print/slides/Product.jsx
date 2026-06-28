'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Product — 4 phone screenshots in a single horizontal row, each in
// a thin dark frame. Caption monospace beneath each.
export function PrintProduct({ page, total, audience, watermark }) {
  const d = pitch.product;
  return (
    <Slide page={page} total={total} audience={audience} watermark={watermark} section="Product">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '6mm',
          flex: 1,
          alignItems: 'center',
        }}
      >
        {d.flows.map((flow, i) => (
          <figure key={flow.title} style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4mm' }}>
            <div
              style={{
                width: '52mm',
                height: '108mm',
                borderRadius: '7mm',
                backgroundColor: '#1A1A1A',
                border: '1px solid #333',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 4mm 12mm rgba(0,0,0,0.5)',
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
                fontFamily: 'var(--font-mono)',
                fontSize: '9pt',
                letterSpacing: '0.14em',
                color: '#E5E5E5',
                textTransform: 'uppercase',
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              <span style={{ color: '#008080', marginRight: '2mm' }}>0{i + 1}</span>
              {flow.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </Slide>
  );
}
