'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

// Pitch section primitive. Every deck slide uses this so spacing,
// minimum-height, and viewport rhythm stay locked across sections.
// `min-h-[100svh]` uses small-viewport-height to dodge iOS Safari's
// dynamic toolbar 100vh bug.
export function PitchSection({ id, tone = 'background', children, className }) {
  const toneClass = {
    background: 'bg-background',
    surface:    'bg-surface',
    elevated:   'bg-elevated',
    primary:    'bg-primary text-primary-foreground',
  }[tone] ?? 'bg-background';

  return (
    <section
      id={id}
      className={cn(
        'relative isolate flex min-h-[100svh] w-full snap-start items-center overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20',
        toneClass,
        className,
      )}
    >
      {/* Corner ornament — tiny diamond glyph echoing the deck's visual language */}
      <span
        aria-hidden="true"
        className="absolute top-8 left-8 size-2 rotate-45 bg-primary/70 md:top-12 md:left-12"
      />
      <span
        aria-hidden="true"
        className="absolute right-8 bottom-8 size-2 rotate-45 bg-primary/40 md:right-12 md:bottom-12"
      />
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

// Eyebrow + headline + subhead block. Used in nearly every section so
// type rhythm stays consistent. Lock-step animation on viewport entry.
export function SectionHeading({ eyebrow, title, subtitle, className, align = 'left' }) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      className={cn('max-w-4xl', alignClass, className)}
    >
      {eyebrow && (
        <div className="font-mono text-xs tracking-[0.24em] text-primary md:text-sm">{eyebrow}</div>
      )}
      <h2 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 text-lg leading-relaxed text-foreground-muted md:text-xl">{subtitle}</p>
      )}
    </motion.header>
  );
}
