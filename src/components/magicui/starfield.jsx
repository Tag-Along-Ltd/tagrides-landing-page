'use client';

// Two graceful meteor streaks, slow cycles. No static starfield —
// the page background does the work. Animation in globals.css.
export function Starfield({ className = '' }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <span className="shooting-star shooting-star-1" />
      <span className="shooting-star shooting-star-2" />
    </div>
  );
}
