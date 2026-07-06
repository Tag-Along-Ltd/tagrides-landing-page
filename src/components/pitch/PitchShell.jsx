'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Download, Presentation, X, ChevronLeft, ChevronRight, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { Lockup } from '@/components/brand/Logo';
import pitch from '@/data/pitch.json';
import { cn } from '@/lib/utils';

const AUDIENCE_ORDER = ['investor', 'judge', 'customer'];

// PitchShell — outer chrome for /pitch.
//
// In SCROLL mode:
//   • Sticky header w/ brand lockup + audience tabs + Present + Download
//   • Top-pinned scroll progress bar
//
// In PRESENT mode (toggled by P key or the Present button):
//   • Header chrome hides
//   • Sections snap one-per-viewport
//   • Arrow keys / Space / Page-Down advance; Esc exits
//   • Slide counter pinned bottom-right, prev/next controls bottom-center
//
// Download triggers window.print(). A print stylesheet in globals.css
// hides chrome + forces page-break-after on each section so the printed
// (or save-as-PDF'd) artifact reads as a paper deck per audience.
export function PitchShell({
  audience = 'investor',
  onAudienceChange,
  presentMode = false,
  onPresentToggle,
  sectionKeys = [],
  children,
}) {
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [toast, setToast] = useState(null);
  const totalSlides = sectionKeys.length;

  // Scroll progress + current-slide tracking
  useEffect(() => {
    let raf;
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      const nextProgress = Math.min(1, Math.max(0, ratio));
      setProgress(nextProgress);

      // Find which section we're inside — pick the section whose top
      // is closest to (but not past) the viewport's vertical center
      const sections = sectionKeys
        .map((k) => document.getElementById(sectionIdFor(k)))
        .filter(Boolean);
      const centerY = window.innerHeight / 2;
      let active = 0;
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= centerY) active = i;
      }
      // The final slide's top may never cross viewport center if the document
      // has no extra scroll room after it. At bottom, force the rail/counter to
      // the last rendered section so Ask can become active.
      if (nextProgress >= 0.995 && sections.length > 0) {
        active = sections.length - 1;
      }
      setCurrentSlide(active);
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
  }, [sectionKeys]);

  // Section navigation — used by both keyboard + the on-screen controls
  const goToSlide = useCallback((index) => {
    const clamped = Math.max(0, Math.min(sectionKeys.length - 1, index));
    const el = document.getElementById(sectionIdFor(sectionKeys[clamped]));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [sectionKeys]);

  // Keyboard: P toggles present, arrows + space advance, Esc exits.
  // Active in both modes — P always toggles; arrows always navigate
  // (handy for the scroll view too).
  useEffect(() => {
    function onKey(e) {
      // Skip when typing into an input/textarea/contenteditable
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
        return;
      }

      if (e.key === 'p' || e.key === 'P') {
        if (e.metaKey || e.ctrlKey) return; // leave browser print alone
        e.preventDefault();
        onPresentToggle?.(!presentMode);
        return;
      }
      if (e.key === 'Escape' && presentMode) {
        e.preventDefault();
        onPresentToggle?.(false);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        if (e.key === ' ' && !presentMode) return; // don't hijack space outside present
        e.preventDefault();
        goToSlide(currentSlide + 1);
        return;
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [presentMode, onPresentToggle, goToSlide, currentSlide]);

  // Download = navigate to the dedicated print route, which renders a
  // proper slide deck (landscape A4 per slide, designed for paper) and
  // auto-triggers window.print() via ?auto=1.  No more retrofitting
  // the web layout onto paper — the print surface is its own thing.
  const handleDownload = useCallback(() => {
    window.open(`/pitch/print?audience=${audience}&auto=1`, '_blank', 'noopener');
  }, [audience]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4200);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div
      className={cn('relative isolate min-h-screen bg-background text-foreground', presentMode && 'pitch-present')}
      data-audience={audience}
    >
      {/* Print attribution — only visible in @media print */}
      <div className="pitch-print-only">
        <div className="print-header">
          <div className="print-brand">TagRides · TAG-ALONG LTD</div>
          <div className="print-meta">{pitch.audiences[audience].label} Deck · {pitch.cover.version}</div>
        </div>
      </div>

      {/* Scroll progress bar (hidden in present + print) */}
      <div className="pitch-chrome pointer-events-none fixed top-0 left-0 z-50 h-[2px] w-full bg-foreground/5">
        <motion.div
          className="h-full origin-left bg-primary"
          style={{ scaleX: progress }}
          transition={{ ease: 'linear', duration: 0 }}
        />
      </div>

      {/* Top header (hidden in present + print) */}
      <header className="pitch-chrome sticky top-0 z-40 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8 md:py-4">
          <Link href="/" aria-label="Back to tagrider.com" className="shrink-0 transition hover:opacity-80">
            <Lockup size={28} />
          </Link>

          <div className="hidden h-6 w-px bg-border/50 md:block" />

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
                    active ? 'text-primary-foreground' : 'text-foreground-muted hover:text-foreground',
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
              onClick={() => onPresentToggle?.(true)}
              className="hidden items-center gap-2 rounded-full border border-border/60 px-3 py-2 text-xs font-semibold text-foreground-muted transition hover:border-border hover:text-foreground md:flex md:text-sm"
              aria-label="Enter present mode"
              title="Press P"
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

      {/* Main content — sections snap one-per-viewport in present mode */}
      <main
        id="main-content"
        className={cn(
          'snap-y snap-mandatory md:snap-none',
          presentMode && 'pitch-present-main md:snap-y md:snap-mandatory',
        )}
      >
        {children}
      </main>

      {/* Right-edge section dot-rail. Desktop-only. Hides in present
          mode (the bottom bar covers nav already) and in print. */}
      {!presentMode && (
        <SectionDotRail
          sectionKeys={sectionKeys}
          currentSlide={currentSlide}
          onJump={goToSlide}
        />
      )}

      {/* Present-mode overlay UI */}
      <AnimatePresence>
        {presentMode && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            className="pitch-present-controls pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-end justify-between gap-4 p-4 md:p-6"
          >
            {/* Audience indicator (left) */}
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-elevated/95 px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] text-foreground ring-1 ring-border/40 backdrop-blur md:text-sm">
              <span className="size-2 rounded-full bg-primary" />
              {pitch.audiences[audience].label}
            </div>

            {/* Navigation (center) */}
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-elevated/95 p-1.5 ring-1 ring-border/40 backdrop-blur">
              <button
                type="button"
                onClick={() => goToSlide(currentSlide - 1)}
                disabled={currentSlide === 0}
                className="flex size-9 items-center justify-center rounded-full text-foreground-muted transition hover:bg-foreground/5 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label="Previous slide"
              >
                <ChevronLeft className="size-5" />
              </button>
              <div className="px-3 font-mono text-sm tabular-nums text-foreground">
                {currentSlide + 1} <span className="text-foreground-muted/50">/</span> {totalSlides}
              </div>
              <button
                type="button"
                onClick={() => goToSlide(currentSlide + 1)}
                disabled={currentSlide >= totalSlides - 1}
                className="flex size-9 items-center justify-center rounded-full text-foreground-muted transition hover:bg-foreground/5 hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label="Next slide"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>

            {/* Exit (right) */}
            <button
              type="button"
              onClick={() => onPresentToggle?.(false)}
              className="pointer-events-auto flex items-center gap-2 rounded-full bg-elevated/95 px-4 py-2 text-xs font-semibold text-foreground-muted ring-1 ring-border/40 backdrop-blur transition hover:text-foreground md:text-sm"
              aria-label="Exit present mode (Esc)"
            >
              <Minimize2 className="size-4" />
              <span className="hidden sm:inline">Exit</span>
              <kbd className="hidden rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-[10px] sm:inline">
                Esc
              </kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast for ephemeral status (e.g. print hint) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="pitch-chrome fixed bottom-6 left-1/2 z-50 flex max-w-[90vw] -translate-x-1/2 items-center gap-3 rounded-full bg-elevated/95 px-5 py-3 text-sm font-medium text-foreground shadow-xl ring-1 ring-border/60 backdrop-blur"
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

// Translate a section key (matches pitch.json) into a DOM id for
// scrollIntoView/anchor jumps. The Cover section uses #cover, etc.
// Customer-only sections sometimes alias to non-key ids — keep this
// table in sync with the id={...} attribute on each section component.
function sectionIdFor(key) {
  const aliases = {
    problemPersonal: 'problem',
    howItWorks:      'how',
    pricingFair:     'pricing',
    appCTA:          'app',
  };
  return aliases[key] ?? key;
}

// Short navigator labels per section key. Kept terse so the right-edge
// tooltips read at a glance.
const NAV_LABELS = {
  cover: 'Cover',
  problem: 'Problem',
  problemPersonal: 'Why',
  lagosCost: 'Cost',
  solution: 'Solution',
  product: 'Product',
  market: 'Market',
  model: 'Model',
  gtm: 'GTM',
  competitive: 'Competition',
  traction: 'Traction',
  team: 'Team',
  financials: 'Financials',
  milestones: 'Milestones',
  impact: 'Impact',
  ask: 'Ask',
  howItWorks: 'How',
  modes: 'Modes',
  safety: 'Safety',
  pricingFair: 'Pricing',
  appCTA: 'Join',
};

// Right-edge dot rail. Pure-CSS hover reveals the section label as a
// pill that slides in from the right. The active dot is filled teal +
// scaled; idle dots are border-only and muted. Click anywhere on a dot
// scrolls to that section.
function SectionDotRail({ sectionKeys, currentSlide, onJump }) {
  return (
    <nav
      aria-label="Section navigator"
      className="pitch-chrome pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-2.5">
        {sectionKeys.map((key, i) => {
          const active = i === currentSlide;
          const label = NAV_LABELS[key] ?? key;
          return (
            <li key={key} className="pointer-events-auto group flex items-center gap-3">
              {/* Label pill — slides in from the right on hover */}
              <span
                className={cn(
                  'origin-right rounded-full bg-elevated/95 px-3 py-1 font-mono text-xs font-semibold text-foreground opacity-0 ring-1 ring-border/40 backdrop-blur transition duration-200',
                  'translate-x-2 group-hover:translate-x-0 group-hover:opacity-100',
                  active && 'opacity-100 translate-x-0 text-primary',
                )}
              >
                {label}
              </span>
              <button
                type="button"
                onClick={() => onJump(i)}
                aria-label={`Jump to ${label}`}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'flex size-3 items-center justify-center rounded-full transition-all duration-300',
                  active
                    ? 'bg-primary ring-2 ring-primary/30 ring-offset-2 ring-offset-background scale-110'
                    : 'bg-foreground/20 hover:bg-foreground/60 hover:scale-110',
                )}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
