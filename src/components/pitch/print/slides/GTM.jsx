'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// GTM — 4 phase cards in a 2x2 grid. Each card carries phase title +
// timeframe + 1-line detail + top 2 tactics (web shows 3-4).
export function PrintGTM({ page, total, audience }) {
  const d = pitch.gtm;
  return (
    <Slide page={page} total={total} audience={audience} section="Go-To-Market">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '6mm',
          flex: 1,
        }}
      >
        {d.lanes.map((lane, i) => (
          <div
            key={lane.title}
            style={{
              border: '1px solid #333',
              backgroundColor: '#1A1A1A',
              borderRadius: '4mm',
              padding: '5mm 6mm',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '2mm',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '7.5pt',
                  letterSpacing: '0.22em',
                  color: '#008080',
                  textTransform: 'uppercase',
                }}
              >
                Phase 0{i + 1}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '7.5pt',
                  color: '#888',
                  letterSpacing: '0.08em',
                }}
              >
                {lane.timeframe}
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14pt',
                fontWeight: 700,
                color: '#E5E5E5',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {lane.title}
            </h3>
            <p
              style={{
                fontSize: '9pt',
                lineHeight: 1.4,
                color: '#B3B3B3',
                margin: '2mm 0 0 0',
              }}
            >
              {lane.detail}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '3mm 0 0 0' }}>
              {lane.tactics.slice(0, 2).map((t, ti) => (
                <li
                  key={ti}
                  style={{
                    display: 'flex',
                    gap: '2.5mm',
                    fontSize: '8.5pt',
                    lineHeight: 1.35,
                    color: '#A0A0A0',
                    marginBottom: '1.5mm',
                  }}
                >
                  <span
                    style={{
                      marginTop: '1.5mm',
                      width: '1mm',
                      height: '1mm',
                      transform: 'rotate(45deg)',
                      backgroundColor: '#F59E0B',
                      flexShrink: 0,
                    }}
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Slide>
  );
}
