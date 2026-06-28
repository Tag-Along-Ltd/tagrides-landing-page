'use client';

import { motion } from 'motion/react';
import { Logo } from '@/components/brand/Logo';
import { cn } from '@/lib/utils';

// Watermark presets — mirror the print deck so the web and PDF feel
// like one designed system. Each preset declares the glyph, corner,
// size (in viewport-relative px), rotation, and opacity. Web sections
// are much larger than print slides so the glyphs are bigger.
const WATERMARK_PRESETS = {
  'mark-br': { glyph: 'mark', corner: 'br', size: 800, rot: 0,   opacity: 0.045 },
  'mark-bl': { glyph: 'mark', corner: 'bl', size: 680, rot: -8,  opacity: 0.04 },
  'mark-tr': { glyph: 'mark', corner: 'tr', size: 560, rot: 12,  opacity: 0.035 },
  'mark-tl': { glyph: 'mark', corner: 'tl', size: 640, rot: -6,  opacity: 0.04 },
  'word-diag': { glyph: 'word', corner: 'br', size: 1100, rot: -8, opacity: 0.035 },
  'diamonds':  { glyph: 'diamonds', corner: 'br', size: 480, rot: 0, opacity: 0.07 },
  'none': null,
};

// Compute corner positioning. Corners half-bleed off the section edge.
function cornerPosition(corner, size) {
  const off = -size / 6;
  return {
    br: { right:  `${off}px`, bottom: `${off}px` },
    bl: { left:   `${off}px`, bottom: `${off}px` },
    tr: { right:  `${off}px`, top:    `${off}px` },
    tl: { left:   `${off}px`, top:    `${off}px` },
  }[corner] ?? { right: `${off}px`, bottom: `${off}px` };
}

function Watermark({ preset, isPrimary }) {
  if (!preset || !WATERMARK_PRESETS[preset]) return null;
  const { glyph, corner, size, rot, opacity } = WATERMARK_PRESETS[preset];
  const pos = cornerPosition(corner, size);

  let content;
  if (glyph === 'mark') {
    content = <Logo size={size} variant={isPrimary ? 'reverse' : 'mono'} />;
  } else if (glyph === 'word') {
    content = (
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: `${size * 0.42}px`,
          fontWeight: 800,
          color: isPrimary ? '#FFFFFF' : '#E5E5E5',
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        tagrides
      </div>
    );
  } else if (glyph === 'diamonds') {
    content = (
      <svg width={size} height={size} viewBox="0 0 100 100">
        {Array.from({ length: 9 }).map((_, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <rect
              key={i}
              x={20 + col * 30}
              y={20 + row * 30}
              width="10"
              height="10"
              fill={isPrimary ? '#FFFFFF' : '#008080'}
              transform={`rotate(45 ${25 + col * 30} ${25 + row * 30})`}
            />
          );
        })}
      </svg>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute hidden md:block"
      style={{
        ...pos,
        opacity,
        transform: `rotate(${rot}deg)`,
        zIndex: 0,
        lineHeight: 0,
      }}
    >
      {content}
    </div>
  );
}

// Pitch section primitive. Every deck slide uses this so spacing,
// minimum-height, and viewport rhythm stay locked across sections.
// `min-h-[100svh]` uses small-viewport-height to dodge iOS Safari's
// dynamic toolbar 100vh bug.
//
// Each section carries a layered backdrop:
//   1. base tone (background / surface / elevated / primary)
//   2. radial-gradient overlay (teal top-left, amber bottom-right)
//   3. a per-section watermark glyph (mark / wordmark / diamonds)
//      varied by `watermark` prop. The PrintDeck establishes a parallel
//      pattern in /pitch/print so web + PDF feel like one system.
export function PitchSection({
  id,
  tone = 'background',
  watermark = 'mark-br',
  children,
  className,
}) {
  const toneClass = {
    background: 'bg-background',
    surface:    'bg-surface',
    elevated:   'bg-elevated',
    primary:    'bg-primary text-primary-foreground',
  }[tone] ?? 'bg-background';

  const isPrimary = tone === 'primary';
  const gradientStyle = isPrimary
    ? {
        backgroundImage: [
          'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(245,158,11,0.10), transparent 55%)',
          'radial-gradient(ellipse 70% 50% at 100% 100%, rgba(255,255,255,0.06), transparent 60%)',
        ].join(', '),
      }
    : {
        backgroundImage: [
          'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(0,128,128,0.10), transparent 50%)',
          'radial-gradient(ellipse 70% 50% at 100% 100%, rgba(245,158,11,0.04), transparent 60%)',
        ].join(', '),
      };

  return (
    <section
      id={id}
      className={cn(
        'relative isolate flex min-h-[100svh] w-full snap-start items-center overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20',
        toneClass,
        className,
      )}
      style={gradientStyle}
    >
      {/* Per-section watermark — varied by preset so the deck reads
          as a designed system, not a stamp repeated everywhere. */}
      <Watermark preset={watermark} isPrimary={isPrimary} />

      {/* Corner ornaments — tiny diamond glyphs echoing the deck's
          visual vocabulary. */}
      <span
        aria-hidden="true"
        className="absolute top-8 left-8 size-2 rotate-45 bg-primary/70 md:top-12 md:left-12"
        style={{ zIndex: 1 }}
      />
      <span
        aria-hidden="true"
        className="absolute right-8 bottom-8 size-2 rotate-45 bg-primary/40 md:right-12 md:bottom-12"
        style={{ zIndex: 1 }}
      />
      <div className="relative mx-auto w-full max-w-7xl" style={{ zIndex: 2 }}>{children}</div>
    </section>
  );
}

// Eyebrow + headline + subhead block. Used in nearly every section so
// type rhythm stays consistent. Lock-step animation on viewport entry.
export function SectionHeading({ eyebrow, title, subtitle, className, align = 'left' }) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      className={cn('max-w-4xl', alignClass, className)}
    >
      {eyebrow && (
        <div className="font-mono text-xs tracking-[0.24em] text-primary md:text-sm">{eyebrow}</div>
      )}
      <h2 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 text-lg leading-relaxed text-foreground-muted md:text-xl">{subtitle}</p>
      )}
    </motion.header>
  );
}
