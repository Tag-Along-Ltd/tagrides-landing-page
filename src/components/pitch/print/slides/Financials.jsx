'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Financials — static SVG twin-bar chart (no ECharts in print to
// avoid JS-execution dependency) + unit economics column on the right.
export function PrintFinancials({ page, total, audience }) {
  const d = pitch.financials;
  const maxRev = Math.max(...d.projection.map((p) => p.revenue));
  const maxAny = Math.max(maxRev, ...d.projection.map((p) => p.expenses));

  return (
    <Slide page={page} total={total} audience={audience} section="Financials">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr',
          gap: '10mm',
          flex: 1,
        }}
      >
        {/* Bar chart */}
        <div
          style={{
            border: '1px solid #333',
            backgroundColor: '#1A1A1A',
            borderRadius: '4mm',
            padding: '6mm',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '7.5pt',
              color: '#888',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: '5mm',
            }}
          >
            <span>5-year projection · USD</span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1.5mm', marginRight: '5mm' }}>
                <span style={{ width: '3mm', height: '1.5mm', backgroundColor: '#008080' }} /> Revenue
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '1.5mm' }}>
                <span style={{ width: '3mm', height: '1.5mm', backgroundColor: '#F59E0B' }} /> Expenses
              </span>
            </span>
          </div>

          <div
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: `repeat(${d.projection.length}, 1fr)`,
              gap: '4mm',
              alignItems: 'end',
              paddingBottom: '6mm',
            }}
          >
            {d.projection.map((p) => {
              const revPct = (p.revenue / maxAny) * 100;
              const expPct = (p.expenses / maxAny) * 100;
              return (
                <div key={p.year} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2mm', height: '100%' }}>
                  <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'end', gap: '1mm' }}>
                    <div style={{ flex: 1, height: `${revPct}%`, backgroundColor: '#008080', borderRadius: '1mm 1mm 0 0' }} />
                    <div style={{ flex: 1, height: `${expPct}%`, backgroundColor: '#F59E0B', borderRadius: '1mm 1mm 0 0' }} />
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '7.5pt',
                      color: '#888',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Y{p.year}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '7pt',
                      color: '#666',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    ${(p.revenue / 1000).toFixed(0)}K
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Unit economics column */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '7.5pt',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#F59E0B',
              marginBottom: '5mm',
            }}
          >
            Unit economics
          </div>
          {d.unitEcon.map((u) => (
            <div
              key={u.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderBottom: '1px solid #2a2a2a',
                padding: '3mm 0',
              }}
            >
              <span style={{ fontSize: '9.5pt', color: '#B3B3B3' }}>{u.label}</span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '12pt',
                  fontWeight: 700,
                  color: '#E5E5E5',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {u.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
