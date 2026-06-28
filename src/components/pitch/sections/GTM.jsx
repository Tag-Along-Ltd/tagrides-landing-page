'use client';

import { motion } from 'motion/react';
import { Megaphone, Users, Globe2, Handshake } from 'lucide-react';

import { PitchSection, SectionHeading } from '../motion/Section';
import pitch from '@/data/pitch.json';

const ICONS = { wedge: Megaphone, supply: Handshake, demand: Users, expansion: Globe2 };

// GTM — four phased lanes (Wedge → Supply → Demand → Expansion) that
// map to the operator's actual sequence: own the Yaba ↔ Lagos Island
// corridor first, build driver supply, ignite demand, then expand.
// ALX rubric item #5 — covered here.
export function GTM() {
  const data = pitch.gtm;
  return (
    <PitchSection id="gtm" tone="background">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
        {data.lanes.map((lane, i) => {
          const Icon = ICONS[lane.icon] ?? Megaphone;
          return (
            <motion.div
              key={lane.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-elevated/70 p-6 ring-1 ring-border/40 md:p-8"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="size-6" />
                </div>
                <div className="font-mono text-xs tracking-[0.2em] text-foreground-muted/60">
                  PHASE 0{i + 1}
                </div>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-foreground md:text-2xl">
                {lane.title}
              </h3>
              <div className="mt-1 font-mono text-xs text-primary md:text-sm">{lane.timeframe}</div>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted md:text-base">
                {lane.detail}
              </p>
              <ul className="mt-4 space-y-2">
                {lane.tactics.map((t, ti) => (
                  <li key={ti} className="flex gap-2.5 text-xs text-foreground-muted md:text-sm">
                    <span aria-hidden className="mt-1.5 size-1 shrink-0 rotate-45 bg-accent" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Partners rail */}
      {data.partners?.length > 0 && (
        <div className="mt-16 md:mt-24">
          <div className="mb-6 font-mono text-xs tracking-[0.24em] text-accent md:text-sm">
            PARTNERSHIP TARGETS
          </div>
          <div className="flex flex-wrap gap-3 md:gap-4">
            {data.partners.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-full bg-surface/60 px-4 py-2.5 font-display text-sm font-semibold text-foreground ring-1 ring-border/30 md:text-base"
              >
                {p}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </PitchSection>
  );
}
