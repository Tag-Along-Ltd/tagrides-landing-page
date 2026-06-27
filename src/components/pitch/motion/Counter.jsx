'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

// In-view number counter. Counts up over `duration` ms when scrolled
// into view, once. Supports prefix/suffix + decimal handling.
export function Counter({ value, prefix = '', suffix = '', duration = 1200, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    // Reduced-motion users skip the ease, just land on the value
    // immediately via the same rAF path (avoids the linter's
    // sync-setState-in-effect rule).
    const effectiveDuration = reduced ? 0 : duration;

    let raf;
    function tick(now) {
      const t = effectiveDuration === 0 ? 1 : Math.min(1, (now - start) / effectiveDuration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  // Decimal-aware formatting — match decimal count of the source value
  const decimals = (String(value).split('.')[1] ?? '').length;
  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      {prefix}
      {formatted}
      {suffix}
    </motion.span>
  );
}
