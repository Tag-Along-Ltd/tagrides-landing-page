'use client';

import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';

export function TemplateToolbar({ group, size }) {
  return (
    <header className="brand-template-toolbar">
      <Link href={`/brand-kit#${group === 'applications' ? 'applications' : 'documents'}`}>
        <ArrowLeft size={16} /> Brand kit
      </Link>
      <span>{size} · Print at 100% scale · Background graphics ON</span>
      <button type="button" onClick={() => window.print()}>
        <Printer size={16} /> Print / Save PDF
      </button>
    </header>
  );
}
