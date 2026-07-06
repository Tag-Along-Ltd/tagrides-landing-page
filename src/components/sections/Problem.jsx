'use client';

import { Wallet, ShieldAlert, CarFront } from 'lucide-react';

import { Reveal, RevealStagger, RevealItem } from './Reveal';

const CARDS = [
  {
    icon: CarFront,
    title: 'The car is already moving.',
    body:
      'You still buy the fuel. You still sit in traffic. The route still has to happen — but the empty seats earn nothing.',
  },
  {
    icon: Wallet,
    title: 'Daily ride-hail leaves most people behind.',
    body:
      'Uber and Bolt fares assume one rider paying for the whole car. That works for occasional trips, not for the daily commute most people cannot avoid.',
  },
  {
    icon: ShieldAlert,
    title: 'Informal sharing needs structure.',
    body:
      'People already share routes: danfo, keke, kabu-kabu, and friend-of-a-friend lifts. What is missing is the profile, fare record, trip log, and accountability.',
  },
];

export function Problem() {
  return (
    <section id="problem" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Why we built {`TagRides`}
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            The route already exists. The match does not.
          </h2>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-6 md:grid-cols-3">
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <RevealItem
                key={card.title}
                className="group rounded-2xl border border-border bg-surface p-7 transition hover:border-primary/40 hover:bg-elevated"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition group-hover:bg-primary/20">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{card.body}</p>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
