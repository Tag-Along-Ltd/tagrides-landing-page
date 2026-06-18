'use client';

import { Wallet, ShieldAlert, CarFront } from 'lucide-react';

import { Reveal, RevealStagger, RevealItem } from './Reveal';

const CARDS = [
  {
    icon: Wallet,
    title: 'Ride-hail is too expensive for daily life.',
    body:
      'Uber and Bolt fares assume one rider paying for the whole car. Most of us can’t afford that twice a day, five days a week.',
  },
  {
    icon: ShieldAlert,
    title: 'Danfo and kabu-kabu are affordable, but chaotic.',
    body:
      'No booking. No record of the fare. No way to know who you’re getting in with. No one to call if something goes wrong.',
  },
  {
    icon: CarFront,
    title: 'Drivers waste empty seats every day.',
    body:
      'Every commute is a car with three empty seats heading exactly where someone else wants to go. The match doesn’t happen because nothing connects them.',
  },
];

export function Problem() {
  return (
    <section id="problem" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Why we built {`TagRides`}
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            Getting around Lagos shouldn&rsquo;t be this hard.
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
