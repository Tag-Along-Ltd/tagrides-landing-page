'use client';

import { Reveal, RevealStagger, RevealItem } from './Reveal';

const REASONS = [
  {
    badge: '01',
    title: 'The okada ban changed everything.',
    body: 'Millions of commuters were pushed back into shared four-wheel transport. The demand is here, the supply is informal.',
  },
  {
    badge: '02',
    title: 'Fuel prices broke dedicated ride-hail.',
    body: 'Uber and Bolt are now out of reach for everyday use. People need an everyday option.',
  },
  {
    badge: '03',
    title: 'Mobile money finally works.',
    body: 'Bank transfers and wallets are fast enough to settle small fares instantly. Five years ago the tech wasn’t ready. Now it is.',
  },
];

export function WhyNow() {
  return (
    <section id="why-now" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The moment</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            Lagos has changed. Mobility hasn&rsquo;t kept up.
          </h2>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-6 md:grid-cols-3">
          {REASONS.map((r) => (
            <RevealItem
              key={r.badge}
              className="relative rounded-2xl border border-border bg-surface p-7 transition hover:border-accent/40"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {r.badge}
              </p>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight text-foreground">
                {r.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{r.body}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
