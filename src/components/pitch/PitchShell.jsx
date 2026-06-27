'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Download, Presentation, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { Lockup } from '@/components/brand/Logo';
import pitch from '@/data/pitch.json';
import { cn } from '@/lib/utils';

const AUDIENCE_ORDER = ['investor', 'judge', 'customer'];

// PitchShell — outer chrome wrapping every pitch section. Floats a
// translucent header carrying:
//   • brand lockup back to the site
//   • audience segmented-toggle (Investor / Judge / Customer)
//   • Present-mode button (Phase 2)
//   • Download-PDF button (Phase 2)
// The page also tracks scroll progress as a thin teal bar pinned to
// the top — gives investors a sense of "how far in" we are.
export function PitchShell({ audience = 'investor', onAudienceChange, children }) {
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(null);

  // Scroll progress — rAF-throttled, document-relative
  useEffect(() => {
    let raf;
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
    }
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Phase-2 stubs that surface as a toast so the affordances aren't dead UI
  const handlePresent = useCallback(() => {
    setToast({ kind: 'present', msg: 'Present mode arrives in the next ship.' });
  }, []);
  const handleDownload = useCallback(() => {
    setToast({ kind: 'download', msg: `${pitch.audiences[audience].label} PDF arrives in the next ship.` });
  }, [audience]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div className="relative isolate min-h-screen bg-background text-foreground">
      {/* Progress bar */}
      <div className="pointer-events-none fixed top-0 left-0 z-50 h-[2px] w-full bg-foreground/5">
        <motion.div
          className="h-full origin-left bg-primary"
          style={{ scaleX: progress }}
          transition={{ ease: 'linear', duration: 0 }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8 md:py-4">
          <Link href="/" aria-label="Back to tagrider.com" className="shrink-0 transition hover:opacity-80">
            <Lockup size={28} />
          </Link>

          <div className="hidden h-6 w-px bg-border/50 md:block" />

          {/* Audience segmented control */}
          <nav
            role="tablist"
            aria-label="Pitch audience"
            className="flex flex-1 items-center justify-center gap-1 rounded-full bg-elevated/60 p-1 ring-1 ring-border/40 md:flex-none md:justify-start"
          >
            {AUDIENCE_ORDER.map((key) => {
              const cfg = pitch.audiences[key];
              const active = audience === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => onAudienceChange?.(key)}
                  className={cn(
                    'relative rounded-full px-3 py-1.5 text-xs font-semibold transition md:px-4 md:py-2 md:text-sm',
                    active
                      ? 'text-primary-foreground'
                      : 'text-foreground-muted hover:text-foreground',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="audience-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{cfg.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handlePresent}
              className="hidden items-center gap-2 rounded-full border border-border/60 px-3 py-2 text-xs font-semibold text-foreground-muted transition hover:text-foreground hover:border-border md:flex md:text-sm"
              aria-label="Enter present mode"
            >
              <Presentation className="size-4" />
              Present
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary-hover md:px-4 md:text-sm"
              aria-label={`Download ${pitch.audiences[audience].label} deck PDF`}
            >
              <Download className="size-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
      </header>

      {/* Scroll-snap container for slide-like rhythm. Disabled below md
          to avoid trapping content on mobile. */}
      <main id="main-content" className="snap-y snap-mandatory md:snap-none">
        {children}
      </main>

      {/* Toast for Phase-2 stubs */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-elevated/95 px-5 py-3 text-sm font-medium text-foreground shadow-xl ring-1 ring-border/60 backdrop-blur"
            role="status"
          >
            <span>{toast.msg}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-foreground-muted hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
