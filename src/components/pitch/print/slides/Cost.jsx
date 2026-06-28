'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Cost — the cost-of-Lagos slide. Stripped from 10 routes to 6, the
// 4 headline stats become a single mega-callout ("up to 7.6× more
// expensive"). Twin bars per route, label inline, tabular numerals.
export function PrintCost({ page, total, audience }) {
  const d = pitch.lagosCost;
  const routes = d.routes.slice(0, 6);
  const maxBolt = Math.max(...routes.map((r) => r.boltNaira));
  const headlineMultiplier = Math.max(
    ...routes.map((r) => r.boltNaira / r.maxNaira),
  ).toFixed(1);

  return (
    <Slide page={page} total={total} audience={audience} section="Cost">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} />

      {/* Headline multiplier callout */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '6mm',
          marginBottom: '6mm',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '72pt',
            fontWeight: 800,
            lineHeight: 0.9,
            color: '#008080',
            letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {headlineMultiplier}×
        </div>
        <div style={{ paddingBottom: '4mm' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13pt',
              fontWeight: 700,
              color: '#E5E5E5',
              lineHeight: 1.2,
            }}
          >
            the cost of moving in Lagos
          </div>
          <div
            style={{
              fontSize: '10pt',
              color: '#B3B3B3',
              marginTop: '1mm',
              maxWidth: '110mm',
            }}
          >
            Bolt versus the public-transport equivalent. Same start. Same destination. 30 routes researched, Nov 2024.
          </div>
        </div>
      </div>

      {/* Route comparison rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2mm' }}>
        {routes.map((r) => {
          const localPct = (r.maxNaira / maxBolt) * 100;
          const boltPct = (r.boltNaira / maxBolt) * 100;
          const mult = (r.boltNaira / r.maxNaira).toFixed(1);
          return (
            <div
              key={r.from + r.to}
              style={{
                display: 'grid',
                gridTemplateColumns: '60mm 1fr 14mm',
                alignItems: 'center',
                gap: '4mm',
                fontSize: '9.5pt',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: '#E5E5E5',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {r.from}
                <span style={{ color: '#666', margin: '0 1mm' }}>→</span>
                {r.to}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1mm' }}>
                <Bar label={`₦${r.maxNaira.toLocaleString()}`} pct={localPct} color="#008080" />
                <Bar label={`₦${r.boltNaira.toLocaleString()}`} pct={boltPct} color="#F59E0B" />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '12pt',
                  fontWeight: 700,
                  color: '#F59E0B',
                  textAlign: 'right',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {mult}×
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend at bottom */}
      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          gap: '8mm',
          fontFamily: 'var(--font-mono)',
          fontSize: '8pt',
          color: '#888',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '2mm' }}>
          <span style={{ width: '5mm', height: '1.5mm', backgroundColor: '#008080' }} /> Public / informal
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '2mm' }}>
          <span style={{ width: '5mm', height: '1.5mm', backgroundColor: '#F59E0B' }} /> Bolt economy
        </span>
        <span style={{ marginLeft: 'auto', opacity: 0.7 }}>{d.source}</span>
      </div>
    </Slide>
  );
}

function Bar({ label, pct, color }) {
  return (
    <div
      style={{
        position: 'relative',
        height: '4mm',
        backgroundColor: '#1A1A1A',
        borderRadius: '999px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          backgroundColor: color,
        }}
      />
      <span
        style={{
          position: 'absolute',
          right: '2mm',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '7.5pt',
          fontWeight: 700,
          color: '#E5E5E5',
        }}
      >
        {label}
      </span>
    </div>
  );
}
