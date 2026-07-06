'use client';

import { Reveal, RevealStagger, RevealItem } from './Reveal';

const STATS = [
  { number: '2,000',  label: 'Active drivers earning supplementary income from daily commutes' },
  { number: '50,000', label: 'Daily riders moving safely, at prices closer to what they already pay' },
  { number: '6',      label: 'First expansion cities with the same route-share economics' },
];

export function VisionNumbers() {
  return (
    <section id="vision" className="relative bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            What we&rsquo;re building
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            A new shape for daily urban mobility.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted md:text-lg">
            Lagos is the wedge because it makes the problem impossible to ignore: high demand,
            informal sharing, expensive ride-hail, and drivers already moving with empty seats. The
            same route economics travel to many cities after the first corridor works.
          </p>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-6 md:grid-cols-3">
          {STATS.map((s, i) => (
            <RevealItem
              key={s.number}
              className="relative overflow-hidden rounded-3xl border border-border bg-elevated p-8"
            >
              <div className="absolute -right-6 -top-6 size-32 rounded-full bg-primary/10 blur-2xl" />
              <p className="relative font-mono text-6xl font-semibold tracking-tight text-primary md:text-7xl">
                {s.number}
              </p>
              <p className="relative mt-4 text-sm leading-relaxed text-foreground-muted">{s.label}</p>
            </RevealItem>
          ))}
        </RevealStagger>
        <Reveal delay={0.2}>
          <p className="mt-8 text-xs uppercase tracking-[0.18em] text-foreground-disabled">
            3-year targets, starting with the Lagos pilot corridor in 2026.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
