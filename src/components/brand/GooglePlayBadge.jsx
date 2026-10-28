import brand from '@/data/brand.json';

// Official "Get it on Google Play" badge (unmodified, per Google's badge
// guidelines). Hidden until the production release is live on Play: set
// app.googlePlayLive to true in src/data/brand.json after approval.
// The PNG includes Google's required clear space, so no extra padding.
export function GooglePlayBadge({ className = '', height = 60 }) {
  if (!brand.app.googlePlayLive) return null;
  return (
    <a
      href={brand.app.googlePlay}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get TagRides on Google Play"
      className={`inline-block transition hover:opacity-90 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/badges/google-play-badge-en.png"
        alt="Get it on Google Play"
        width={Math.round((height * 646) / 250)}
        height={height}
        style={{ height, width: 'auto' }}
      />
    </a>
  );
}
