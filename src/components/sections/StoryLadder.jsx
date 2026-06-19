'use client';

import { motion } from 'motion/react';
import { Shield, Star, FileText, Share2, Siren } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

// 7 chapters climbing the argument. Each is a rung; the section is the ladder.
const CHAPTERS = [
  {
    eyebrow: 'The math',
    title: 'Most Lagosians can’t afford a daily ride-hail.',
    body:
      'Only 5% of Nigerians earn more than ₦500,000 a month. Even at that pay grade, a daily commute on Uber or Bolt eats roughly ₦240,000 — close to half the take-home, before anything else. For everyone else, dedicated ride-hail is a special-occasion product.',
    visual: { kind: 'stat', value: '5%', label: 'of Nigerians earn over ₦500k/month', sub: '— and even there, daily ride-hail consumes ~₦240k.' },
  },
  {
    eyebrow: 'The default',
    title: 'So we ride Danfo. And we hope.',
    body:
      '70% of the riders we surveyed use Danfo or other shared public transport every day. It’s affordable. It’s efficient. But there’s no booking, no driver record, no fare receipt, no one to call when something goes wrong. “One chance” exists as a word because the system left a gap.',
    visual: { kind: 'video-stat', value: '70%', label: 'ride Danfo or public transit daily', sub: 'Where affordability lives — and accountability doesn’t.' },
  },
  {
    eyebrow: 'The culture',
    title: 'Lagos was already sharing rides.',
    body:
      'Communal travel isn’t something we’re inventing — it’s already how the city moves. From danfo to keke to the friend-of-a-friend driving past your junction, the instinct is there. What’s missing is the structure around it.',
    visual: { kind: 'quote', text: 'Sharing the route is the social default. Safe sharing is the missing infrastructure.', author: 'Tag Rides design principle' },
  },
  {
    eyebrow: 'The signal',
    title: '91% told us exactly what they want.',
    body:
      'Across 210 Lagos rider responses, price was the most-cited factor in choosing a transport service — by a wide margin. Convenience and safety followed. The demand is explicit, and it has been waiting for an option that respects both.',
    visual: { kind: 'stat', value: '91%', label: 'name price as their top deciding factor', sub: '· 73% convenience · 70% safety' },
  },
  {
    eyebrow: 'The mechanism',
    title: 'The fare defaults to public transport. Then it can go lower.',
    body:
      'When a rider opens TagRides, the draft offer starts at the current public-transport fare for that route. The rider can edit and send. The driver can accept, counter, or — here is the principle — go lower. A driver heading that direction anyway has near-zero marginal cost on the empty seat. We call this marginal-zero economics: any positive fare is profit on a seat that would otherwise be empty.',
    visual: { kind: 'compare', rows: [
      { label: 'Danfo',                  value: '₦300–500',     tone: 'muted' },
      { label: 'TagRides Tag-Along',     value: '₦250–500',     tone: 'primary' },
      { label: 'Uber / Bolt',            value: '₦1,800–3,500', tone: 'danger' },
    ]},
  },
  {
    eyebrow: 'The unlock',
    title: 'Elastic matching: partial overlap is the feature.',
    body:
      'You don’t need to share the whole trip — just any leg of it. A driver on a 14km commute can sell three legs to three riders heading three different middles of that route. Driver utilization goes up. Cost per kilometer goes down. This is the design, not a side-effect.',
    visual: { kind: 'diagram' },
  },
  {
    eyebrow: 'The promise',
    title: 'Verified. Logged. Traceable. Shared.',
    body:
      'ID-checked drivers. Two-way ratings. Every fare written down before pickup. Live trip-share with one tap. In-app incident reporting at drop-off. The familiar feeling of climbing into someone’s car — now with the system that makes it safe to do at scale. One-chance has no place on a platform that knows everyone in the car.',
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

// Stat tile with a dark-blended driving clip behind it. Used on the "default" rung
// (Lagos rides danfo daily) — gives the stat the weight of real footage without
// stealing focus. Don't reuse elsewhere; principled use only.
function VideoStatVisual({ value, label, sub }) {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-elevated p-8 md:p-10">
      <video
        src="https://videos.pexels.com/video-files/2103099/2103099-uhd_2560_1440_30fps.mp4"
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        className="absolute inset-0 -z-10 size-full object-cover opacity-[0.22]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.75) 60%, rgba(10,10,10,0.95) 100%)',
        }}
        aria-hidden="true"
      />
      <p className="relative font-mono text-7xl font-semibold tracking-tighter text-foreground md:text-8xl">
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

function CompareVisual({ rows }) {
  return (
    <div className="rounded-3xl border border-border bg-elevated p-6 md:p-8">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted">
        Lagos commute · Yaba → V.I. · cash fare
      </p>
      <div className="space-y-3">
        {rows.map((r) => {
          const isPrimary = r.tone === 'primary';
          const isDanger = r.tone === 'danger';
          return (
            <div
              key={r.label}
              className={cn(
                'flex items-center justify-between rounded-xl border px-4 py-3 transition',
                isPrimary && 'border-primary/60 bg-primary/10',
                isDanger && 'border-danger/40 bg-danger/5',
                !isPrimary && !isDanger && 'border-border bg-background/40',
              )}
            >
              <span
                className={cn(
                  'text-sm font-semibold',
                  isPrimary ? 'text-primary' : isDanger ? 'text-danger' : 'text-foreground',
                )}
              >
                {r.label}
                {isPrimary && (
                  <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
                    Us
                  </span>
                )}
              </span>
              <span className="font-mono text-sm font-medium text-foreground">{r.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DiagramVisual() {
  return (
    <div className="rounded-3xl border border-border bg-elevated p-6 md:p-8">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted">
        One driver · three riders · partial overlap
      </p>
      <svg viewBox="0 0 600 220" className="w-full">
        <defs>
          <linearGradient id="elastic-route" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#008080" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#008080" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <motion.path
          id="elasticRoutePath"
          d="M 20 110 Q 150 60, 300 110 T 580 110"
          stroke="url(#elastic-route)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
        {/* Driver start + end */}
        <circle cx="20" cy="110" r="10" fill="#008080" />
        <text x="20" y="145" textAnchor="middle" fontSize="11" fill="#B3B3B3" fontFamily="ui-monospace">
          Driver
        </text>
        <circle cx="580" cy="110" r="10" fill="#F59E0B" />
        <text x="580" y="145" textAnchor="middle" fontSize="11" fill="#B3B3B3" fontFamily="ui-monospace">
          Dropoff
        </text>
        {/* Car traveling along the path — literal route-share visual */}
        <circle r="7" fill="#E5E5E5" stroke="#008080" strokeWidth="2.5">
          <animateMotion dur="6s" repeatCount="indefinite" rotate="auto" begin="1.6s">
            <mpath href="#elasticRoutePath" />
          </animateMotion>
        </circle>
        {/* 3 rider segments — each rider takes a different leg */}
        {[
          { tap: 100, off: 220, label: 'Rider A', y: 50 },
          { tap: 200, off: 380, label: 'Rider B', y: 30 },
          { tap: 320, off: 520, label: 'Rider C', y: 50 },
        ].map((r, i) => (
          <g key={r.label}>
            <motion.line
              x1={r.tap}
              x2={r.off}
              y1="110"
              y2="110"
              stroke={i === 1 ? '#F59E0B' : '#008080'}
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.85"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.85 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.25, ease: 'easeOut' }}
            />
            <circle cx={r.tap} cy="110" r="5" fill="#0a0a0a" stroke={i === 1 ? '#F59E0B' : '#008080'} strokeWidth="2" />
            <circle cx={r.off} cy="110" r="5" fill="#0a0a0a" stroke={i === 1 ? '#F59E0B' : '#008080'} strokeWidth="2" />
            <text x={(r.tap + r.off) / 2} y={170 + r.y * 0.1} textAnchor="middle" fontSize="11" fill="#E5E5E5" fontFamily="ui-monospace">
              {r.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
        Three riders share three middle legs of one driver&rsquo;s commute. The driver monetizes
        what would have been an empty seat for the entire trip.
      </p>
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
    case 'stat':       return <StatVisual {...visual} />;
    case 'video-stat': return <VideoStatVisual {...visual} />;
    case 'quote':      return <QuoteVisual {...visual} />;
    case 'compare':    return <CompareVisual rows={visual.rows} />;
    case 'diagram':    return <DiagramVisual />;
    case 'badges':     return <BadgesVisual items={visual.items} />;
    default:           return null;
  }
}

export function StoryLadder() {
  return (
    <section id="story" className="relative bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-28">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Why Tag Rides
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            The case for tagging along, in seven moves.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted md:text-lg">
            A short story about why daily mobility in Lagos is broken — and the specific design
            choices that make Tag Rides different from everything else you&rsquo;ve tried.
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
