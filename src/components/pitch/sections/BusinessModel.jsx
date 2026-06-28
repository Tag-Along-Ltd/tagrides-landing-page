'use client';

import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../motion/Section';
import pitch from '@/data/pitch.json';

// BusinessModel — two-revenue-line story with a pricing-philosophy
// sub-block. The three pricing levers stack as cards beneath the
// revenue streams. No flow diagrams of "user → driver → money" — that
// reads as PowerPoint; we explain mechanics in plain English instead.
export function BusinessModel() {
  const data = pitch.model;

  return (
    <PitchSection id="model" tone="background" watermark="word-diag">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      {/* Revenue streams */}
      <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
        {data.streams.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="rounded-2xl bg-elevated/70 p-8 ring-1 ring-border/40 md:p-10"
          >
            <div className="flex items-center justify-between">
              <div className="font-mono text-xs tracking-[0.2em] text-primary">
                STREAM 0{i + 1}
              </div>
              <div className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
                {s.share}
              </div>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-foreground md:text-3xl">
              {s.label}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-foreground-muted md:text-lg">
              {s.detail}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Pricing levers */}
      <div className="mt-16 md:mt-24">
        <div className="mb-6 font-mono text-xs tracking-[0.24em] text-accent md:text-sm">
          HOW THE FARE IS SET
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {data.pricing.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl bg-surface/60 p-6 ring-1 ring-border/30"
            >
              <div className="font-display text-lg font-bold text-foreground md:text-xl">
                {p.label}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-foreground-muted md:text-base">
                {p.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PitchSection>
  );
}
