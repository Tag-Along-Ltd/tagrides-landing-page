'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// Lenis smooth-scroll across the pitch page. We mount it once at the
// outer shell. Anchors (#problem etc) keep working — Lenis just makes the
// scroll feel premium and lets us animate scroll progress smoothly.
export function LenisProvider({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
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
  }, []);

  return children;
}
