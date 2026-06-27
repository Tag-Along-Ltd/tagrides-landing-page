'use client';

import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../motion/Section';
import pitch from '@/data/pitch.json';

// Milestones — vertical timeline alternating left/right on desktop,
// fully vertical on mobile. Past steps render solid, "now" pulses
// teal, future steps are outlined-only.
export function Milestones() {
  const data = pitch.milestones;
  return (
    <PitchSection id="milestones" tone="elevated">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} />

      <div className="relative mt-16 md:mt-20">
        {/* Vertical spine */}
        <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-border/40 md:left-1/2 md:-translate-x-1/2" />

        <ul className="space-y-8 md:space-y-12">
          {data.items.map((item, i) => (
            <MilestoneRow key={item.when} item={item} index={i} />
          ))}
        </ul>
      </div>
    </PitchSection>
  );
}

function MilestoneRow({ item, index }) {
  const isLeft = index % 2 === 0;
  const statusStyles = {
    done:   'bg-primary border-primary',
    now:    'bg-accent border-accent shadow-[0_0_0_6px_rgba(245,158,11,0.18)]',
    next:   'bg-background border-primary/60',
    future: 'bg-background border-border/40',
  }[item.status] ?? 'bg-background border-border/40';

  return (
    <motion.li
      initial={{ opacity: 0, x: isLeft ? -16 : 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="relative grid md:grid-cols-2 md:gap-8"
    >
      {/* Marker */}
      <div className="absolute left-4 z-10 -translate-x-1/2 md:left-1/2">
        <div className={`size-3 rounded-full border-2 ${statusStyles}`} />
      </div>

      {/* Card */}
      <div
        className={isLeft
          ? 'ml-10 md:col-start-1 md:mr-8 md:ml-0 md:text-right'
          : 'ml-10 md:col-start-2 md:ml-8'}
      >
        <div className="font-mono text-xs tracking-wider text-foreground-muted md:text-sm">
          {item.when}
        </div>
        <div className="mt-1 font-display text-lg font-bold text-foreground md:text-xl">
          {item.label}
        </div>
      </div>
    </motion.li>
  );
}
