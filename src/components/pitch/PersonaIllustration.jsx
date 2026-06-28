'use client';

// PersonaIllustration — designed SVG illustrations for the Problem
// section. Two variants: 'rider' (Fatima) and 'driver' (Emeka). These
// are intentionally abstract: composites, not photographs. Reads as
// "persona archetype" without pretending to be a real customer.
//
// Each illustration packs:
//   • a stylized portrait silhouette (head + shoulders)
//   • one role-specific visual hint (briefcase for rider, steering for driver)
//   • a Lagos-evocative backdrop (curving line suggesting horizon + road)
//   • a brand-tinted gradient (primary teal for rider, accent amber for driver)
//
// Designed to live inside the Problem section's diamond-cropped frames
// (rotated 45° container, illustration -45° to upright). The viewBox is
// square (100×100) so the rotation math stays clean.

export function PersonaIllustration({ kind = 'rider', className }) {
  if (kind === 'driver') return <DriverIllustration className={className} />;
  return <RiderIllustration className={className} />;
}

function RiderIllustration({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="rider-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#0E5C5C" />
          <stop offset="60%"  stopColor="#0A3F3F" />
          <stop offset="100%" stopColor="#062828" />
        </linearGradient>
        <linearGradient id="rider-figure" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%"   stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
        <linearGradient id="rider-accent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(245,158,11,0.0)" />
          <stop offset="100%" stopColor="rgba(245,158,11,0.6)" />
        </linearGradient>
      </defs>

      {/* Backdrop */}
      <rect width="100" height="100" fill="url(#rider-bg)" />

      {/* Lagos horizon — three building silhouettes at the back */}
      <g opacity="0.35">
        <rect x="8"  y="42" width="14" height="36" fill="#062828" />
        <rect x="24" y="34" width="10" height="44" fill="#062828" />
        <rect x="36" y="48" width="8"  height="30" fill="#062828" />
        <rect x="60" y="38" width="12" height="40" fill="#062828" />
        <rect x="74" y="46" width="10" height="32" fill="#062828" />
        <rect x="86" y="40" width="8"  height="38" fill="#062828" />
        {/* window dots */}
        <g fill="rgba(245,158,11,0.5)">
          <rect x="12" y="50" width="1.6" height="1.6" />
          <rect x="16" y="50" width="1.6" height="1.6" />
          <rect x="12" y="58" width="1.6" height="1.6" />
          <rect x="16" y="58" width="1.6" height="1.6" />
          <rect x="26" y="44" width="1.6" height="1.6" />
          <rect x="30" y="44" width="1.6" height="1.6" />
          <rect x="26" y="56" width="1.6" height="1.6" />
          <rect x="63" y="50" width="1.6" height="1.6" />
          <rect x="67" y="50" width="1.6" height="1.6" />
          <rect x="63" y="60" width="1.6" height="1.6" />
          <rect x="77" y="52" width="1.6" height="1.6" />
          <rect x="89" y="48" width="1.6" height="1.6" />
        </g>
      </g>

      {/* Soft amber sunset hint along the horizon */}
      <rect x="0" y="55" width="100" height="30" fill="url(#rider-accent)" opacity="0.5" />

      {/* Figure — head + shoulders. Slight 3/4 turn. */}
      <g>
        {/* Shoulders / suit blazer */}
        <path
          d="M 18 100 L 18 86 Q 22 76 32 73 L 50 70 L 68 73 Q 78 76 82 86 L 82 100 Z"
          fill="url(#rider-figure)"
        />
        {/* Suit lapel highlight */}
        <path
          d="M 42 100 L 47 78 L 50 74 L 53 78 L 58 100 Z"
          fill="#1F1F1F"
          opacity="0.8"
        />
        {/* Collar */}
        <path
          d="M 44 100 L 48 80 L 50 78 L 52 80 L 56 100 Z"
          fill="#E5E5E5"
          opacity="0.85"
        />
        {/* Neck */}
        <rect x="46" y="68" width="8" height="6" fill="#3B2A20" />
        {/* Head silhouette — slight oval, framed by hair */}
        <ellipse cx="50" cy="58" rx="11" ry="12.5" fill="#3B2A20" />
        {/* Hair — wrapped/styled around head, suggests cultural framing */}
        <path
          d="M 38 58 Q 36 46 44 42 Q 50 38 56 42 Q 64 46 62 58 Q 64 55 64 50 Q 62 38 50 36 Q 38 38 36 50 Q 36 55 38 58 Z"
          fill="#1A1410"
        />
        {/* Subtle face plane shadow */}
        <path
          d="M 50 58 Q 45 58 43 64 Q 45 68 50 68 Z"
          fill="#2D1F18"
          opacity="0.6"
        />
        {/* Earring glint */}
        <circle cx="59" cy="60" r="0.8" fill="#F0B429" />
      </g>

      {/* Phone in hand — minimal silhouette in lower-right */}
      <g transform="translate(70, 88) rotate(-10)">
        <rect x="0" y="0" width="6" height="9" rx="1" fill="#1A1A1A" stroke="#008080" strokeWidth="0.4" />
        <rect x="1" y="1.4" width="4" height="6" fill="#008080" opacity="0.5" />
      </g>

      {/* Corner accent — diamond glyph echoing deck language */}
      <rect x="6" y="6" width="3" height="3" fill="#F59E0B" transform="rotate(45 7.5 7.5)" opacity="0.8" />
    </svg>
  );
}

function DriverIllustration({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="driver-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#5C3A0A" />
          <stop offset="60%"  stopColor="#3F2806" />
          <stop offset="100%" stopColor="#281904" />
        </linearGradient>
        <linearGradient id="driver-figure" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%"   stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
        <linearGradient id="driver-windshield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(0,128,128,0.45)" />
          <stop offset="100%" stopColor="rgba(0,128,128,0.05)" />
        </linearGradient>
      </defs>

      {/* Backdrop */}
      <rect width="100" height="100" fill="url(#driver-bg)" />

      {/* Windshield curve — top edge, suggesting driver's view */}
      <path
        d="M 0 24 Q 50 12 100 24 L 100 0 L 0 0 Z"
        fill="#0A0A0A"
        opacity="0.5"
      />
      <path
        d="M 0 24 Q 50 12 100 24 L 100 60 Q 50 50 0 60 Z"
        fill="url(#driver-windshield)"
      />

      {/* Distant road dots — pinpoints of light through windshield */}
      <g fill="#F0B429" opacity="0.7">
        <circle cx="22" cy="32" r="0.8" />
        <circle cx="34" cy="28" r="0.6" />
        <circle cx="46" cy="26" r="0.7" />
        <circle cx="58" cy="27" r="0.5" />
        <circle cx="68" cy="30" r="0.7" />
        <circle cx="78" cy="33" r="0.6" />
      </g>

      {/* Dashboard line */}
      <path
        d="M 0 62 Q 50 55 100 62 L 100 70 Q 50 64 0 70 Z"
        fill="#1A1A1A"
      />

      {/* Steering wheel — curved arc in lower-front */}
      <g transform="translate(50, 88)">
        <path
          d="M -22 0 Q -22 -14 0 -14 Q 22 -14 22 0"
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="3.5"
        />
        <path
          d="M -22 0 Q -22 -14 0 -14 Q 22 -14 22 0"
          fill="none"
          stroke="#262626"
          strokeWidth="1.6"
        />
        {/* Center boss */}
        <ellipse cx="0" cy="-5" rx="3.5" ry="2.4" fill="#262626" />
      </g>

      {/* Figure — head + shoulders, framed by windshield */}
      <g>
        {/* Shoulders — t-shirt collar */}
        <path
          d="M 22 100 L 22 76 Q 28 68 38 66 L 50 64 L 62 66 Q 72 68 78 76 L 78 100 Z"
          fill="url(#driver-figure)"
        />
        {/* T-shirt collar V */}
        <path
          d="M 45 100 L 48 72 L 50 70 L 52 72 L 55 100 Z"
          fill="#262626"
          opacity="0.7"
        />
        {/* Seatbelt strap */}
        <path
          d="M 30 100 L 60 65 L 64 66 L 34 100 Z"
          fill="#3F2806"
          opacity="0.9"
        />
        <path
          d="M 30 100 L 60 65 L 64 66 L 34 100 Z"
          fill="none"
          stroke="#F0B429"
          strokeWidth="0.5"
          opacity="0.6"
        />
        {/* Neck */}
        <rect x="46" y="60" width="8" height="6" fill="#3B2A20" />
        {/* Head */}
        <ellipse cx="50" cy="50" rx="11" ry="12.5" fill="#3B2A20" />
        {/* Short hair / cap line */}
        <path
          d="M 39 50 Q 39 38 50 36 Q 61 38 61 50 Q 61 44 56 40 Q 50 38 44 40 Q 39 44 39 50 Z"
          fill="#1A1410"
        />
        {/* Face plane shadow */}
        <path
          d="M 50 50 Q 45 50 43 56 Q 45 60 50 60 Z"
          fill="#2D1F18"
          opacity="0.5"
        />
        {/* Eye glint — sunglasses */}
        <ellipse cx="45" cy="48" rx="2.2" ry="1.4" fill="#0A0A0A" />
        <ellipse cx="55" cy="48" rx="2.2" ry="1.4" fill="#0A0A0A" />
        <rect x="47" y="47.5" width="1.5" height="0.8" fill="#0A0A0A" />
      </g>

      {/* Corner accent */}
      <rect x="91" y="6" width="3" height="3" fill="#008080" transform="rotate(45 92.5 7.5)" opacity="0.8" />
    </svg>
  );
}
