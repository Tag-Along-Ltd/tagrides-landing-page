'use client';

import { motion } from 'motion/react';

// Stylized Africa silhouette + city dots. Not geographically perfect —
// it's a recognizable, brand-tinted icon-grade map. Lagos pulses; the
// four expansion cities (Abuja, Accra, Nairobi, Kigali) appear as
// secondary dots with dotted arc lines drawn from Lagos.
//
// Coordinates below are calibrated against the SVG's 240×280 viewbox
// to land roughly where each city sits on the continent — not survey-
// grade, but readable to anyone who knows Africa.

const CITIES = {
  Lagos:   { x: 90,  y: 132, primary: true,  status: 'now' },
  Abuja:   { x: 100, y: 122, primary: false, status: 'year2' },
  Accra:   { x: 78,  y: 130, primary: false, status: 'year2' },
  Nairobi: { x: 158, y: 168, primary: false, status: 'year3' },
  Kigali:  { x: 150, y: 162, primary: false, status: 'year3' },
};

// Hand-traced Africa outline. Approximate — chosen for shape recognition
// at small sizes. Path uses smooth curves rather than a literal coastal
// trace so it reads as designed-not-geographic.
const AFRICA_PATH = `
M 95 30
Q 80 28 70 38
Q 60 45 55 60
Q 48 75 50 92
Q 52 105 48 120
Q 42 134 44 148
Q 48 162 56 178
Q 64 196 76 215
Q 88 232 102 244
Q 116 254 130 252
Q 142 250 152 240
Q 162 228 168 212
Q 174 196 178 178
Q 182 158 188 142
Q 195 124 196 106
Q 198 88 192 72
Q 184 58 168 50
Q 152 42 134 36
Q 116 32 95 30 Z
`;

export function AfricaMap({ className }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 240 280"
        className="size-full"
        role="img"
        aria-label="Africa expansion map — Lagos start, four cities planned"
      >
        <defs>
          {/* Subtle gradient fill on the continent so it doesn't read
              as a flat shape — gives depth without literal motion */}
          <linearGradient id="africa-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="rgba(0,128,128,0.10)" />
            <stop offset="100%" stopColor="rgba(0,128,128,0.04)" />
          </linearGradient>
          <filter id="lagos-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Continent outline */}
        <motion.path
          d={AFRICA_PATH}
          fill="url(#africa-fill)"
          stroke="currentColor"
          strokeWidth="0.7"
          className="text-primary/30"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Lagos → other cities — dotted arcs */}
        {Object.entries(CITIES)
          .filter(([name]) => name !== 'Lagos')
          .map(([name, c], i) => (
            <ExpansionArc key={name} from={CITIES.Lagos} to={c} delay={1.2 + i * 0.15} />
          ))}

        {/* City dots */}
        {Object.entries(CITIES).map(([name, c], i) => (
          <CityDot key={name} name={name} city={c} delay={1.6 + i * 0.1} />
        ))}
      </svg>
    </div>
  );
}

function ExpansionArc({ from, to, delay }) {
  // Quadratic Bezier control point — pulled up + away so the arcs feel
  // like flight paths rather than straight lines.
  const cx = (from.x + to.x) / 2;
  const cy = Math.min(from.y, to.y) - 12;
  const d = `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
  return (
    <motion.path
      d={d}
      stroke="currentColor"
      strokeWidth="0.6"
      strokeDasharray="1.4 1.6"
      fill="none"
      className="text-accent/60"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

function CityDot({ name, city, delay }) {
  const isPrimary = city.primary;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay, type: 'spring', stiffness: 220, damping: 18 }}
    >
      {isPrimary && (
        <>
          {/* Pulsing halo for the active city — radial expand + fade */}
          <circle cx={city.x} cy={city.y} r="3" fill="currentColor" className="text-primary">
            <animate
              attributeName="r"
              values="3;9;3"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;0;0.6"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx={city.x}
            cy={city.y}
            r="2.6"
            fill="currentColor"
            className="text-primary"
            filter="url(#lagos-glow)"
          />
        </>
      )}
      {!isPrimary && (
        <circle cx={city.x} cy={city.y} r="1.8" fill="currentColor" className="text-accent" />
      )}
      <text
        x={city.x + (isPrimary ? 6 : 4)}
        y={city.y + 2}
        fontSize={isPrimary ? '7' : '5.5'}
        fontWeight={isPrimary ? '700' : '500'}
        fontFamily="var(--font-display)"
        className={isPrimary ? 'fill-foreground' : 'fill-foreground-muted'}
      >
        {name}
      </text>
    </motion.g>
  );
}
