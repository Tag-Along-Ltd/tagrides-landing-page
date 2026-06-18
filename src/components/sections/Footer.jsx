'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Lockup } from '@/components/brand/Logo';
import brand from '@/data/brand.json';

// Brand logos rendered as inline SVG glyphs — lucide-react intentionally
// doesn't ship trademark-protected logos, and these stay crisper anyway.
function InstagramLogo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XLogo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2H21.5l-7.69 8.79L23 22h-7.094l-5.56-6.85L4 22H.745l8.226-9.4L1 2h7.25l5.027 6.243L18.244 2Zm-1.244 18h1.737L7.07 4H5.235L17 20Z" />
    </svg>
  );
}

function LinkedinLogo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.5h4v11H3v-11Zm6 0h3.83v1.5h.05a4.2 4.2 0 0 1 3.78-2.07c4.04 0 4.78 2.66 4.78 6.12V20.5h-4v-4.86c0-1.16-.02-2.66-1.62-2.66-1.62 0-1.87 1.27-1.87 2.58v4.94H9v-11Z" />
    </svg>
  );
}

function FacebookLogo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.93.26-1.56 1.6-1.56h1.7V4.27c-.3-.04-1.32-.13-2.5-.13-2.48 0-4.18 1.51-4.18 4.3v2.36H7v3.2h2.62V22h3.88Z" />
    </svg>
  );
}

const SOCIAL = [
  { label: 'Instagram',  href: brand.socials.instagram, Icon: InstagramLogo },
  { label: 'X (Twitter)', href: brand.socials.twitter,  Icon: XLogo },
  { label: 'LinkedIn',    href: brand.socials.linkedin, Icon: LinkedinLogo },
  { label: 'Facebook',    href: brand.socials.facebook, Icon: FacebookLogo },
];

const COLUMNS = [
  {
    title: 'About',
    items: [
      { label: 'Mission',       href: '#vision' },
      { label: 'The team',      href: '/about-us' },
      { label: 'Press',         href: '#press' },
      { label: 'Careers',       href: '#careers' },
    ],
  },
  {
    title: 'Product',
    items: [
      { label: 'How it works',  href: '#rider-journey' },
      { label: 'Safety',        href: '#safety' },
      { label: 'Pricing',       href: '#pricing' },
      { label: 'FAQ',           href: '#faq' },
    ],
  },
  {
    title: 'For Partners',
    items: [
      { label: 'For drivers',   href: '#drive' },
      { label: 'For employers', href: '#employers' },
      { label: 'Investors',     href: 'mailto:investors@tagrides.com' },
      { label: 'Press kit',     href: '#press-kit' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/60 pt-20 pb-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand block */}
          <div>
            <Lockup size={36} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground-muted">
              {brand.catchphrase} Built in {brand.location.city}, for how the city actually moves.
            </p>

            {/* Social icons — circular, line-icon, hover scales + flips accent */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground-muted transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="size-4 transition-transform group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-sm text-foreground transition hover:text-primary"
                    >
                      {item.label}
                      <ArrowUpRight className="size-3 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-foreground-muted md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>
              Operated by{' '}
              <span className="font-medium text-foreground">{brand.company}</span> ·{' '}
              {brand.location.shortAddress}
            </p>
            <p className="text-foreground-disabled">
              © {new Date().getFullYear()} {brand.company}. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="#privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="#terms"   className="hover:text-foreground">Terms</Link>
            <Link href="#cookies" className="hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
