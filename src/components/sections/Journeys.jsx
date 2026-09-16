'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Check, MapPin, Route, ShieldCheck } from 'lucide-react';

import { Reveal } from './Reveal';

const SCREENS = [
  {
    image: '/assets/pitch/screen-search.png',
    shortLabel: 'Search',
    title: 'Choose where you are going',
    body: 'Search a Lagos destination and see route-aware pickup options around you.',
  },
  {
    image: '/assets/pitch/screen-confirm.png',
    shortLabel: 'Choose',
    title: 'Review route-matched drivers',
    body: 'Review drivers already heading your way and send separate offers for the shared leg.',
  },
  {
    image: '/assets/pitch/screen-negotiate-real.png',
    shortLabel: 'Agree',
    title: 'Agree the fare before pickup',
    body: 'Compare drivers heading your way, edit the offer, and send it without endless bidding.',
  },
  {
    image: '/assets/pitch/screen-track-real.png',
    shortLabel: 'Ride',
    title: 'Track the shared leg',
    body: 'See pickup and drop-off on the map, follow the driver, and keep the trip recorded.',
  },
];

const DRIVER_POINTS = [
  'Post the route you already planned',
  'Choose riders and open seats',
  'Accept or counter each fare once',
];

export function ProductJourney() {
  const [activeScreen, setActiveScreen] = useState(0);
  const screen = SCREENS[activeScreen];

  return (
    <section id="how-it-works" className="relative bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-28">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Private MVP flow
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                One route. A clear flow for everyone in it.
              </h2>
            </div>
            <p className="text-base leading-relaxed text-foreground-muted md:text-lg">
              Riders can keep accepted options open until boarding. Drivers keep control of their
              route, seats, and fare response.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid overflow-hidden rounded-3xl border border-border bg-elevated lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal className="flex flex-col justify-between border-b border-border p-7 md:p-10 lg:border-r lg:border-b-0">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary ring-1 ring-primary/25">
                <Route className="size-3.5" />
                Driver control
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
                Your normal route stays yours.
              </h3>
              <p className="mt-5 text-base leading-relaxed text-foreground-muted">
                TagRides adds matched demand around the trip you were making anyway. It does not
                turn your commute into a chain of blind pickup detours.
              </p>
              <ul className="mt-8 space-y-4">
                {DRIVER_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-3" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex items-center gap-3 border-t border-border pt-6 text-xs font-semibold uppercase tracking-[0.15em] text-foreground-disabled">
              <MapPin className="size-4 text-accent" />
              Yaba to Lagos Island first
            </div>
          </Reveal>

          <div className="relative min-h-[620px] overflow-hidden bg-background p-5 sm:p-8 md:min-h-[700px]">
            <div className="hero-light absolute inset-0 opacity-50" aria-hidden="true" />
            <div className="relative flex h-full flex-col">
              <div
                className="flex gap-2 overflow-x-auto pb-2"
                role="group"
                aria-label="Choose a rider app screen"
              >
                {SCREENS.map((item, index) => (
                  <button
                    key={item.shortLabel}
                    type="button"
                    aria-pressed={activeScreen === index}
                    onClick={() => setActiveScreen(index)}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                      activeScreen === index
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border bg-surface text-foreground-muted hover:text-foreground'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')} · {item.shortLabel}
                  </button>
                ))}
              </div>

              <div
                aria-live="polite"
                className="mt-7 grid flex-1 gap-7 sm:grid-cols-[minmax(0,1fr)_220px] sm:items-center md:grid-cols-[minmax(0,1fr)_260px]"
              >
                <div className="self-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Rider flow
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {screen.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground-muted md:text-base">
                    {screen.body}
                  </p>
                  <div className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    Private MVP screen
                    <ShieldCheck className="size-4" />
                  </div>
                </div>

                <div className="mx-auto w-[210px] md:w-[250px]">
                  <div className="relative aspect-[768/1663] overflow-hidden rounded-[2rem] border border-white/15 bg-black shadow-2xl shadow-primary/20 ring-1 ring-primary/20">
                    <Image
                      key={screen.image}
                      src={screen.image}
                      alt={screen.title}
                      fill
                      sizes="(max-width: 640px) 210px, 250px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <span className="font-mono text-xs text-foreground-disabled">
                  {activeScreen + 1} / {SCREENS.length}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveScreen((activeScreen + 1) % SCREENS.length)}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-hover"
                >
                  Next screen
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
