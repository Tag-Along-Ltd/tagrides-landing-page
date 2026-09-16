'use client';

import { Reveal } from './Reveal';

const ROWS = [
  {
    service: 'Private ride-hail',
    journey: 'A car is dispatched for one private trip',
    pricing: 'Platform quote for the whole trip',
  },
  {
    service: 'Informal shared transport',
    journey: 'Passengers share a fixed or familiar route',
    pricing: 'Route or operator fare',
  },
  {
    service: 'TagRides pilot model',
    journey: "A rider joins a driver's existing route",
    pricing: 'Rider offers; driver accepts or counters once',
    highlight: true,
  },
];

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
            Public-transport fares are the benchmark.
            <br />
            <span className="text-white">The agreed fare stays visible.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            TagRides researched 30 Lagos routes in November 2024. The pilot will test whether
            route-aligned seats can stay near local shared-transport benchmarks while recording the
            fare before pickup.
          </p>
        </Reveal>

        {/* Comparison table */}
        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-x-auto rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-sm">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">How the TagRides pilot pricing model differs</caption>
              <thead className="border-b border-white/10 bg-white/[0.04] text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Service model
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Journey
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Pricing basis
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.service}
                    className={
                      row.highlight ? 'bg-white/10' : 'border-b border-white/10 last:border-0'
                    }
                  >
                    <th scope="row" className="px-6 py-5 font-display font-semibold text-white">
                      {row.service}
                    </th>
                    <td className="px-6 py-5 text-white/85">{row.journey}</td>
                    <td className="px-6 py-5 text-white/85">{row.pricing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-white/70">Planning target, not a fare guarantee.</p>
        </Reveal>
      </div>
    </section>
  );
}
