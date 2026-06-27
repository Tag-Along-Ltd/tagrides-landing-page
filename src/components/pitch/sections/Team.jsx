'use client';

import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../motion/Section';
import pitch from '@/data/pitch.json';

// Team — founders + advisers. Diamond-cropped avatars to echo the
// deck's visual language. Each card has name, role, and a one-line
// credibility tag. Advisers visually de-emphasized.
export function Team() {
  const data = pitch.team;
  return (
    <PitchSection id="team" tone="surface">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {data.members.map((m, i) => {
          const isAdviser = m.role.toLowerCase().includes('adviser');
          return (
            <motion.figure
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={isAdviser
                ? 'rounded-2xl bg-background/40 p-6 ring-1 ring-border/20 md:p-8'
                : 'rounded-2xl bg-elevated/70 p-6 ring-1 ring-border/40 md:p-8'}
            >
              <div className="mx-auto size-28 md:size-32">
                <div className="relative size-full rotate-45 overflow-hidden rounded-2xl ring-2 ring-border/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.image}
                    alt={m.name}
                    className="size-full -rotate-45 scale-150 object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className={isAdviser
                    ? 'absolute inset-0 -z-10 -rotate-45 scale-150 bg-gradient-to-br from-accent/30 to-accent/10'
                    : 'absolute inset-0 -z-10 -rotate-45 scale-150 bg-gradient-to-br from-primary/40 to-primary/10'}
                  />
                </div>
              </div>
              <figcaption className="mt-6 text-center">
                <div className="font-display text-base font-bold text-foreground md:text-lg">
                  {m.name}
                </div>
                <div className={isAdviser
                  ? 'mt-1 font-mono text-xs tracking-wide text-accent md:text-sm'
                  : 'mt-1 font-mono text-xs tracking-wide text-primary md:text-sm'}
                >
                  {m.role}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-foreground-muted md:text-sm">
                  {m.bio}
                </p>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
    </PitchSection>
  );
}
