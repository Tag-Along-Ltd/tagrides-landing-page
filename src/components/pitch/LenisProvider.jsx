'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// Lenis smooth-scroll across the pitch page. Mounted once at the outer
// shell. `paused` disables Lenis (e.g. for Present mode, where we want
// native programmatic scroll to actually jump between slides).
// Anchors keep working in both modes — Lenis just makes idle scrolling
// feel premium and lets us animate scroll progress smoothly.
export function LenisProvider({ children, paused = false }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (paused) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [paused]);

  return children;
}
