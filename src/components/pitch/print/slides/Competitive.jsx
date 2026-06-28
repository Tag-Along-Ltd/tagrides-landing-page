'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Competitive — the 6×6 honesty matrix. Differentiation quotes go on
// the next slide rather than crammed underneath.
export function PrintCompetitive({ page, total, audience, watermark }) {
  const d = pitch.competitive;
  const { rows, cols } = d.matrix;
  return (
    <Slide page={page} total={total} audience={audience} watermark={watermark} section="Competition">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} />

      <div
        style={{
          flex: 1,
          border: '1px solid #333',
          backgroundColor: '#141414',
          borderRadius: '4mm',
          overflow: 'hidden',
        }}
      >
        <table
          style={{
            width: '100%',
            height: '100%',
            borderCollapse: 'collapse',
            fontSize: '9.5pt',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <th
                style={{
                  textAlign: 'left',
                  padding: '4mm 5mm',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '7.5pt',
                  letterSpacing: '0.16em',
                  color: '#888',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Capability
              </th>
              {cols.map((c) => (
                <th
                  key={c.name}
                  style={{
                    textAlign: 'center',
                    padding: '4mm 3mm',
                    fontFamily: 'var(--font-display)',
                    fontSize: '10pt',
                    fontWeight: 700,
                    color: c.us ? '#008080' : '#B3B3B3',
                    backgroundColor: c.us ? 'rgba(0,128,128,0.06)' : 'transparent',
                  }}
                >
                  {c.name}
                  {c.us && (
                    <div
                      style={{
                        marginTop: '1mm',
                        display: 'inline-block',
                        backgroundColor: 'rgba(0,128,128,0.18)',
                        color: '#008080',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '6.5pt',
                        fontWeight: 700,
                        letterSpacing: '0.16em',
                        padding: '0.5mm 2mm',
                        borderRadius: '999px',
                      }}
                    >
                      US
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row} style={{ borderBottom: '1px solid #222' }}>
                <td
                  style={{
                    padding: '3.5mm 5mm',
                    fontWeight: 500,
                    color: '#E5E5E5',
                  }}
                >
                  {row}
                </td>
                {cols.map((c) => (
                  <td
                    key={c.name + row}
                    style={{
                      padding: '3.5mm 3mm',
                      textAlign: 'center',
                      backgroundColor: c.us ? 'rgba(0,128,128,0.05)' : 'transparent',
                    }}
                  >
                    <Cell value={c.values[i]} highlight={c.us} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Slide>
  );
}

function Cell({ value, highlight }) {
  // ✓ / ✕ / hi/med/lo glyphs scaled for print
  if (value === 'yes') {
    return (
      <span style={{ color: highlight ? '#008080' : '#2EAD8A', fontWeight: 700, fontSize: '12pt' }}>
        ✓
      </span>
    );
  }
  if (value === 'no') {
    return <span style={{ color: '#555', fontWeight: 600, fontSize: '11pt' }}>✕</span>;
  }
  if (value === 'partial') {
    return <span style={{ color: '#F59E0B', fontWeight: 700, fontSize: '12pt' }}>−</span>;
  }
  const colors = {
    high: highlight ? '#008080' : '#2EAD8A',
    med: '#F59E0B',
    low: '#D14343',
  };
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '7.5pt',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: colors[value] ?? '#888',
      }}
    >
      {value}
    </span>
  );
}
