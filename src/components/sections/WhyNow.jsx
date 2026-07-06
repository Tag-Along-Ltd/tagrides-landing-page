'use client';

import { Reveal, RevealStagger, RevealItem } from './Reveal';

const REASONS = [
  {
    badge: '01',
    title: 'Informal transit already carries the city.',
    body: 'From Lagos to other high-density cities, people already share routes because the economics force it. The demand is here; the supply is just unstructured.',
  },
  {
    badge: '02',
    title: 'Fuel prices broke dedicated ride-hail.',
    body: 'When fuel and traffic rise, one person paying for one whole car becomes a luxury. People need an everyday option.',
  },
  {
    badge: '03',
    title: 'The trust layer is finally possible.',
    body: 'Smartphones, wallets, live location, and identity checks are now common enough to make small shared fares and traceable trips work at city scale.',
  },
];

export function WhyNow() {
  return (
    <section id="why-now" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The moment</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            Cities changed. Mobility hasn&rsquo;t kept up.
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
