'use client';

import { Sparkles } from 'lucide-react';

import { Reveal, RevealStagger, RevealItem } from './Reveal';
import { cn } from '@/lib/utils';
import data from '@/data/backed-by.json';

// Programs render as text wordmarks for now — when you drop actual SVG logos
// into /public/assets/logos/{tef,gfs,mfs,alx}.svg, just set `logoSrc` to that
// path in `src/data/backed-by.json` and the card will swap automatically.
function ProgramCard({ program }) {
  const isPrimary = program.weight === 'primary';
  return (
    <RevealItem
      className={cn(
        'group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border bg-surface p-6 transition',
        isPrimary
          ? 'border-primary/40 hover:border-primary/70 hover:bg-elevated'
          : 'border-border hover:border-primary/40 hover:bg-elevated',
      )}
    >
      {/* Accent halo for primary cards */}
      {isPrimary && (
        <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/12 blur-3xl transition group-hover:bg-primary/20" />
      )}

      <div className="relative">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'inline-flex size-7 items-center justify-center rounded-md text-xs font-semibold',
              isPrimary
                ? 'bg-primary/15 text-primary ring-1 ring-primary/30'
                : 'bg-elevated text-foreground-muted ring-1 ring-border',
            )}
          >
            {program.shorthand[0]}
          </span>
          <p
            className={cn(
              'text-[10px] font-semibold uppercase tracking-[0.18em]',
              isPrimary ? 'text-primary' : 'text-foreground-muted',
            )}
          >
            {program.role}
          </p>
        </div>

        {program.logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={program.logoSrc}
            alt={program.name}
            className="mt-5 h-7 w-auto opacity-90 group-hover:opacity-100"
          />
        ) : (
          <p className="mt-5 font-display text-lg font-semibold leading-tight tracking-tight text-foreground">
            {program.name}
          </p>
        )}
      </div>

      <p className="relative mt-5 text-sm leading-relaxed text-foreground-muted">{program.note}</p>
    </RevealItem>
  );
}

export function BackedBy({ id = 'backed-by', className }) {
  return (
    <section id={id} className={cn('relative', className)}>
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-28">
        <Reveal className="flex flex-col gap-4 md:max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <Sparkles className="size-3" />
            {data.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            {data.headline}
          </h2>
          <p className="text-base leading-relaxed text-foreground-muted md:text-lg">{data.lead}</p>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {data.programs.map((program) => (
            <ProgramCard key={program.name} program={program} />
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
