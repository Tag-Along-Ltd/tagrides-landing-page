'use client';

import { Check, X, Minus } from 'lucide-react';

import { Reveal } from './Reveal';

const ROWS = [
  { service: 'Uber / Bolt',       cost: '₦₦₦', safety: 'check', negotiable: 'x',     cashless: 'Required' },
  { service: 'Danfo / Kabu-kabu', cost: '₦',   safety: 'x',     negotiable: 'limit', cashless: 'No'      },
  { service: 'TagRides',          cost: '₦ or below', safety: 'check', negotiable: 'check', cashless: 'Optional', highlight: true },
];

function Glyph({ kind }) {
  if (kind === 'check') return <Check className="size-4 text-success" />;
  if (kind === 'x') return <X className="size-4 text-danger" />;
  if (kind === 'limit') return <Minus className="size-4 text-foreground-muted" />;
  return <span className="font-mono text-sm text-foreground">{kind}</span>;
}

export function PricingPhilosophy() {
  return (
    <section id="pricing" className="relative bg-primary text-white">
      {/* layered glow */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 0%, rgba(255,255,255,0.12) 0, transparent 45%), radial-gradient(circle at 90% 100%, rgba(245,158,11,0.18) 0, transparent 50%)',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-32">
        <Reveal>
          <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Fairer than ride-hail.
            <br />
            <span className="text-accent">Safer than danfo.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            TagRides fares aren&rsquo;t set by an algorithm. The draft offer starts at the current
            public-transport price — the same fare you&rsquo;d pay a danfo on that route. The
            driver accepts, counters, or goes lower. Often lower, because a driver heading there
            anyway has near-zero marginal cost on the empty seat. Public transport is the ceiling,
            not the floor.
          </p>
        </Reveal>

        {/* Comparison table */}
        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-sm">
            <div className="grid grid-cols-5 gap-2 border-b border-white/10 bg-white/[0.04] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
              <div className="col-span-1">Service</div>
              <div className="text-center">Avg cost</div>
              <div className="text-center">Safety</div>
              <div className="text-center">Negotiable</div>
              <div className="text-center">Cashless</div>
            </div>
            {ROWS.map((row) => (
              <div
                key={row.service}
                className={`grid grid-cols-5 items-center gap-2 px-6 py-5 text-sm transition ${
                  row.highlight ? 'bg-accent/15 text-white' : 'text-white/85'
                }`}
              >
                <div className="col-span-1 font-display font-semibold text-white">
                  {row.service}
                  {row.highlight && (
                    <span className="ml-2 inline-block rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-foreground">
                      Us
                    </span>
                  )}
                </div>
                <div className="text-center font-mono">{row.cost}</div>
                <div className="flex justify-center">
                  <Glyph kind={row.safety} />
                </div>
                <div className="flex justify-center">
                  <Glyph kind={row.negotiable} />
                </div>
                <div className="text-center font-mono text-xs">{row.cashless}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
