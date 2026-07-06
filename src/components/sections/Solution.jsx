'use client';

import { motion } from 'motion/react';

import { Reveal } from './Reveal';

const PICKUPS = [
  { x: 18, label: '₦600', who: 'Aisha' },
  { x: 48, label: '₦500', who: 'Tunde' },
  { x: 78, label: '₦700', who: 'Chinedu' },
];

export function Solution() {
  return (
    <section id="solution" className="relative bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            How we fix it
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            Post your route. Pick your riders. Agree the fare.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted md:text-lg">
            Tag-Along is the route-share mode in TagRides. You tell the app where you are already
            going. Riders heading the same way request seats, agree fares with you before pickup,
            and hop off along your route. Same road you were taking anyway. More paid seats. No
            blind detours.
          </p>
        </Reveal>

        {/* Route diagram */}
        <Reveal delay={0.1} className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-elevated p-6 md:p-10">
            <div className="absolute inset-0 hero-light opacity-50" aria-hidden="true" />
            <div className="relative h-[200px] md:h-[260px]">
              <svg viewBox="0 0 1000 240" className="h-full w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="route" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#008080" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#008080" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Path */}
                <motion.path
                  d="M 30 180 Q 200 60, 400 130 T 750 100 T 970 80"
                  fill="none"
                  stroke="url(#route)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.6, ease: 'easeOut' }}
                  filter="url(#glow)"
                />
                {/* Start: car */}
                <g transform="translate(20, 170)">
                  <circle r="14" fill="#008080" />
                  <circle r="6" fill="#0a0a0a" />
                </g>
                {/* End: flag */}
                <g transform="translate(978, 75)">
                  <circle r="12" fill="#F59E0B" opacity="0.25" />
                  <circle r="6" fill="#F59E0B" />
                </g>
              </svg>

              {/* Pickup labels */}
              <div className="pointer-events-none absolute inset-0">
                {PICKUPS.map((p, i) => (
                  <motion.div
                    key={p.who}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.25 }}
                    className="absolute -translate-x-1/2 -translate-y-full"
                    style={{ left: `${p.x}%`, top: '60%' }}
                  >
                    <div className="rounded-full border border-primary/50 bg-background/90 px-3 py-1 font-mono text-xs font-medium text-foreground backdrop-blur-sm">
                      {p.who} · {p.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-8 grid gap-4 text-center text-xs uppercase tracking-[0.18em] text-foreground-muted md:grid-cols-3">
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <p className="text-foreground-muted">Driver heads</p>
                <p className="mt-1 font-display text-base font-semibold text-foreground normal-case tracking-tight">
                  Yaba → Lekki
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <p className="text-foreground-muted">Riders share</p>
                <p className="mt-1 font-display text-base font-semibold text-foreground normal-case tracking-tight">
                  3 along the way
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <p className="text-foreground-muted">Each pays only for</p>
                <p className="mt-1 font-display text-base font-semibold text-foreground normal-case tracking-tight">
                  Their leg
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
