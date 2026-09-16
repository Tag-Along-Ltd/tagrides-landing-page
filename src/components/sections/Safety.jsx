'use client';

import { BadgeCheck, MapPinned, Receipt } from 'lucide-react';

import { Reveal, RevealStagger, RevealItem } from './Reveal';

const SIGNALS = [
  {
    icon: BadgeCheck,
    title: 'Know who you ride with',
    body: 'The pilot plan requires driver identity and vehicle details to be checked before activation, with two-sided ratings after trips.',
  },
  {
    icon: MapPinned,
    title: 'Keep the trip visible',
    body: 'Live-trip sharing and incident reporting are being tested so the pilot can retain route and participant records.',
  },
  {
    icon: Receipt,
    title: 'Agree before pickup',
    body: 'The pilot flow records the accepted fare before pickup. Payment options will be confirmed before public launch.',
  },
];

export function Safety() {
  return (
    <section id="safety" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Built for accountable shared mobility
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            Accountability is a launch requirement.
          </h2>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-5 md:grid-cols-3">
          {SIGNALS.map((s) => {
            const Icon = s.icon;
            return (
              <RevealItem
                key={s.title}
                className="group rounded-2xl border border-border bg-surface p-6 transition hover:border-primary/40 hover:bg-elevated"
              >
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Icon className="size-4" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold leading-snug tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{s.body}</p>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
