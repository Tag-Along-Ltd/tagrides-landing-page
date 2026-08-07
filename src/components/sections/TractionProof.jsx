'use client';

import Link from 'next/link';
import { ArrowUpRight, MapPin, Smartphone, Users } from 'lucide-react';

import { Reveal, RevealItem, RevealStagger } from './Reveal';

const PROOF = [
  {
    icon: Smartphone,
    value: 'Live MVP',
    label: 'Flutter app and real-time trip flow running on AWS',
  },
  {
    icon: Users,
    value: '210+',
    label: 'Lagos riders surveyed before the product was built',
  },
  {
    icon: Users,
    value: '90',
    label: 'Early waitlist signups, concentrated around the Yaba commute belt',
  },
  {
    icon: MapPin,
    value: '1 corridor',
    label: 'Yaba to Lagos Island is the focused first launch',
  },
];

export function TractionProof() {
  return (
    <section id="proof" className="relative bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-28">
        <Reveal className="grid gap-8 md:grid-cols-[1fr_0.75fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Built from Lagos, not assumptions
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              Researched, built, and already running.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-foreground-muted md:text-lg">
            The first corridor is deliberately narrow: prove reliable matching on one daily commute,
            then expand with evidence.
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem
                key={item.value}
                className="rounded-2xl border border-border bg-elevated p-6"
              >
                <Icon className="size-5 text-primary" />
                <p className="mt-8 font-display text-3xl font-bold tracking-tight text-foreground">
                  {item.value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{item.label}</p>
              </RevealItem>
            );
          })}
        </RevealStagger>

        <Reveal delay={0.1} className="mt-8">
          <Link
            href="/pitch?investor"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-hover"
          >
            See the research and company deck
            <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
