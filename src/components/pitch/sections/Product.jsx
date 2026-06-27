'use client';

import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../motion/Section';
import pitch from '@/data/pitch.json';

// Product — four core flows shown as device-framed mockups. Each tile
// has a diamond-clipped photo that lifts on hover; sequence fades in
// on scroll. We use placeholder gradients while screenshot assets are
// being prepared; real PNGs swap in via the data file when ready.
export function Product() {
  const data = pitch.product;
  return (
    <PitchSection id="product" tone="background">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      <div className="mt-16 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-4 md:gap-6">
        {data.flows.map((flow, i) => (
          <motion.figure
            key={flow.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group"
          >
            <PhoneFrame index={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flow.image}
                alt={flow.title}
                className="size-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </PhoneFrame>
            <figcaption className="mt-4 text-center font-mono text-xs tracking-wide text-foreground-muted md:text-sm">
              <span className="text-primary">0{i + 1}</span> · {flow.title}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </PitchSection>
  );
}

// Phone frame — minimalist device outline with a gradient fallback so
// the page reads correctly even before screenshot PNGs land.
function PhoneFrame({ index, children }) {
  // Each tile gets a slightly different fallback gradient so the four
  // empty frames feel intentional, not broken.
  const gradients = [
    'from-primary/60 via-background to-primary/20',
    'from-accent/50 via-background to-accent/15',
    'from-primary/40 via-background to-accent/25',
    'from-accent/30 via-background to-primary/40',
  ];
  return (
    <div className="relative mx-auto aspect-[9/19] w-full max-w-[200px] overflow-hidden rounded-[2rem] bg-elevated ring-1 ring-border/40 transition group-hover:ring-primary/40 group-hover:-translate-y-1">
      {/* Status-bar notch */}
      <div className="absolute top-3 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-background/80" />
      {/* Content / fallback gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`} />
      <div className="relative z-0 size-full">{children}</div>
      {/* Frame highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-foreground/10" />
    </div>
  );
}
