'use client';

import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../motion/Section';
import pitch from '@/data/pitch.json';

// Traction — four hard proof points (n=210 surveyed, 90 waitlisted,
// $52K cloud credits, MVP live) followed by backers as a chip rail.
// The point of this slide: this isn't a deck-only company. There's a
// thing already running, people are signing up, real institutions
// have already put their stamp on it.
export function Traction() {
  const data = pitch.traction;
  return (
    <PitchSection id="traction" tone="background">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      {/* Proof points */}
      <div className="mt-16 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-4 md:gap-6">
        {data.proof.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative overflow-hidden rounded-2xl bg-elevated/70 p-6 ring-1 ring-border/40 md:p-8"
          >
            <div className="font-display text-4xl font-extrabold tracking-tight text-primary tabular-nums md:text-5xl">
              {p.value}
            </div>
            <div className="mt-3 font-display text-sm font-bold text-foreground md:text-base">
              {p.label}
            </div>
            <div className="mt-1 text-xs text-foreground-muted md:text-sm">{p.context}</div>
          </motion.div>
        ))}
      </div>

      {/* Backers rail */}
      <div className="mt-16 md:mt-24">
        <div className="mb-6 font-mono text-xs tracking-[0.24em] text-accent md:text-sm">
          BACKED BY
        </div>
        <div className="flex flex-wrap gap-3 md:gap-4">
          {data.backers.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-full bg-surface/60 px-4 py-2.5 ring-1 ring-border/30 md:px-5 md:py-3"
            >
              <span className="font-display text-sm font-bold text-foreground md:text-base">
                {b.name}
              </span>
              <span className="mx-2 text-foreground-muted/40">·</span>
              <span className="font-mono text-xs text-foreground-muted md:text-sm">{b.note}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </PitchSection>
  );
}
