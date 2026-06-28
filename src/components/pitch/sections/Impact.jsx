'use client';

import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../motion/Section';
import pitch from '@/data/pitch.json';

// Impact — economic + SDG alignment, especially valuable for judges
// and impact-aware investors. Three big numbers + three SDG chips.
export function Impact() {
  const data = pitch.impact;
  return (
    <PitchSection id="impact" tone="surface" watermark="mark-br">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
        {data.outcomes.map((o, i) => (
          <motion.div
            key={o.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-2xl bg-elevated/60 p-8 ring-1 ring-border/30 md:p-10"
          >
            <div className="font-display text-4xl font-extrabold tracking-tight text-accent tabular-nums md:text-5xl lg:text-6xl">
              {o.value}
            </div>
            <div className="mt-4 text-sm leading-snug text-foreground-muted md:text-base">
              {o.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 md:mt-24">
        <div className="mb-6 font-mono text-xs tracking-[0.24em] text-primary md:text-sm">
          UNITED NATIONS SDG ALIGNMENT
        </div>
        <div className="flex flex-wrap gap-3 md:gap-4">
          {data.sdgs.map((s, i) => (
            <motion.div
              key={s.code}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-full bg-background/70 px-4 py-2.5 ring-1 ring-border/40 md:px-5 md:py-3"
            >
              <span className="rounded-full bg-primary/15 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                {s.code}
              </span>
              <span className="font-display text-sm font-semibold text-foreground md:text-base">
                {s.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </PitchSection>
  );
}
