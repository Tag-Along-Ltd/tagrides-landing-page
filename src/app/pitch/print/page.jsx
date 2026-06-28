'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Printer } from 'lucide-react';

import { PrintDeck } from '@/components/pitch/print/PrintDeck';

function PrintPageInner() {
  const search = useSearchParams();
  const router = useRouter();
  const audience = search.get('audience') ?? 'investor';
  const auto = search.get('auto') === '1';

  // Auto-trigger print if ?auto=1 (the Download button on /pitch uses
  // this so the user goes straight to the save-as-PDF dialog).
  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => window.print(), 600);
    return () => clearTimeout(t);
  }, [auto]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* On-screen chrome — hidden in print via .pitch-screen-only */}
      <header className="pitch-screen-only sticky top-0 z-10 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <button
            type="button"
            onClick={() => router.push(`/pitch?audience=${audience}`)}
            className="flex items-center gap-2 text-sm text-foreground-muted transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to deck
          </button>
          <div className="font-mono text-xs tracking-[0.16em] text-foreground-muted uppercase">
            Print preview · {audience}
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            <Printer className="size-4" />
            Print / Save as PDF
          </button>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-3 text-xs text-foreground-muted/70">
          Use your browser's print dialog · <strong>Layout: Landscape</strong> · <strong>Margins: Default</strong> · <strong>Background graphics: ON</strong>
        </div>
      </header>

      {/* Slides — on screen, scaled to fit; in print, full A4 landscape */}
      <main className="pitch-print-stage">
        <PrintDeck audience={audience} />
      </main>
    </div>
  );
}

export default function PitchPrintPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <PrintPageInner />
    </Suspense>
  );
}
