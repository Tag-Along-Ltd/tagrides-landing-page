import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Logo } from '@/components/brand/Logo';
import { AuroraText } from '@/components/magicui/aurora-text';

export const metadata = {
  title: '404 — Tag Rides',
  description: 'This page took a wrong turn. Let us walk you back to the main road.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground-muted">
      <Header />
      <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden">
        <div className="hero-light absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              404 · Wrong turn
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              This page took a{' '}
              <AuroraText
                speed={0.8}
                colors={['#008080', '#5F8F8F', '#F59E0B', '#BFE5E5', '#008080']}
              >
                wrong turn.
              </AuroraText>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-foreground-muted md:text-lg">
              No driver waiting here. Let&rsquo;s walk you back to a road with one.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
              >
                Back to the main road
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/about-us"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary/60 bg-transparent px-6 text-sm font-semibold text-primary transition hover:bg-primary/10"
              >
                About Tag Rides
              </Link>
            </div>
          </div>
          <div className="relative isolate flex aspect-square items-center justify-center md:justify-self-end">
            <div
              className="pointer-events-none absolute inset-[12%] -z-10 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(0, 128, 128, 0.35) 0%, transparent 65%)',
                filter: 'blur(40px)',
              }}
            />
            <Logo size={220} />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
