import { cn } from '@/lib/utils';

const TEAL = '#008080';
const AMBER = '#F59E0B';

// Canonical Tag Rides mark — concept "Stronger Together." Single source of
// truth across the site. For non-React contexts (HTML email, Flutter
// splash, OG images, favicons) use the SVG exports under
// /public/assets/brand/ — they are byte-identical.

export function Logo({
  size = 40,
  variant = 'color', // 'color' | 'mono' | 'reverse'
  className,
  title = 'Tag Rides',
}) {
  const a = variant === 'color' ? TEAL : 'currentColor';
  const b = variant === 'color' ? AMBER : 'currentColor';
  // Each Logo instance has a unique mask id to avoid collisions when
  // multiple Logos render on the same page.
  const maskId = `lr-cut-${Math.round(size * 1000)}-${variant}`;

  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      fill="none"
      role="img"
      aria-label={title}
      className={cn(className)}
    >
      <title>{title}</title>
      <defs>
        <mask id={maskId}>
          <rect width="100" height="60" fill="white" />
          <circle cx="65" cy="30" r="22" fill="black" />
        </mask>
      </defs>
      <circle cx="35" cy="30" r="22" stroke={a} strokeWidth="6" />
      <g mask={`url(#${maskId})`}>
        <circle cx="65" cy="30" r="22" stroke={b} strokeWidth="6" />
      </g>
      <path d="M 56 17 A 22 22 0 0 1 56 43" stroke={a} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ className, variant = 'inline' }) {
  // variant === 'inline'   → "tag" foreground + "rides" primary
  // variant === 'inverted' → "tag" white + "rides" amber
  if (variant === 'inverted') {
    return (
      <span className={cn('inline-flex items-baseline font-display font-extrabold tracking-tight', className)}>
        <span className="text-white">tag</span>
        <span className="text-accent">rides</span>
      </span>
    );
  }
  return (
    <span className={cn('inline-flex items-baseline font-display font-extrabold tracking-tight', className)}>
      <span className="text-foreground">tag</span>
      <span className="text-primary">rides</span>
    </span>
  );
}

export function Lockup({ size = 28, variant = 'color', className }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Logo size={size} variant={variant} />
      <Wordmark className="text-xl" variant={variant === 'reverse' ? 'inverted' : 'inline'} />
    </span>
  );
}
