'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Companion to the Competitive matrix — the four one-liner
// differentiation quotes presented as blockquote cards in a 2x2 grid.
export function PrintDifferentiation({ page, total, audience }) {
  const d = pitch.competitive;
  return (
    <Slide page={page} total={total} audience={audience} section="Why we win">
      <SlideHeading
        eyebrow="WHY WE WIN"
        title="Every competitor solves part of it. We solve all of it."
        subtitle="One sentence per competitor — what they got right, what they missed."
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '8mm',
          flex: 1,
        }}
      >
        {d.differentiation.map((q) => (
          <blockquote
            key={q.vs}
            style={{
              margin: 0,
              border: '1px solid #333',
              borderTop: '2px solid #F59E0B',
              backgroundColor: '#1A1A1A',
              borderRadius: '4mm',
              padding: '6mm 7mm',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '7.5pt',
                letterSpacing: '0.22em',
                color: '#F59E0B',
                textTransform: 'uppercase',
                marginBottom: '3mm',
              }}
            >
              vs · {q.vs}
            </div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13pt',
                lineHeight: 1.3,
                fontWeight: 600,
                color: '#E5E5E5',
                margin: 0,
              }}
            >
              {q.line}
            </p>
          </blockquote>
        ))}
      </div>
    </Slide>
  );
}
