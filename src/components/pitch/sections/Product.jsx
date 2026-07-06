'use client';

import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../motion/Section';
import pitch from '@/data/pitch.json';
import { resolvePitchProductScreen } from '@/data/pitchProductScreens';

// Product — four core flows shown as device-framed mockups. Each tile
// has a diamond-clipped photo that lifts on hover; sequence fades in
// on scroll. We use placeholder gradients while screenshot assets are
// being prepared; real PNGs swap in via the data file when ready.
export function Product() {
  const data = pitch.product;
  return (
    <PitchSection id="product" tone="background" watermark="mark-tr">
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
                src={resolvePitchProductScreen(flow)}
                alt={flow.title}
                className="size-full rounded-[1.35rem] object-cover"
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
    <div className="relative mx-auto aspect-[9/19] w-full max-w-[200px] rounded-[2.35rem] bg-black p-2.5 shadow-[0_26px_80px_-46px_rgba(0,128,128,0.8)] ring-1 ring-white/10 transition group-hover:-translate-y-1 group-hover:ring-primary/40">
      {/* Content / fallback gradient lives inside the glass, not under the bezel. */}
      <div className="relative size-full overflow-hidden rounded-[1.55rem] bg-background ring-1 ring-white/10">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`} />
        <div className="relative z-0 size-full p-1">{children}</div>
      </div>
      {/* Device highlight + speaker notch sit on the shell, not on the screenshot. */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.35rem] ring-1 ring-inset ring-white/12" />
      <div className="absolute left-1/2 top-2.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/14" />
    </div>
  );
}
