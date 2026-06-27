'use client';

import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../motion/Section';
import pitch from '@/data/pitch.json';

// Solution — animated route line draws itself across the section, with
// three labeled stops representing the mechanic: 1. driver sets route,
// 2. riders request a leg, 3. fare agreed (not metered).
export function Solution() {
  const data = pitch.solution;
  return (
    <PitchSection id="solution" tone="elevated">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      <div className="mt-16 md:mt-24">
        <RouteDiagram steps={data.mechanics} />
      </div>
    </PitchSection>
  );
}

function RouteDiagram({ steps }) {
  return (
    <div className="relative">
      {/* Desktop: horizontal route line */}
      <svg
        className="hidden h-32 w-full md:block"
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M 40 60 Q 250 20 500 60 T 960 60"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 8"
          fill="none"
          className="text-primary"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {[40, 500, 960].map((x, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.6, type: 'spring' }}
          >
            <circle cx={x} cy={60} r={14} className="fill-primary" />
            <circle cx={x} cy={60} r={22} className="fill-primary opacity-20" />
          </motion.g>
        ))}
      </svg>

      {/* Mobile: vertical route line */}
      <svg
        className="absolute top-0 left-6 h-full w-0.5 md:hidden"
        viewBox="0 0 2 600"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.line
          x1="1" y1="0" x2="1" y2="600"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 6"
          className="text-primary"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      {/* Step cards */}
      <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.2 }}
            className="relative rounded-2xl bg-surface/70 p-6 ring-1 ring-border/30 md:p-8"
          >
            {/* Step number circle, positioned to overlap the route line on mobile */}
            <div className="absolute -top-4 left-6 flex size-8 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground ring-4 ring-elevated md:left-8 md:size-10 md:text-base">
              {step.step}
            </div>
            <h3 className="mt-6 font-display text-xl font-bold text-foreground md:mt-4 md:text-2xl">
              {step.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-foreground-muted md:text-lg">
              {step.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
