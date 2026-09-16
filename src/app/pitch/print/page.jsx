'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { PrintDeck } from '@/components/pitch/print/PrintDeck';
import { PrintControls } from '@/components/pitch/print/PrintControls';
import pitch from '@/data/pitch.json';

function PitchPrintPageInner() {
  const search = useSearchParams();
  const requestedAudience = search.get('audience') ?? 'investor';
  const audience = pitch.audiences[requestedAudience] ? requestedAudience : 'investor';
  const auto = search.get('auto') === '1';

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <PrintControls audience={audience} auto={auto} />

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
      <PitchPrintPageInner />
    </Suspense>
  );
}
