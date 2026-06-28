'use client';

import { Logo } from '@/components/brand/Logo';

// Slide — A4 landscape primitive. Fixed-size box (297×210mm) with a
// minimal top strip (brand + section + audience) and a bottom strip
// (URL + page number). On screen the slide is shown at scaled-down
// size for preview; in print the @page rule + page-break-after makes
// each slide its own paper.
//
// Slides are *designed*, not retrofitted from web sections. Each one
// holds one idea, one supporting visual, generous whitespace. Typography
// is print-tier (24-36pt headlines, 10-12pt body) not web (text-7xl
// 5.625rem) so paper-readability is the default, not an afterthought.
export function Slide({
  page,
  total,
  section,
  audience,
  tone = 'dark',
  children,
}) {
  const isLight = tone === 'light';
  return (
    <article
      className="pitch-print-slide relative flex flex-col overflow-hidden"
      data-tone={tone}
      style={{
        width: '297mm',
        height: '210mm',
        backgroundColor: isLight ? '#FFFFFF' : '#0A0A0A',
        color: isLight ? '#0A0A0A' : '#E5E5E5',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Top strip */}
      <header
        className="flex items-center justify-between"
        style={{
          padding: '10mm 14mm 0 14mm',
          fontFamily: 'var(--font-mono)',
          fontSize: '7.5pt',
          letterSpacing: '0.18em',
          color: isLight ? '#666' : '#888',
          textTransform: 'uppercase',
        }}
      >
        <div className="flex items-center gap-3">
          <Logo size={22} variant={isLight ? 'mono' : 'color'} />
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

      {/* Body — fills the slide minus header + footer */}
      <div
        className="relative flex flex-1 flex-col"
        style={{ padding: '6mm 16mm 6mm 16mm' }}
      >
        {children}
      </div>

      {/* Bottom strip */}
      <footer
        className="flex items-center justify-between"
        style={{
          padding: '0 14mm 8mm 14mm',
          fontFamily: 'var(--font-mono)',
          fontSize: '7.5pt',
          color: isLight ? '#666' : '#666',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        <span>tagrider.com</span>
        <span style={{ opacity: 0.5 }}>© TAG-ALONG LTD · 2026</span>
      </footer>

      {/* Corner ornaments — the deck's signature diamond glyphs */}
      <span
        aria-hidden
        className="absolute"
        style={{
          top: '14mm',
          right: '14mm',
          width: '2.5mm',
          height: '2.5mm',
          transform: 'rotate(45deg)',
          backgroundColor: '#008080',
          opacity: 0.6,
        }}
      />
    </article>
  );
}

// SlideHeading — large eyebrow + title + optional subtitle, used at
// the top of nearly every content slide. Print typography: eyebrow
// 9pt tracked, title 30pt extrabold, subtitle 12pt regular.
export function SlideHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const tx = align === 'center' ? { textAlign: 'center' } : null;
  return (
    <div style={{ marginBottom: '8mm', ...tx }}>
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
            color: 'inherit',
            opacity: 0.75,
            margin: '4mm 0 0 0',
            maxWidth: '180mm',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
