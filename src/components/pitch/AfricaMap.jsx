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

// Coordinates derived from real lat/long, equirectangularly projected
// into the 240×280 viewBox via:
//   x = (lon + 17) * 2.9 + 30   (West of Senegal +17, scale 2.9 units/°)
//   y = (37 - lat) * 3.5 + 15   (North of Tunisia +37, scale 3.5 units/°)
// Reference: Lagos (6.5°N, 3.4°E) → (89, 122).
const CITIES = {
  Lagos:   { x:  89, y: 122, primary: true,  status: 'now' },     // 6.5°N, 3.4°E
  Abuja:   { x: 101, y: 113, primary: false, status: 'year2' },   // 9.1°N, 7.5°E
  Accra:   { x:  79, y: 125, primary: false, status: 'year2' },   // 5.6°N, -0.2°W
  Nairobi: { x: 186, y: 149, primary: false, status: 'year3' },   // 1.3°S, 36.8°E
  Kigali:  { x: 166, y: 151, primary: false, status: 'year3' },   // 1.9°S, 30.1°E
};

// Africa silhouette traced from real geographic coordinates, projected
// equirectangularly into the 240×280 viewBox. Key reference points:
//   Casablanca (33°N, -8°W)    → (56,  29)   NW corner
//   Algiers    (36.7°N, 3°E)   → (88,  16)   Mediterranean
//   Alexandria (31°N, 30°E)    → (166, 36)   E Mediterranean
//   Cape Guardafui (12°N, 51°E)→ (228, 103)  Horn of Africa
//   Maputo     (-26°S, 32.6°E) → (174, 236)  East coast south
//   Cape Agulhas (-35°S, 20°E) → (137, 266)  Southernmost tip
//   Cape Town  (-34°S, 18°E)   → (133, 263)
//   Dakar      (14.7°N, -17°W) → (29,  93)   Westernmost point
//   Lagos      (6.5°N, 3.4°E)  → (89, 122)
// Each segment uses Q curves to smooth straight L coordinates into
// recognizable coastlines.
const AFRICA_PATH = `
M 58 28
Q 76 16 98 18
Q 118 18 128 22
L 134 30
Q 152 32 174 38
L 184 50
Q 188 70 196 92
L 208 100
Q 226 96 236 102
L 238 110
Q 228 124 214 134
L 198 142
L 196 164
Q 204 200 180 232
Q 158 262 138 268
L 130 263
Q 116 252 122 230
L 120 200
L 116 178
Q 108 156 112 138
Q 102 130 94 130
L 86 122
L 64 126
Q 48 124 46 120
Q 28 108 27 92
L 32 78
L 32 60
Q 38 44 58 28 Z
`;

// Madagascar — east of mainland, tilted NE-SW
const MADAGASCAR_PATH = `
M 218 188
Q 226 196 224 214
Q 220 232 212 234
Q 206 226 210 206
Q 213 190 218 188 Z
`;

export function AfricaMap({ className, staticMode = false }) {
  // staticMode: skip all motion / animate-on-view wrappers so the map
  // renders fully-visible without needing a viewport intersection.
  // Used in the print deck where everything must be visible immediately
  // for window.print() to capture the right state.
  if (staticMode) return <StaticAfricaMap className={className} />;
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

// Generate a grid of dots inside the SVG viewBox. The dots are then
// clipped to the Africa path so the continent appears as a dotted
// constellation — design-forward, unmistakably a map.
function generateDotGrid(cols = 28, rows = 36, jitter = 0.4) {
  const stepX = 240 / cols;
  const stepY = 280 / rows;
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Pseudo-jitter for organic feel (deterministic from indices)
      const seed = (c * 73 + r * 137) % 100;
      const jx = ((seed - 50) / 50) * jitter * stepX;
      const jy = (((seed * 13) % 100 - 50) / 50) * jitter * stepY;
      dots.push({
        x: c * stepX + stepX / 2 + jx,
        y: r * stepY + stepY / 2 + jy,
        // Varied dot sizes (1pt, 1.4pt, 0.7pt) for visual rhythm
        r: 0.55 + ((c + r) % 3) * 0.18,
      });
    }
  }
  return dots;
}

const DOT_GRID = generateDotGrid();

// Static (no-motion) version for the print deck. Builds the map as a
// constellation: Africa shape filled with a clipped dot grid, city
// pins glowing on top, dotted expansion arcs connecting Lagos to the
// four future cities. Looks like a map. Reads like a star chart.
function StaticAfricaMap({ className }) {
  // The wrapper uses block + minHeight: 0 so it inherits the parent
  // flex container's height. The SVG uses preserveAspectRatio="xMidYMid meet"
  // (default) so the map scales to fit the smaller dimension of the
  // container, centred. width:100%, height:100% on both ensures no
  // SVG overflow regardless of parent aspect ratio.
  return (
    <div className={className} style={{ display: 'block', width: '100%', height: '100%', minHeight: 0 }}>
      <svg
        viewBox="0 0 240 280"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
        role="img"
        aria-label="Africa expansion map — Lagos start, four cities planned"
      >
        <defs>
          <linearGradient id="africa-fill-static" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="rgba(0,128,128,0.10)" />
            <stop offset="100%" stopColor="rgba(0,128,128,0.03)" />
          </linearGradient>
          <clipPath id="africa-clip">
            <path d={AFRICA_PATH} />
            <path d={MADAGASCAR_PATH} />
          </clipPath>
          <radialGradient id="lagos-glow-static" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"  stopColor="rgba(0,128,128,0.7)" />
            <stop offset="100%" stopColor="rgba(0,128,128,0)" />
          </radialGradient>
        </defs>

        {/* Soft continent fill so the shape is recognizable even without dots */}
        <path
          d={AFRICA_PATH}
          fill="url(#africa-fill-static)"
        />
        <path
          d={MADAGASCAR_PATH}
          fill="url(#africa-fill-static)"
        />

        {/* Constellation: dot grid clipped to Africa's shape */}
        <g clipPath="url(#africa-clip)">
          {DOT_GRID.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.r}
              fill="#008080"
              opacity={0.55 + (i % 5) * 0.08}
            />
          ))}
        </g>

        {/* Continent outline — thin, dotted, after the dots so it
            sits on top and clearly defines the silhouette */}
        <path
          d={AFRICA_PATH}
          fill="none"
          stroke="#008080"
          strokeOpacity="0.5"
          strokeWidth="0.7"
          strokeDasharray="1.4 1"
        />
        <path
          d={MADAGASCAR_PATH}
          fill="none"
          stroke="#008080"
          strokeOpacity="0.5"
          strokeWidth="0.7"
          strokeDasharray="1.4 1"
        />

        {/* Lagos halo + sun-burst (the launch city is the visual hero) */}
        <circle cx={CITIES.Lagos.x} cy={CITIES.Lagos.y} r="14" fill="url(#lagos-glow-static)" />

        {/* Arcs from Lagos to expansion cities */}
        {Object.entries(CITIES)
          .filter(([n]) => n !== 'Lagos')
          .map(([name, c]) => {
            const cx = (CITIES.Lagos.x + c.x) / 2;
            const cy = Math.min(CITIES.Lagos.y, c.y) - 18;
            return (
              <path
                key={name}
                d={`M ${CITIES.Lagos.x} ${CITIES.Lagos.y} Q ${cx} ${cy} ${c.x} ${c.y}`}
                stroke="#F59E0B"
                strokeOpacity="0.75"
                strokeWidth="0.8"
                strokeDasharray="1.6 1.8"
                fill="none"
              />
            );
          })}

        {/* City pins */}
        {Object.entries(CITIES).map(([name, c]) => {
          const isPrimary = c.primary;
          return (
            <g key={name}>
              {isPrimary && (
                <circle cx={c.x} cy={c.y} r="6" fill="#008080" opacity="0.35" />
              )}
              <circle
                cx={c.x}
                cy={c.y}
                r={isPrimary ? 3.2 : 2.4}
                fill={isPrimary ? '#E5E5E5' : '#F59E0B'}
                stroke={isPrimary ? '#008080' : '#0A0A0A'}
                strokeWidth="0.6"
              />
              <text
                x={c.x + (isPrimary ? 7 : 5)}
                y={c.y + 3}
                fontSize={isPrimary ? '11' : '8'}
                fontWeight={isPrimary ? '800' : '600'}
                fontFamily="var(--font-display), system-ui"
                fill={isPrimary ? '#E5E5E5' : '#B3B3B3'}
                style={{ paintOrder: 'stroke' }}
                stroke="#0A0A0A"
                strokeWidth="1.4"
                strokeOpacity="0.9"
              >
                {name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
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
          <circle cx={city.x} cy={city.y} r="4" fill="currentColor" className="text-primary">
            <animate
              attributeName="r"
              values="4;12;4"
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
            r="4"
            fill="currentColor"
            className="text-primary"
            filter="url(#lagos-glow)"
          />
        </>
      )}
      {!isPrimary && (
        <circle cx={city.x} cy={city.y} r="2.8" fill="currentColor" className="text-accent" />
      )}
      <text
        x={city.x + (isPrimary ? 8 : 6)}
        y={city.y + 3}
        fontSize={isPrimary ? '11' : '8'}
        fontWeight={isPrimary ? '700' : '600'}
        fontFamily="var(--font-display)"
        className={isPrimary ? 'fill-foreground' : 'fill-foreground-muted'}
      >
        {name}
      </text>
    </motion.g>
  );
}
