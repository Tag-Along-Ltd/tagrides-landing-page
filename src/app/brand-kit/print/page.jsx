'use client';

import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { ArrowLeft, Printer } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { BrandKitDeck } from '@/components/brand-kit/BrandKitDeck';
import { brandSlides } from '@/data/brandKit';

function BrandKitPrintPageInner() {
  const search = useSearchParams();
  const requestedSlide = search.get('slide');
  const slideKey = brandSlides.includes(requestedSlide) ? requestedSlide : undefined;

  useEffect(() => {
    if (search.get('auto') !== '1') return undefined;
    const timer = setTimeout(() => window.print(), 800);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="brand-print-page">
      <header className="brand-print-toolbar">
        <Link href="/brand-kit">
          <ArrowLeft size={16} /> Back to brand kit
        </Link>
        <span>
          {slideKey ? `Single slide · ${slideKey}` : 'Full deck'} · Landscape A4 · Background
          graphics ON
        </span>
        <button type="button" onClick={() => window.print()}>
          <Printer size={16} /> Print / Save PDF
        </button>
      </header>
      <BrandKitDeck print slideKey={slideKey} />
    </div>
  );
}

export default function BrandKitPrintPage() {
  return (
    <Suspense fallback={<div className="brand-print-page" />}>
      <BrandKitPrintPageInner />
    </Suspense>
  );
}
