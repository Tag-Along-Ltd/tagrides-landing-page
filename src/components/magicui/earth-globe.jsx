'use client';

import { cn } from '@/lib/utils';

// Self-hosted Mercator Earth texture (so the CSS mask works without CORS).
const EARTH_TEXTURE_URL = '/assets/img/earth-mercator.jpg';

// Continent silhouettes only — dim, ambient, integrates with the page.
// Mask-image (luminance mode) drops the dark oceans into transparency,
// the soft teal gradient becomes the continent fill color.
export function EarthGlobe({ className }) {
  return (
    <div
      className={cn(
        'relative isolate flex aspect-square w-full items-center justify-center',
        className,
      )}
    >
      <div
        aria-hidden="true"
        style={{
          width: '70%',
          height: '70%',
          borderRadius: '50%',
          // Continent color: gentle teal sphere-lighting gradient
          background:
            'radial-gradient(circle at 32% 28%, rgba(95, 200, 195, 0.85), rgba(20, 184, 166, 0.7) 50%, rgba(0, 128, 128, 0.5) 100%)',
          // Mercator texture as a luminance mask:
          //   bright pixels (continents) → opaque
          //   dark pixels (oceans)        → transparent
          WebkitMaskImage: `url('${EARTH_TEXTURE_URL}')`,
          WebkitMaskMode: 'luminance',
          WebkitMaskSize: 'auto 100%',
          WebkitMaskRepeat: 'repeat-x',
          WebkitMaskPosition: 'center',
          maskImage: `url('${EARTH_TEXTURE_URL}')`,
          maskMode: 'luminance',
          maskSize: 'auto 100%',
          maskRepeat: 'repeat-x',
          maskPosition: 'center',
          // Very soft halo — drifts off into the page, no hard edge
          boxShadow: '0 0 80px 18px rgba(0, 128, 128, 0.18)',
          opacity: 0.65,
          animation: 'earth-spin 180s linear infinite',
          transform: 'rotateZ(10deg)',
        }}
      />
    </div>
  );
}
