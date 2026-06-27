'use client';

import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../../motion/Section';
import pitch from '@/data/pitch.json';

// HowItWorks — customer-facing 3-step. Bigger numerals, friendlier
// language than the Investor Solution slide. Each step has a numbered
// gradient avatar + plain-English copy + a UI hint.
export function HowItWorks() {
  const data = pitch.howItWorks;
  return (
    <PitchSection id="how" tone="background">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-3 md:gap-10">
        {data.steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-4"
          >
            <div className="relative">
              <div className="flex size-20 items-center justify-center rounded-2xl bg-primary font-display text-3xl font-extrabold text-primary-foreground md:size-24 md:text-4xl">
                {i + 1}
              </div>
              <div
                aria-hidden
                className="absolute -inset-2 -z-10 rounded-3xl bg-primary/20 blur-2xl"
              />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              {step.title}
            </h3>
            <p className="text-base leading-relaxed text-foreground-muted md:text-lg">
              {step.detail}
            </p>
            {step.hint && (
              <div className="mt-2 rounded-lg bg-surface/60 px-3 py-2 font-mono text-xs text-foreground-muted ring-1 ring-border/30 md:text-sm">
                {step.hint}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </PitchSection>
  );
}
