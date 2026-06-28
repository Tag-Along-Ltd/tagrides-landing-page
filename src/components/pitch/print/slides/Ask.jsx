'use client';

import { Slide } from '../Slide';
import pitch from '@/data/pitch.json';

// Ask — the close slide. Teal tone-shift to mark "the moment". One
// page carries: snapshot (round / amount / runway) + use-of-funds +
// the 18-month milestones. Contact card is its own slide so this one
// doesn't feel crammed.
export function PrintAsk({ page, total, audience, watermark }) {
  const d = pitch.ask;
  const cfg = pitch.audiences[audience] ?? pitch.audiences.investor;
  const ask = cfg.ask ?? pitch.audiences.investor.ask;

  return (
    <Slide
      page={page}
      total={total}
      audience={cfg.label}
      watermark={watermark}
      section="The Ask"
    >
      {/* Headline */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '8.5pt',
          letterSpacing: '0.24em',
          color: '#008080',
          textTransform: 'uppercase',
          marginBottom: '3mm',
        }}
      >
        {d.eyebrow}
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32pt',
          fontWeight: 800,
          lineHeight: 1.05,
          color: '#E5E5E5',
          margin: 0,
          maxWidth: '220mm',
        }}
      >
        {d.title}
      </h2>

      {/* Snapshot row */}
      <div
        style={{
          marginTop: '8mm',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '6mm',
          border: '1px solid #008080',
          backgroundColor: 'rgba(0,128,128,0.08)',
          borderRadius: '4mm',
          padding: '6mm 7mm',
        }}
      >
        {[
          { label: 'Round', value: ask.stage },
          { label: 'Ask', value: `$${(ask.amount / 1000).toFixed(0)}K` },
          { label: 'Runway', value: ask.runway },
          { label: 'Instrument', value: 'SAFE' },
        ].map((s) => (
          <div key={s.label}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '7pt',
                letterSpacing: '0.2em',
                color: '#888',
                textTransform: 'uppercase',
                marginBottom: '2mm',
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16pt',
                fontWeight: 700,
                color: '#E5E5E5',
                lineHeight: 1.1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Use of funds + milestones — two columns, fill remaining space */}
      <div
        style={{
          marginTop: '8mm',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12mm',
          flex: 1,
          alignItems: 'stretch',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '7.5pt',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#F59E0B',
              marginBottom: '4mm',
              flexShrink: 0,
            }}
          >
            Use of funds
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flex: 1 }}>
          {ask.use.map((u) => (
            <div key={u.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1mm' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '10pt',
                    fontWeight: 700,
                    color: '#E5E5E5',
                  }}
                >
                  {u.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9pt',
                    color: '#E5E5E5',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {u.pct}%
                </span>
              </div>
              <div style={{ height: '2mm', backgroundColor: '#222', borderRadius: '999px', overflow: 'hidden', marginTop: '2mm' }}>
                <div style={{ width: `${u.pct}%`, height: '100%', backgroundColor: '#008080' }} />
              </div>
              {u.detail && (
                <div style={{ fontSize: '8.5pt', lineHeight: 1.4, color: '#888', marginTop: '2mm' }}>
                  {u.detail}
                </div>
              )}
            </div>
          ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '7.5pt',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#F59E0B',
              marginBottom: '4mm',
              flexShrink: 0,
            }}
          >
            What this unlocks · 18 months
          </div>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flex: 1 }}>
            {(ask.milestones ?? []).map((m, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  gap: '4mm',
                  fontSize: '11pt',
                  lineHeight: 1.4,
                  color: '#D0D0D0',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: '#F59E0B',
                    fontVariantNumeric: 'tabular-nums',
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{m}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Slide>
  );
}
