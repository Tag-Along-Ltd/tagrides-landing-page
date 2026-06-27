'use client';

import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../../motion/Section';
import pitch from '@/data/pitch.json';

// Customer Problem — same idea as investor Problem but in the rider's
// voice, not the founder's. First-person framing ("I lose hours…"),
// less data, more recognition.
export function ProblemPersonal() {
  const data = pitch.problemPersonal;
  return (
    <PitchSection id="problem" tone="surface">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
        {data.complaints.map((c, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="relative rounded-2xl bg-elevated/70 p-6 ring-1 ring-border/40 md:p-7"
          >
            <span
              aria-hidden
              className="absolute -top-3 left-6 text-5xl font-display font-extrabold text-primary/40 select-none"
            >
              &ldquo;
            </span>
            <blockquote className="mt-4 text-base leading-relaxed text-foreground md:text-lg">
              {c.quote}
            </blockquote>
            <figcaption className="mt-4 font-mono text-xs text-foreground-muted">
              <span className="text-accent">—</span> {c.persona}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </PitchSection>
  );
}
