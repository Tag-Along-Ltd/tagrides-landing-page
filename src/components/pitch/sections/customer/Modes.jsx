'use client';

import { motion } from 'motion/react';
import { Users, Sparkles } from 'lucide-react';

import { PitchSection, SectionHeading } from '../../motion/Section';
import pitch from '@/data/pitch.json';

// Modes — Tag-Along vs Direct. Two cards side by side, the left
// (Tag-Along, the differentiated mode) is visually weighted.
export function Modes() {
  const data = pitch.modes;
  return (
    <PitchSection id="modes" tone="elevated">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
        <ModeCard mode={data.modes[0]} primary />
        <ModeCard mode={data.modes[1]} />
      </div>
    </PitchSection>
  );
}

function ModeCard({ mode, primary = false }) {
  const Icon = primary ? Sparkles : Users;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: primary ? 0 : 0.1 }}
      className={primary
        ? 'relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground ring-1 ring-primary md:p-10'
        : 'relative overflow-hidden rounded-2xl bg-surface/70 p-8 ring-1 ring-border/40 md:p-10'}
    >
      <div className="flex items-center justify-between">
        <Icon className={primary ? 'size-7 text-primary-foreground' : 'size-7 text-accent'} />
        {primary && (
          <span className="rounded-full bg-background/15 px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.18em] text-primary-foreground/90">
            SIGNATURE
          </span>
        )}
      </div>
      <h3 className={primary
        ? 'mt-6 font-display text-3xl font-extrabold tracking-tight md:text-4xl'
        : 'mt-6 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl'}
      >
        {mode.name}
      </h3>
      <p className={primary
        ? 'mt-3 text-base leading-relaxed text-primary-foreground/85 md:text-lg'
        : 'mt-3 text-base leading-relaxed text-foreground-muted md:text-lg'}
      >
        {mode.tagline}
      </p>
      <ul className="mt-6 space-y-3">
        {mode.features.map((f, i) => (
          <li
            key={i}
            className={primary
              ? 'flex gap-3 text-sm leading-snug text-primary-foreground/90 md:text-base'
              : 'flex gap-3 text-sm leading-snug text-foreground md:text-base'}
          >
            <span
              aria-hidden
              className={primary
                ? 'mt-2 size-1.5 shrink-0 rotate-45 bg-primary-foreground'
                : 'mt-2 size-1.5 shrink-0 rotate-45 bg-accent'}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
