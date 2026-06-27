'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

import { PitchSection } from '../../motion/Section';
import pitch from '@/data/pitch.json';
import brand from '@/data/brand.json';

// AppCTA — customer close. Big call to action: install the app, or
// join the waitlist if not yet shipped to stores. Two-button layout
// so the path is unambiguous.
export function AppCTA() {
  const data = pitch.appCTA;
  return (
    <PitchSection id="app" tone="primary" className="text-primary-foreground">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.24em] text-primary-foreground/80 md:text-sm"
        >
          {data.eyebrow}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-5xl leading-[1.05] font-extrabold tracking-tight md:text-7xl"
        >
          {data.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-primary-foreground/85 md:text-xl"
        >
          {data.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href={brand.app.signin}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-background/15 px-6 py-3.5 font-semibold ring-1 ring-primary-foreground/30 backdrop-blur transition hover:bg-background/25 sm:w-auto"
          >
            Join the waitlist
            <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5" />
          </a>
          <a
            href={brand.app.signinDriver}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 font-semibold text-background transition hover:opacity-90 sm:w-auto"
          >
            Start driving
            <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 font-mono text-xs text-primary-foreground/60 md:text-sm"
        >
          Lagos · {brand.location.shortAddress}
        </motion.div>
      </div>
    </PitchSection>
  );
}
