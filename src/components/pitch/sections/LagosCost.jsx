'use client';

import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../motion/Section';
import { Counter } from '../motion/Counter';
import pitch from '@/data/pitch.json';

// LagosCost — the killer data slide. Four headline counters, then a
// route-by-route comparison list visualised as twin bars. The bars
// animate to their final width when scrolled into view; this section is
// the empirical proof that the market gap is real.
export function LagosCost() {
  const data = pitch.lagosCost;

  // Find the max bolt cost so we can scale all bars consistently
  const maxNaira = Math.max(...data.routes.map((r) => r.boltNaira));

  return (
    <PitchSection id="cost" tone="background" watermark="diamonds">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      {/* Headline counters */}
      <div className="mt-16 grid grid-cols-2 gap-4 md:mt-20 md:gap-8 lg:grid-cols-4">
        {data.stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="rounded-2xl bg-elevated/60 p-6 ring-1 ring-border/30 md:p-8"
          >
            <div className="font-display text-3xl font-extrabold tracking-tight text-primary tabular-nums md:text-5xl">
              <Counter value={s.value} prefix={s.prefix ?? ''} suffix={s.suffix ?? ''} />
            </div>
            <div className="mt-3 text-sm leading-snug text-foreground-muted md:text-base">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Route comparison */}
      <div className="mt-20 md:mt-28">
        <div className="mb-6 flex items-end justify-between">
          <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Same route. Different price.
          </h3>
          <div className="hidden items-center gap-6 font-mono text-xs text-foreground-muted/80 md:flex md:text-sm">
            <span className="flex items-center gap-2">
              <span className="block h-2 w-6 bg-primary" /> Public / informal
            </span>
            <span className="flex items-center gap-2">
              <span className="block h-2 w-6 bg-accent" /> Bolt economy
            </span>
          </div>
        </div>

        <div className="space-y-3 md:space-y-2">
          {data.routes.map((r, i) => (
            <RouteRow key={i} route={r} maxNaira={maxNaira} delay={i * 0.05} />
          ))}
        </div>

        <div className="mt-10 font-mono text-xs text-foreground-muted/60 md:text-sm">
          {data.source}
        </div>
      </div>
    </PitchSection>
  );
}

function RouteRow({ route, maxNaira, delay }) {
  const localPct = (route.maxNaira / maxNaira) * 100;
  const boltPct = (route.boltNaira / maxNaira) * 100;
  const multiplier = (route.boltNaira / route.maxNaira).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className="grid items-center gap-3 rounded-xl bg-surface/40 px-4 py-3 ring-1 ring-border/20 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_auto] md:gap-6 md:px-6"
    >
      <div className="flex flex-wrap items-center gap-x-2 font-mono text-xs text-foreground md:text-sm">
        <span className="truncate">{route.from}</span>
        <span className="text-foreground-muted/60">→</span>
        <span className="truncate">{route.to}</span>
      </div>

      <div className="space-y-1.5">
        <Bar
          label={`₦${route.minNaira.toLocaleString()}–${route.maxNaira.toLocaleString()}`}
          pct={localPct}
          color="primary"
          delay={delay + 0.1}
        />
        <Bar
          label={`₦${route.boltNaira.toLocaleString()}`}
          pct={boltPct}
          color="accent"
          delay={delay + 0.2}
        />
      </div>

      <div className="text-right font-display text-base font-bold text-accent md:text-lg">
        {multiplier}×
      </div>
    </motion.div>
  );
}

function Bar({ label, pct, color, delay }) {
  return (
    <div className="relative">
      <div className="h-5 overflow-hidden rounded-full bg-foreground/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
          className={color === 'primary' ? 'h-full bg-primary' : 'h-full bg-accent'}
        />
      </div>
      <span className="absolute inset-y-0 right-2 flex items-center font-mono text-[10px] font-semibold text-foreground md:text-xs">
        {label}
      </span>
    </div>
  );
}
