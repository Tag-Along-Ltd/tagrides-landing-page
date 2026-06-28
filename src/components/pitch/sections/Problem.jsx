'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../motion/Section';
import { PersonaIllustration } from '../PersonaIllustration';
import pitch from '@/data/pitch.json';

// Problem — Fatima (rider) + Emeka (driver). Two-sided pain, presented
// as facing persona cards. On mobile they stack vertically.
export function Problem() {
  const data = pitch.problem;
  return (
    <PitchSection id="problem" tone="surface" watermark="mark-br">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-2 md:gap-10">
        {data.personas.map((p, i) => (
          <PersonaCard key={p.name} persona={p} index={i} />
        ))}
      </div>
    </PitchSection>
  );
}

function PersonaCard({ persona, index }) {
  // Rider gets primary teal accent; driver gets amber. Visual coding of
  // the two-sided market — keep it consistent across the deck.
  const accent = index === 0 ? 'primary' : 'accent';
  const kind = index === 0 ? 'rider' : 'driver';

  // Prefer a stock photo if persona.image loads; fall back to the
  // designed SVG illustration if the image is missing or fails. The
  // SVG is brand-coherent and never breaks, so the page is always
  // visually complete.
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = !!persona.image && !photoFailed;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-elevated/70 p-8 ring-1 ring-border/40 transition hover:ring-border/70 md:p-10"
    >
      {/* Accent stripe down the left edge */}
      <div
        aria-hidden
        className={accent === 'primary' ? 'absolute top-0 bottom-0 left-0 w-1 bg-primary' : 'absolute top-0 bottom-0 left-0 w-1 bg-accent'}
      />

      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        {/* Diamond-framed persona portrait. Outer rotated 45° to make a
            diamond, inner content rotated back upright + scaled to fill
            so the diamond crops nicely. Photos preferred; designed SVG
            illustration is the never-fail fallback. */}
        <div className="shrink-0">
          <div className="relative size-28 rotate-45 overflow-hidden rounded-2xl ring-2 ring-border/60 md:size-32">
            <div className="absolute inset-0 -rotate-45 scale-150">
              {showPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={persona.image}
                  alt={`${persona.name} — persona composite`}
                  className="size-full object-cover"
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <PersonaIllustration kind={kind} className="size-full" />
              )}
            </div>
          </div>
        </div>

        <div>
          <div className={accent === 'primary' ? 'font-mono text-xs tracking-[0.2em] text-primary' : 'font-mono text-xs tracking-[0.2em] text-accent'}>
            {index === 0 ? 'RIDER' : 'DRIVER'}
          </div>
          <h3 className="mt-1 font-display text-2xl font-bold text-foreground md:text-3xl">
            {persona.name}
          </h3>
          <div className="mt-1 text-sm text-foreground-muted">{persona.role}</div>
          <div className="mt-1 text-xs font-mono tracking-wide text-foreground-muted/70">
            {persona.location}
          </div>
          <div className="mt-2 font-mono text-[10px] tracking-[0.18em] text-foreground-muted/50 italic md:text-xs">
            Persona · composite
          </div>
        </div>
      </div>

      <ul className="mt-8 space-y-4">
        {persona.pain.map((point, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            className="flex gap-3 text-base text-foreground-muted leading-relaxed md:text-lg"
          >
            <span
              aria-hidden
              className={accent === 'primary'
                ? 'mt-2 size-1.5 shrink-0 rotate-45 bg-primary'
                : 'mt-2 size-1.5 shrink-0 rotate-45 bg-accent'}
            />
            <span>{point}</span>
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}
