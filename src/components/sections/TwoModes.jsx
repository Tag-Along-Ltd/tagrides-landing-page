'use client';

import { Users, User } from 'lucide-react';

import { Reveal, RevealStagger, RevealItem } from './Reveal';

const MODES = [
  {
    key: 'along',
    eyebrow: 'The shared ride',
    title: 'Tag-Along',
    icon: Users,
    accent: 'primary',
    body:
      'Hop on with a driver heading your way. Share the route, share the cost. Pay public-transport prices for a private-car ride.',
    best: ['Daily commutes', 'Regular trips', 'Anyone who’d rather pay less than have the car to themselves'],
  },
  {
    key: 'direct',
    eyebrow: 'The dedicated ride',
    title: 'Direct',
    icon: User,
    accent: 'accent',
    body:
      'Hire the whole car. No other riders. Driver picks you up, takes you straight there, no stops along the way.',
    best: ['Hospital trips', 'Late nights', 'Sensitive meetings', 'Anything you want to do privately'],
  },
];

export function TwoModes() {
  return (
    <section id="modes" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Choose your ride
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            One app. Two ways to move.
          </h2>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-6 md:grid-cols-2">
          {MODES.map((mode) => {
            const Icon = mode.icon;
            const isPrimary = mode.accent === 'primary';
            const accentClass = isPrimary ? 'border-primary/50' : 'border-accent/50';
            const iconWrap = isPrimary
              ? 'bg-primary/15 text-primary ring-primary/30'
              : 'bg-accent/15 text-accent ring-accent/30';
            const titleAccent = isPrimary ? 'text-primary' : 'text-accent';
            return (
              <RevealItem
                key={mode.key}
                className={`rounded-3xl border ${accentClass} bg-elevated p-8 transition hover:shadow-[0_30px_90px_-30px_rgba(0,128,128,0.4)]`}
              >
                <div className={`inline-flex size-12 items-center justify-center rounded-xl ring-1 ${iconWrap}`}>
                  <Icon className="size-5" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                  {mode.eyebrow}
                </p>
                <h3 className={`mt-2 font-display text-3xl font-bold tracking-tight ${titleAccent}`}>
                  {mode.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-foreground-muted">{mode.body}</p>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                  Best for
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {mode.best.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-foreground"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
