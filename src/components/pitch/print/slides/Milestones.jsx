'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Milestones — compact horizontal timeline. Past items have a filled
// dot; "now" is solid amber + glow; future items are outline-only.
// Showing all 9 items on one slide via a vertical list (date | label).
export function PrintMilestones({ page, total, audience }) {
  const d = pitch.milestones;
  return (
    <Slide page={page} total={total} audience={audience} section="Milestones">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '3mm',
        }}
      >
        {d.items.map((item) => {
          const statusStyles = {
            done:   { bg: '#008080', border: '#008080' },
            now:    { bg: '#F59E0B', border: '#F59E0B' },
            next:   { bg: 'transparent', border: '#008080' },
            future: { bg: 'transparent', border: '#444' },
          }[item.status] ?? { bg: 'transparent', border: '#444' };

          return (
            <div
              key={item.when}
              style={{
                display: 'grid',
                gridTemplateColumns: '32mm 6mm 1fr',
                alignItems: 'center',
                gap: '4mm',
                borderLeft: '2px solid #222',
                paddingLeft: '6mm',
                paddingBottom: '2mm',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9pt',
                  letterSpacing: '0.12em',
                  color: '#888',
                  textTransform: 'uppercase',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {item.when}
              </div>
              <div
                style={{
                  width: '3.5mm',
                  height: '3.5mm',
                  borderRadius: '50%',
                  backgroundColor: statusStyles.bg,
                  border: `1.5px solid ${statusStyles.border}`,
                }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '11pt',
                  fontWeight: item.status === 'now' ? 700 : 500,
                  color: item.status === 'future' ? '#888' : '#E5E5E5',
                  lineHeight: 1.25,
                }}
              >
                {item.label}
                {item.status === 'now' && (
                  <span
                    style={{
                      marginLeft: '3mm',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '7pt',
                      letterSpacing: '0.18em',
                      backgroundColor: 'rgba(245,158,11,0.18)',
                      color: '#F59E0B',
                      padding: '0.5mm 2mm',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                    }}
                  >
                    NOW
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Slide>
  );
}
