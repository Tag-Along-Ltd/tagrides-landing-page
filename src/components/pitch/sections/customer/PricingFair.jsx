'use client';

import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../../motion/Section';
import pitch from '@/data/pitch.json';

// PricingFair — customer-facing version of the cost-comparison slide.
// Picks 4 representative routes and shows the savings as a "you
// keep ₦X" hook. Less dense than the investor LagosCost slide.
export function PricingFair() {
  const data = pitch.pricingFair;
  return (
    <PitchSection id="pricing" tone="background">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-6">
        {data.examples.map((r, i) => {
          const savings = r.boltNaira - r.tagAlongNaira;
          const pctSaved = Math.round((savings / r.boltNaira) * 100);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="rounded-2xl bg-elevated/70 p-6 ring-1 ring-border/40 md:p-8"
            >
              <div className="flex items-baseline justify-between">
                <div className="font-mono text-xs text-foreground-muted md:text-sm">
                  {r.from} <span className="text-foreground-muted/60">→</span> {r.to}
                </div>
                <div className="rounded-full bg-success/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-success md:text-xs">
                  −{pctSaved}%
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.18em] text-foreground-muted md:text-xs">
                    BOLT ECONOMY
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold text-foreground-muted line-through md:text-3xl">
                    ₦{r.boltNaira.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.18em] text-primary md:text-xs">
                    TAGRIDES
                  </div>
                  <div className="mt-1 font-display text-2xl font-extrabold text-primary md:text-3xl">
                    ₦{r.tagAlongNaira.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-border/30 pt-4">
                <div className="text-sm text-foreground-muted md:text-base">You keep</div>
                <div className="font-display text-3xl font-extrabold text-accent tabular-nums md:text-4xl">
                  ₦{savings.toLocaleString()}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </PitchSection>
  );
}
