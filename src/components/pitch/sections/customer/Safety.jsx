'use client';

import { motion } from 'motion/react';
import { ShieldCheck, BadgeCheck, MapPin, AlarmClock, Star, FileText } from 'lucide-react';

import { PitchSection, SectionHeading } from '../../motion/Section';
import pitch from '@/data/pitch.json';

const ICONS = {
  shield: ShieldCheck,
  badge: BadgeCheck,
  pin: MapPin,
  sos: AlarmClock,
  star: Star,
  log: FileText,
};

// Safety — six trust signals in a 3×2 grid. Customer-facing: "we
// thought about this so you don't have to".
export function SafetyCustomer() {
  const data = pitch.safety;
  return (
    <PitchSection id="safety" tone="surface">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {data.signals.map((s, i) => {
          const Icon = ICONS[s.icon] ?? ShieldCheck;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-2xl bg-elevated/70 p-6 ring-1 ring-border/40 transition hover:ring-primary/40 md:p-7"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground md:text-xl">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted md:text-base">
                {s.detail}
              </p>
            </motion.div>
          );
        })}
      </div>
    </PitchSection>
  );
}
