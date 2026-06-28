'use client';

import { motion } from 'motion/react';
import { Check, X, Minus } from 'lucide-react';

import { PitchSection, SectionHeading } from '../motion/Section';
import pitch from '@/data/pitch.json';

// Competitive — feature matrix that fills row-by-row on scroll, plus
// three one-liner differentiators below. The "us" column is highlighted
// so investors don't have to hunt for our row.
export function Competitive() {
  const data = pitch.competitive;
  const { rows, cols } = data.matrix;

  return (
    <PitchSection id="competitive" tone="elevated" watermark="diamonds">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      {/* Matrix */}
      <div className="mt-16 overflow-hidden rounded-2xl bg-surface/60 ring-1 ring-border/30 md:mt-20">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm md:text-base">
            <thead>
              <tr className="border-b border-border/40">
                <th className="p-4 text-left font-mono text-xs tracking-wider text-foreground-muted md:p-6">
                  CAPABILITY
                </th>
                {cols.map((c) => (
                  <th
                    key={c.name}
                    className={c.us
                      ? 'p-4 text-center font-display font-bold text-primary md:p-6 md:text-lg'
                      : 'p-4 text-center font-display font-bold text-foreground-muted md:p-6 md:text-lg'}
                  >
                    {c.name}
                    {c.us && (
                      <div className="mt-1 inline-block rounded-full bg-primary/15 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-primary">
                        US
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="border-b border-border/20 last:border-b-0"
                >
                  <td className="p-4 font-medium text-foreground md:p-6">{row}</td>
                  {cols.map((c) => (
                    <td
                      key={c.name + row}
                      className={c.us
                        ? 'p-4 text-center bg-primary/5 md:p-6'
                        : 'p-4 text-center md:p-6'}
                    >
                      <Verdict value={c.values[i]} highlight={c.us} />
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Differentiators */}
      <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-6">
        {data.differentiation.map((d, i) => (
          <motion.blockquote
            key={d.vs}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-xl bg-background/70 p-6 ring-1 ring-border/30"
          >
            <div className="font-mono text-xs tracking-[0.2em] text-accent">
              VS · {d.vs.toUpperCase()}
            </div>
            <p className="mt-3 font-display text-base leading-snug text-foreground md:text-lg">
              {d.line}
            </p>
          </motion.blockquote>
        ))}
      </div>
    </PitchSection>
  );
}

function Verdict({ value, highlight }) {
  // Map yes/no/partial/high/med/low to consistent glyphs + colour.
  // `highlight` boosts colour saturation in the "us" column.
  if (value === 'yes') {
    return <Check className={highlight ? 'mx-auto size-5 text-primary' : 'mx-auto size-5 text-success'} />;
  }
  if (value === 'no') {
    return <X className="mx-auto size-5 text-foreground-muted/50" />;
  }
  if (value === 'partial') {
    return <Minus className="mx-auto size-5 text-accent" />;
  }
  // Quality tier word values
  const cls = {
    high: highlight ? 'text-primary font-semibold' : 'text-success font-semibold',
    med:  'text-accent font-semibold',
    low:  'text-danger font-semibold',
  }[value] ?? 'text-foreground-muted';
  return <span className={`font-mono text-xs uppercase tracking-wider ${cls}`}>{value}</span>;
}
