'use client';

import { Logo, Wordmark } from '@/components/brand/Logo';

// Watermark system. Every slide gets one of these styles. The pattern
// cycles by slide index in PrintDeck (so adjacent slides feel
// different) plus content-aware overrides.
//
// Each style declares:
//   • the glyph used (mark / wordmark / diamond-cluster)
//   • position (corner or center)
//   • size in mm
//   • rotation in degrees
//   • opacity
const WATERMARK_PRESETS = {
  // Brand mark in a corner — most common content slide treatment
  'mark-br': { glyph: 'mark', corner: 'br', size: 180, rot: 0,   opacity: 0.05 },
  'mark-bl': { glyph: 'mark', corner: 'bl', size: 150, rot: -8,  opacity: 0.045 },
  'mark-tr': { glyph: 'mark', corner: 'tr', size: 120, rot: 12,  opacity: 0.04 },
  'mark-tl': { glyph: 'mark', corner: 'tl', size: 140, rot: -6,  opacity: 0.045 },

  // Big wordmark stretching diagonally — for slides with lots of room
  'word-diag': { glyph: 'word', corner: 'br', size: 280, rot: -8, opacity: 0.04 },

  // Diamond cluster — geometric pattern for data slides
  'diamonds': { glyph: 'diamonds', corner: 'br', size: 120, rot: 0, opacity: 0.08 },

  // No watermark (for slides with strong visual identity of their own)
  'none': null,
};

// Compute the inline style for the chosen watermark position. Corners
// half-bleed off the slide edge for the luxury "logo-bleed" effect.
function watermarkPosition(corner, size) {
  const offset = -size / 5;
  const positions = {
    br: { right:  `${offset}mm`, bottom: `${offset}mm` },
    bl: { left:   `${offset}mm`, bottom: `${offset}mm` },
    tr: { right:  `${offset}mm`, top:    `${offset}mm` },
    tl: { left:   `${offset}mm`, top:    `${offset}mm` },
  };
  return positions[corner] ?? positions.br;
}

function Watermark({ preset }) {
  if (!preset || !WATERMARK_PRESETS[preset]) return null;
  const { glyph, corner, size, rot, opacity } = WATERMARK_PRESETS[preset];
  const pos = watermarkPosition(corner, size);

  let content;
  if (glyph === 'mark') {
    content = <Logo size={size * 3.7} variant="mono" />;
  } else if (glyph === 'word') {
    content = (
      <div style={{ fontFamily: 'var(--font-display)', fontSize: `${size * 0.42}px`, fontWeight: 800, color: '#E5E5E5', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
        tagrides
      </div>
    );
  } else if (glyph === 'diamonds') {
    // 3×3 grid of diamonds, sized so the cluster spans `size` mm
    const span = size;
    const dx = span / 3.2;
    content = (
      <svg width={`${span}mm`} height={`${span}mm`} viewBox="0 0 100 100">
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
              fill="#008080"
              transform={`rotate(45 ${25 + col * 30} ${25 + row * 30})`}
            />
          );
        })}
      </svg>
    );
  }

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        ...pos,
        opacity,
        transform: `rotate(${rot}deg)`,
        pointerEvents: 'none',
        zIndex: 0,
        lineHeight: 0,
      }}
    >
      {content}
    </div>
  );
}

// Slide — A4 landscape primitive (297×210mm). Fixed size, designed
// from the start for paper. Layered backdrop gives every slide texture:
//   1. Base dark surface
//   2. Subtle radial gradients (top-left teal, bottom-right amber)
//   3. A per-slide watermark (mark / wordmark / diamonds) positioned by
//      the WATERMARK_PRESETS table — varied corner, size, rotation, and
//      opacity per slide so the deck reads as a designed system, not a
//      stamp repeated 16 times.
//   4. Subtle dot-grid pattern for paper texture.
//
// Body uses flex column with justify-content: space-between by default,
// so content naturally fills the slide vertically rather than clustering
// at the top with a void below.
export function Slide({
  page,
  total,
  section,
  audience,
  bodyAlign = 'space-between',
  watermark = 'mark-br',
  children,
}) {
  return (
    <article
      className="pitch-print-slide relative flex flex-col overflow-hidden"
      style={{
        width: '297mm',
        height: '210mm',
        backgroundColor: '#0A0A0A',
        color: '#E5E5E5',
        fontFamily: 'var(--font-body)',
        backgroundImage: [
          // Top-left teal glow
          'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(0,128,128,0.15), transparent 50%)',
          // Bottom-right amber wash (subtle)
          'radial-gradient(ellipse 70% 50% at 100% 100%, rgba(245,158,11,0.06), transparent 60%)',
          // Mid radial deepening (gives depth)
          'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0,128,128,0.04), transparent 70%)',
        ].join(', '),
      }}
    >
      {/* Per-slide watermark (varied by preset) */}
      <Watermark preset={watermark} />

      {/* Subtle dot-grid texture — pure decoration */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '6mm 6mm',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Top strip */}
      <header
        className="relative flex items-center justify-between"
        style={{
          padding: '10mm 14mm 0 14mm',
          fontFamily: 'var(--font-mono)',
          fontSize: '7.5pt',
          letterSpacing: '0.18em',
          color: '#888',
          textTransform: 'uppercase',
          zIndex: 1,
        }}
      >
        <div className="flex items-center gap-3">
          <Logo size={22} variant="color" />
          <span style={{ fontWeight: 600 }}>TagRides</span>
          {section && (
            <>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{section}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          {audience && <span>{audience}</span>}
          {page != null && total != null && (
            <>
              <span style={{ opacity: 0.4 }}>·</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                {String(page).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </>
          )}
        </div>
      </header>

      {/* Body — fills the slide minus header + footer.
          Principle: every visual element needs a deliberate safe area
          from the slide edges. Bottom padding 12mm keeps content from
          kissing the footer; top padding 8mm separates from the header. */}
      <div
        className="relative flex flex-1 flex-col"
        style={{
          padding: '8mm 16mm 12mm 16mm',
          justifyContent: bodyAlign,
          zIndex: 1,
          minHeight: 0,
        }}
      >
        {children}
      </div>

      {/* Bottom strip */}
      <footer
        className="relative flex items-center justify-between"
        style={{
          padding: '0 14mm 8mm 14mm',
          fontFamily: 'var(--font-mono)',
          fontSize: '7.5pt',
          color: '#666',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          zIndex: 1,
        }}
      >
        <span>tagrider.com</span>
        <span style={{ opacity: 0.5 }}>© TAG-ALONG LTD · 2026</span>
      </footer>

      {/* Corner ornament */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: '14mm',
          right: '14mm',
          width: '2.5mm',
          height: '2.5mm',
          transform: 'rotate(45deg)',
          backgroundColor: '#008080',
          opacity: 0.6,
          zIndex: 2,
        }}
      />
    </article>
  );
}

// SlideHeading — large eyebrow + title + optional subtitle, used at
// the top of nearly every content slide. Print typography.
export function SlideHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const tx = align === 'center' ? { textAlign: 'center' } : null;
  return (
    <div style={{ marginBottom: '6mm', flexShrink: 0, ...tx }}>
      {eyebrow && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '8.5pt',
            letterSpacing: '0.22em',
            color: '#008080',
            textTransform: 'uppercase',
            marginBottom: '3mm',
          }}
        >
          {eyebrow}
        </div>
      )}
      {title && (
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28pt',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            margin: 0,
            color: 'inherit',
          }}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          style={{
            fontSize: '11pt',
            lineHeight: 1.45,
            color: '#B3B3B3',
            margin: '4mm 0 0 0',
            maxWidth: '210mm',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
