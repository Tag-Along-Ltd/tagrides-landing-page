'use client';

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

import { Logo } from '@/components/brand/Logo';
import pitch from '@/data/pitch.json';

const HERO_VIDEO_POSTER = '/assets/video/lagos-traffic-hero-poster.jpg';
const HERO_VIDEO_MP4 = '/assets/video/lagos-traffic-hero.mp4';
const HERO_VIDEO_WEBM = '/assets/video/lagos-traffic-hero.webm';

// Cover slide — first impression. Uses the same optimized local encode as
// the homepage, not the original remote UHD source that made the deck heavy.
export function Cover() {
  const data = pitch.cover;

  return (
    <section
      id="cover"
      className="relative isolate flex min-h-[100svh] snap-start items-center overflow-hidden bg-background px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      {/* Local video backdrop — same compressed asset family as the homepage. */}
      <video
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        poster={HERO_VIDEO_POSTER}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-[0.18] [filter:saturate(0.72)_contrast(1.08)]"
      >
        <source src={HERO_VIDEO_MP4} type="video/mp4" />
        <source src={HERO_VIDEO_WEBM} type="video/webm" />
      </video>

      {/* Darkening + tint scrim so text reads cleanly over any video frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.7), rgba(10,10,10,0.5), rgba(10,10,10,0.85))',
        }}
      />

      {/* Ambient route-dot field — purely decorative */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50">
        <RouteDots />
      </div>

      {/* Radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,128,128,0.22), transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo size={120} variant="color" className="mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 font-mono text-xs tracking-[0.32em] text-foreground-muted md:text-sm"
        >
          {data.eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-display text-5xl leading-[1.02] font-extrabold tracking-tight text-foreground md:text-7xl lg:text-[7.5rem]"
        >
          {data.title.split('. ').map((part, i, arr) => (
            <span key={i} className={i === 0 ? '' : 'block text-primary'}>
              {part}
              {i < arr.length - 1 && '.'}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-foreground-muted md:text-xl"
        >
          {data.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 flex flex-col items-center gap-2 font-mono text-xs text-foreground-muted/80 md:text-sm"
        >
          <div className="font-sans text-sm font-semibold text-foreground md:text-base">
            {data.presenter}
          </div>
          <div>{data.version}</div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground-muted/60"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="size-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Background dot-field, layout-stable across screen sizes via percentage
// positioning. Static on purpose: the pitch page should feel polished without
// stacking animation work on top of the scroll-snap deck.
function RouteDots() {
  const dots = [
    { x: 8,  y: 18, d: 1.4 }, { x: 24, y: 32, d: 0.9 }, { x: 38, y: 12, d: 1.1 },
    { x: 52, y: 28, d: 1.6 }, { x: 68, y: 18, d: 1.0 }, { x: 82, y: 36, d: 1.3 },
    { x: 92, y: 60, d: 1.2 }, { x: 76, y: 72, d: 0.8 }, { x: 56, y: 80, d: 1.5 },
    { x: 36, y: 68, d: 1.1 }, { x: 14, y: 78, d: 1.4 }, { x: 4,  y: 52, d: 0.9 },
  ];
  return (
    <svg className="size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.d * 0.18}
          fill="currentColor"
          className="text-primary"
        />
      ))}
      {/* Diagonal route lines connecting dots — subtle */}
      <path
        d="M 8 18 Q 30 22 38 12 T 68 18 T 92 60"
        stroke="currentColor"
        strokeWidth="0.18"
        strokeDasharray="0.6 1.2"
        fill="none"
        className="text-primary opacity-40"
      />
      <path
        d="M 4 52 Q 22 64 36 68 T 76 72 T 92 60"
        stroke="currentColor"
        strokeWidth="0.18"
        strokeDasharray="0.6 1.2"
        fill="none"
        className="text-accent opacity-30"
      />
    </svg>
  );
}
