'use client';

// ─────────────────────────────────────────────────────────────────────────
// Three logo concepts for Tag Rides. Each one is a self-contained SVG
// component so it scales cleanly from a 16px favicon to a 10ft banner.
// The current "chainlink as the g in tag" mark is replaced by these.
// ─────────────────────────────────────────────────────────────────────────

const TEAL = '#008080';
const TEAL_LIGHT = '#5F8F8F';
const AMBER = '#F59E0B';

// ─── Concept 1: STRONGER TOGETHER ─────────────────────────────────────
// Two interlocking rings — teal + amber — meeting at the centre. The
// intersection IS the brand: a driver and a rider whose paths meet, briefly.
export function MarkStronger({ size = 96, className }) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      fill="none"
      className={className}
      aria-label="Tag Rides — Stronger Together mark"
    >
      <defs>
        <mask id="cut-amber">
          <rect width="100" height="60" fill="white" />
          <circle cx="35" cy="30" r="22" fill="black" />
        </mask>
        <mask id="cut-teal">
          <rect width="100" height="60" fill="white" />
          <circle cx="65" cy="30" r="22" fill="black" />
        </mask>
      </defs>
      {/* Teal ring (full) */}
      <circle cx="35" cy="30" r="22" stroke={TEAL} strokeWidth="6" />
      {/* Amber ring, with the segment behind the teal ring punched out so it reads as interlocked */}
      <g mask="url(#cut-teal)">
        <circle cx="65" cy="30" r="22" stroke={AMBER} strokeWidth="6" />
      </g>
      {/* And the small re-emergence of teal in front so the over/under reads */}
      <path
        d={`M 56 17 a 22 22 0 0 1 0 26`}
        stroke={TEAL}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        opacity="1"
      />
    </svg>
  );
}

// ─── Concept 2: THE ROUTE ─────────────────────────────────────────────
// The mark *is* the product. A shared route — multiple riders along one
// driver's commute, finishing at an amber destination.
export function MarkRoute({ size = 110, className }) {
  return (
    <svg
      width={size}
      height={size * 0.42}
      viewBox="0 0 110 46"
      fill="none"
      className={className}
      aria-label="Tag Rides — Route mark"
    >
      <defs>
        <linearGradient id="route-grad" x1="0" x2="1">
          <stop offset="0%" stopColor={TEAL} />
          <stop offset="70%" stopColor={TEAL} />
          <stop offset="100%" stopColor={AMBER} />
        </linearGradient>
      </defs>
      {/* Curving route */}
      <path
        d="M 10 30 Q 35 8, 55 26 T 100 18"
        stroke="url(#route-grad)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Origin (driver) */}
      <circle cx="10" cy="30" r="6" fill={TEAL} />
      {/* Pickup pins (riders) */}
      <circle cx="38" cy="14" r="3.6" fill={TEAL} />
      <circle cx="58" cy="26" r="3.6" fill={TEAL} />
      <circle cx="78" cy="22" r="3.6" fill={TEAL} />
      {/* Destination */}
      <circle cx="100" cy="18" r="6" fill={AMBER} />
    </svg>
  );
}

// ─── Concept 3: THE TAG ───────────────────────────────────────────────
// A map pin — the universal ride-share visual — with three riders nested
// inside. "We tag along, here." Direct, abstractable, scales to favicon.
export function MarkTag({ size = 88, className }) {
  return (
    <svg
      width={size * 0.7}
      height={size}
      viewBox="0 0 60 80"
      fill="none"
      className={className}
      aria-label="Tag Rides — Tag mark"
    >
      <defs>
        <linearGradient id="pin-grad" x1="0.3" x2="0.7" y1="0" y2="1">
          <stop offset="0%" stopColor={TEAL_LIGHT} />
          <stop offset="100%" stopColor={TEAL} />
        </linearGradient>
      </defs>
      {/* Pin body */}
      <path
        d="M 30 4 C 16 4 6 14 6 28 C 6 42 18 56 30 76 C 42 56 54 42 54 28 C 54 14 44 4 30 4 Z"
        fill="url(#pin-grad)"
      />
      {/* Three rider dots inside — slightly offset like a small group */}
      <circle cx="22" cy="22" r="3.2" fill="#0a0a0a" />
      <circle cx="38" cy="22" r="3.2" fill="#0a0a0a" />
      <circle cx="30" cy="34" r="3.2" fill={AMBER} />
    </svg>
  );
}

// ─── WORDMARK ─────────────────────────────────────────────────────────
// Used alongside each mark. Renders the text using the page's display
// font so it inherits the brand's typographic system.
export function Wordmark({ mark, accent = false, className = '' }) {
  return (
    <span className={`inline-flex items-baseline gap-1 font-display ${className}`}>
      <span className="font-extrabold tracking-tight text-foreground">tag</span>
      <span className={accent ? 'font-extrabold tracking-tight text-accent' : 'font-extrabold tracking-tight text-primary'}>
        rides
      </span>
    </span>
  );
}

// ─── APPLICATION MOCKUPS ───────────────────────────────────────────────
// Each mockup takes one of the three Mark components and shows it living
// somewhere — an app icon, a business card, a t-shirt placement, a social
// avatar. Self-contained, no external assets.

export function AppIconMock({ MarkComp }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex size-24 items-center justify-center rounded-[28%] shadow-[0_30px_60px_-30px_rgba(0,128,128,0.6)]"
        style={{
          background:
            'radial-gradient(circle at 30% 25%, rgba(0, 128, 128, 0.95), rgba(0, 90, 90, 0.95) 100%)',
        }}
      >
        <MarkComp size={56} />
      </div>
      <p className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">App icon</p>
    </div>
  );
}

export function BusinessCardMock({ MarkComp, accent = false }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-[260px] overflow-hidden rounded-2xl border border-border bg-elevated p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]"
        style={{ aspectRatio: '1.75 / 1' }}
      >
        <div className="absolute -right-4 -top-4 size-24 rounded-full bg-primary/12 blur-2xl" />
        <div className="relative flex h-full flex-col justify-between">
          <MarkComp size={32} />
          <div>
            <p className="font-display text-sm font-semibold text-foreground">Olaiya O.</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
              Founder · Tag Along Ltd
            </p>
            <p className="mt-2 font-mono text-[10px] text-foreground-muted">
              hello@tagrider.com · Lagos
            </p>
          </div>
        </div>
      </div>
      <p className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">Business card</p>
    </div>
  );
}

export function ShirtMock({ MarkComp }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 120 130" className="h-32 w-32">
        {/* Simple t-shirt silhouette */}
        <path
          d="M 30 18 L 50 18 L 60 28 L 70 18 L 90 18 L 110 30 L 100 50 L 90 45 L 90 120 L 30 120 L 30 45 L 20 50 L 10 30 Z"
          fill="#1a1a1a"
          stroke="#333333"
          strokeWidth="1"
        />
        {/* Logo placement */}
        <g transform="translate(48, 60) scale(0.22)">
          <foreignObject x="0" y="0" width="100" height="60">
            <MarkComp size={100} />
          </foreignObject>
        </g>
      </svg>
      <p className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">T-shirt</p>
    </div>
  );
}

export function AvatarMock({ MarkComp }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex size-20 items-center justify-center rounded-full ring-2 ring-primary/30"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(20, 184, 166, 0.95), rgba(0, 100, 100, 1) 100%)',
        }}
      >
        <MarkComp size={42} />
      </div>
      <p className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">Social avatar</p>
    </div>
  );
}
