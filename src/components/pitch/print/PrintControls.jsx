'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Printer } from 'lucide-react';

export function PrintControls({ audience, auto }) {
  const router = useRouter();

  useEffect(() => {
    if (!auto) return;

    let cancelled = false;
    const images = Array.from(document.images);
    const imagesReady = Promise.all(
      images.map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        });
      }),
    );

    Promise.all([document.fonts.ready, imagesReady]).then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) window.print();
        });
      });
    });

    return () => {
      cancelled = true;
    };
  }, [auto]);

  return (
    <header className="pitch-screen-only sticky top-0 z-10 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => router.push(`/pitch?audience=${audience}`)}
          className="flex items-center gap-2 text-sm text-foreground-muted transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to deck
        </button>
        <div className="hidden font-mono text-xs tracking-[0.16em] text-foreground-muted uppercase sm:block">
          Print preview · {audience}
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover sm:px-5"
        >
          <Printer className="size-4" />
          Print / Save as PDF
        </button>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-3 text-xs text-foreground-muted/70 sm:px-6">
        Use your browser's print dialog · <strong>Layout: Landscape</strong> ·{' '}
        <strong>Margins: Default</strong> · <strong>Background graphics: ON</strong>
      </div>
    </header>
  );
}
