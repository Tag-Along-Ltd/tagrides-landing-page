'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Lockup } from '@/components/brand/Logo';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'How it works', href: '/#rider-journey' },
  { label: 'Safety',       href: '/#safety' },
  { label: 'Field notes',  href: '/blog' },
  { label: 'About',        href: '/about-us' },
];

// Floating, translucent header — sits over every page hero without
// occluding the content. Backdrop blur so headlines + globe still read
// through. Sticky so the brand stays anchored as you scroll.
export function Header({ className }) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-border/40 bg-background/60 backdrop-blur-md',
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5">
        <Link href="/" aria-label="Tag Rides — home" className="transition hover:opacity-80">
          <Lockup size={32} />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-foreground-muted md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#join"
          className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground transition hover:bg-primary-hover"
        >
          Ride
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </header>
  );
}
