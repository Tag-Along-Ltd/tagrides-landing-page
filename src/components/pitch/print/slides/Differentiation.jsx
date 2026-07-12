'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Companion to the Competitive matrix — the four one-liner
// differentiation quotes presented as blockquote cards in a 2x2 grid.
export function PrintDifferentiation({ page, total, audience, watermark }) {
  const d = pitch.competitive;
  return (
    <Slide page={page} total={total} audience={audience} watermark={watermark} section="Why we win">
      <SlideHeading
        eyebrow="WHY WE WIN"
        title="Why TagRides works differently."
        subtitle="One sentence per model — what it clears well, and where Along behaves differently."
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
        {d.differentiation.map((q, i) => (
          <blockquote
            key={q.vs}
            style={{
              position: 'relative',
              margin: 0,
              border: '1px solid #333',
              borderTop: '2px solid #F59E0B',
              backgroundColor: 'rgba(26,26,26,0.85)',
              borderRadius: '4mm',
              padding: '8mm 10mm',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Giant transparent quote-mark sitting behind the text */}
            <span
              aria-hidden
              style={{
                position: 'absolute',
                top: '-2mm',
                right: '4mm',
                fontFamily: 'var(--font-display)',
                fontSize: '80pt',
                fontWeight: 800,
                color: '#F59E0B',
                opacity: 0.08,
                lineHeight: 0.9,
                pointerEvents: 'none',
              }}
            >
              &rdquo;
            </span>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '7.5pt',
                letterSpacing: '0.22em',
                color: '#F59E0B',
                textTransform: 'uppercase',
                marginBottom: '4mm',
                position: 'relative',
              }}
            >
              vs · {q.vs}
            </div>
            <p
              style={{
                position: 'relative',
                fontFamily: 'var(--font-display)',
                fontSize: '15pt',
                lineHeight: 1.32,
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
