'use client';

import { motion } from 'motion/react';
import { Shield, Star, FileText, Share2, Siren } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

// Three proof blocks: affordability, existing behavior, and the trust layer.
const CHAPTERS = [
  {
    eyebrow: 'The math',
    title: 'Most people can’t afford daily ride-hail.',
    body:
      'For most of the world, Uber-style ride-hail is too expensive for daily transport. In Nigeria, only 5% earn more than ₦500,000 a month; even there, a daily Uber or Bolt commute can eat close to half the take-home. Dedicated ride-hail is a special-occasion product for most commuters.',
    visual: { kind: 'stat', value: '5%', label: 'of Nigerians earn over ₦500k/month', sub: '— and even there, daily ride-hail consumes ~₦240k.' },
  },
  {
    eyebrow: 'The culture',
    title: 'Cities were already sharing rides.',
    body:
      'Communal travel isn’t something we’re inventing — it’s already how dense cities move. Lagos has danfo, keke, kabu-kabu, and the friend-of-a-friend driving past your junction. Other cities have their own versions. The instinct is there. What’s missing is the structure around it.',
    visual: { kind: 'quote', text: 'Sharing the route is the social default. Accountability is the missing infrastructure.', author: 'TagRides design principle' },
  },
  {
    eyebrow: 'The promise',
    title: 'TagRides adds the missing trust layer.',
    body:
      'Verified profiles. Two-way ratings. Every fare written down before pickup. Live trip-share with one tap. Incident reporting tied to the trip record. The familiar act of sharing a route now has the accountability layer that lets it scale.',
    visual: { kind: 'badges', items: [
      { Icon: Shield,   label: 'ID-verified driver' },
      { Icon: Star,     label: 'Two-way rated' },
      { Icon: FileText, label: 'Fare logged' },
      { Icon: Share2,   label: 'Trip-shared' },
      { Icon: Siren,    label: 'Incident report' },
    ]},
  },
];

function StatVisual({ value, label, sub }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-elevated p-8 md:p-10">
      <div className="absolute -right-8 -top-8 size-40 rounded-full bg-primary/12 blur-3xl" />
      <p className="relative font-mono text-7xl font-semibold tracking-tighter text-primary md:text-8xl">
        {value}
      </p>
      <p className="relative mt-3 text-sm font-medium text-foreground">{label}</p>
      {sub && <p className="relative mt-1 text-xs leading-relaxed text-foreground-muted">{sub}</p>}
    </div>
  );
}

function QuoteVisual({ text, author }) {
  return (
    <div className="relative rounded-3xl border border-border bg-elevated p-8 md:p-10">
      <span className="absolute -left-2 -top-6 font-display text-8xl leading-none text-primary/30" aria-hidden="true">
        “
      </span>
      <p className="font-display text-xl leading-snug tracking-tight text-foreground md:text-2xl">
        {text}
      </p>
      <p className="mt-6 text-xs uppercase tracking-[0.18em] text-foreground-muted">— {author}</p>
    </div>
  );
}

function BadgesVisual({ items }) {
  return (
    <div className="rounded-3xl border border-border bg-elevated p-6 md:p-8">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted">
        Built into every trip
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map(({ Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-3"
          >
            <div className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
              <Icon className="size-4" />
            </div>
            <span className="text-sm font-medium text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Visual({ visual }) {
  switch (visual.kind) {
    case 'stat':   return <StatVisual {...visual} />;
    case 'quote':  return <QuoteVisual {...visual} />;
    case 'badges': return <BadgesVisual items={visual.items} />;
    default:       return null;
  }
}

export function StoryLadder() {
  return (
    <section id="story" className="relative bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-28">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Why TagRides
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            The case for tagging along, in three moves.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted md:text-lg">
            Three reasons the model works: daily ride-hail is too expensive, shared routes already
            exist, and the missing layer is trust.
          </p>
        </Reveal>

        {/* The ladder */}
        <div className="relative mt-16">
          {/* Center spine — desktop only */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block"
            aria-hidden="true"
          />

          <ol className="space-y-16 md:space-y-24">
            {CHAPTERS.map((chapter, i) => {
              const isVisualLeft = i % 2 === 1;
              return (
                <li key={chapter.eyebrow} className="relative">
                  {/* Numbered spine node (desktop) */}
                  <div
                    className="pointer-events-none absolute left-1/2 top-2 z-10 hidden -translate-x-1/2 md:block"
                    aria-hidden="true"
                  >
                    <div className="flex size-12 items-center justify-center rounded-full border border-primary/40 bg-background font-mono text-xs font-semibold tracking-[0.1em] text-primary shadow-[0_0_0_8px_rgba(10,10,10,1)]">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <div className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
                    {/* TEXT */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        'relative pl-14 md:pl-0',
                        isVisualLeft ? 'md:order-2 md:pl-12 md:text-left' : 'md:pr-12 md:text-right',
                      )}
                    >
                      {/* Mobile-only numbered tag */}
                      <span className="absolute left-0 top-1 inline-flex size-10 items-center justify-center rounded-full border border-primary/40 bg-background font-mono text-xs font-semibold tracking-[0.1em] text-primary md:hidden">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                        {chapter.eyebrow}
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
                        {chapter.title}
                      </h3>
                      <p className="mt-5 text-base leading-relaxed text-foreground-muted">
                        {chapter.body}
                      </p>
                    </motion.div>

                    {/* VISUAL */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(isVisualLeft ? 'md:order-1' : 'md:order-2')}
                    >
                      <Visual visual={chapter.visual} />
                    </motion.div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
