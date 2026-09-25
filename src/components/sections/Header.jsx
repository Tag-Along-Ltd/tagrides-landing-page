'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

import { Lockup } from '@/components/brand/Logo';
import brand from '@/data/brand.json';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Safety', href: '/#safety' },
  { label: 'About', href: '/about-us' },
  { label: 'Articles', href: '/blog' },
  { label: 'Help', href: '/help' },
  { label: 'Support', href: '/support' },
];

// Floating, translucent header — sits over every page hero without
// occluding the content. Backdrop blur so headlines + globe still read
// through. Sticky so the brand stays anchored as you scroll.
export function Header({ className }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-border/40 bg-background/60 backdrop-blur-md',
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
        <Link href="/" aria-label="TagRides home" className="transition hover:opacity-80">
          <Lockup size={28} />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 text-sm font-medium text-foreground-muted lg:flex"
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Sticky CTA is driver-first — supply-side acquisition is the
         * pre-launch priority. Riders find the waitlist via the hero +
         * the FinalCTA section.
         */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            className="min-h-11 rounded-full border border-border px-3 text-xs font-semibold text-foreground lg:hidden"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
          <a
            href={brand.app.signinDriver}
            className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            <span className="sm:hidden">Drivers</span>
            <span className="hidden sm:inline">Pilot drivers</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-border bg-background px-6 py-4 lg:hidden"
          onKeyDown={(event) => {
            if (event.key === 'Escape') setMenuOpen(false);
          }}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
