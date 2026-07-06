'use client';

import { ShieldCheck, Star, Receipt, Share2, Siren, Wallet } from 'lucide-react';

import { Reveal, RevealStagger, RevealItem } from './Reveal';

const SIGNALS = [
  { icon: ShieldCheck, title: 'Verified drivers',                  body: 'Drivers are checked with ID, vehicle details, and market-specific verification before activation.' },
  { icon: Star,        title: 'Real ratings, both ways',           body: 'Riders rate drivers. Drivers rate riders. Both build a record over time.' },
  { icon: Receipt,     title: 'Every fare logged before pickup',   body: 'No "this was supposed to cost less" at the end of the trip.' },
  { icon: Share2,      title: 'Trip tracking',                     body: 'Share your live trip with a friend or family member with one tap.' },
  { icon: Siren,       title: 'In-app incident reporting',         body: 'Report an issue with the trip, fare, route, rider, and driver records already attached.' },
  { icon: Wallet,      title: 'Cash or wallet, your choice',       body: 'We support how people actually pay in each launch market. No forced card-first onboarding.' },
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
            Safety isn&rsquo;t a feature. It&rsquo;s the whole point.
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
