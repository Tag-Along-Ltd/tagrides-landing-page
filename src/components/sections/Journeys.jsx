'use client';

import {
  MapPin,
  ListChecks,
  MessageSquare,
  UserCheck,
  Car,
  Wallet,
  Route,
  Users,
  TrendingUp,
  CircleDollarSign,
  Navigation,
  CheckCircle2,
} from 'lucide-react';

import { Reveal, RevealStagger, RevealItem } from './Reveal';

const RIDER_STEPS = [
  { icon: MapPin,         title: 'Tell us where you’re going',  body: 'Pick your destination. We find drivers heading the same way.' },
  { icon: ListChecks,     title: 'See your live departure board', body: 'Multiple drivers, each with route, ETA, vehicle, rating, and seats — all in one view.' },
  { icon: MessageSquare,  title: 'Negotiate your fare',          body: 'Chat with several drivers at once. Agree a price that works for both of you.' },
  { icon: UserCheck,      title: 'Pick your driver',             body: 'Best price, fastest ETA, highest rating — whichever matters most to you.' },
  { icon: Car,            title: 'Hop on, ride along',           body: 'Get picked up near your start. Drop off at your stop. No detours, no surprises.' },
  { icon: Wallet,         title: 'Pay your way',                 body: 'Cash or in-app wallet. Every fare is logged before pickup, so there are no arguments later.' },
];

const DRIVER_STEPS = [
  { icon: Route,             title: 'Tell the app your route',          body: 'Where are you going today? Work? School? The market? Post it.' },
  { icon: Users,             title: 'See riders along your way',         body: 'Real-time, on your route. No detours, no wild goose chases.' },
  { icon: CircleDollarSign,  title: 'Set your fare or negotiate',        body: 'You decide what’s fair. The rider agrees before they get in.' },
  { icon: CheckCircle2,      title: 'Pick who to take',                  body: 'Up to your seat capacity. You’re in control of every choice.' },
  { icon: Navigation,        title: 'Pick up. Drop off. Drive on.',      body: 'The app guides you. The rider tracks you. Everyone knows where things stand.' },
  { icon: TrendingUp,        title: 'Earn from a trip you were already making', body: 'Daily commute = daily income. Your car was going there anyway.' },
];

function JourneyGrid({ steps, accent = 'primary' }) {
  const ringClass = accent === 'accent' ? 'ring-accent/30 bg-accent/10 text-accent' : 'ring-primary/25 bg-primary/10 text-primary';
  const badgeClass = accent === 'accent' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground';

  return (
    <RevealStagger className="mt-14 grid gap-5 md:grid-cols-3">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <RevealItem
            key={step.title}
            className="relative rounded-2xl border border-border bg-surface p-6 transition hover:border-primary/40"
          >
            <div className="flex items-center gap-3">
              <span className={`inline-flex size-7 items-center justify-center rounded-full font-mono text-xs font-semibold ${badgeClass}`}>
                {i + 1}
              </span>
              <div className={`inline-flex size-9 items-center justify-center rounded-lg ring-1 ${ringClass}`}>
                <Icon className="size-4" />
              </div>
            </div>
            <h3 className="mt-5 font-display text-base font-semibold leading-snug tracking-tight text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{step.body}</p>
          </RevealItem>
        );
      })}
    </RevealStagger>
  );
}

export function RiderJourney() {
  return (
    <section id="rider-journey" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">For riders</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            Five steps. Less than a minute to book.
          </h2>
        </Reveal>
        <JourneyGrid steps={RIDER_STEPS} accent="primary" />
      </div>
    </section>
  );
}

export function DriverJourney() {
  return (
    <section id="driver-journey" className="relative bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">For drivers</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            Turn your daily commute into daily income.
          </h2>
        </Reveal>
        <JourneyGrid steps={DRIVER_STEPS} accent="accent" />
      </div>
    </section>
  );
}
