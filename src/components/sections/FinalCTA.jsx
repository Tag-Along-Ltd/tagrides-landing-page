'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Reveal } from './Reveal';
import brand from '@/data/brand.json';

export function FinalCTA() {
  return (
    <section id="join" className="relative overflow-hidden bg-primary text-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 0% 100%, rgba(245,158,11,0.25) 0, transparent 45%), radial-gradient(circle at 100% 0%, rgba(255,255,255,0.18) 0, transparent 50%)',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
        <Reveal>
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            Ready to move smarter?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Whether you&rsquo;re catching a ride or offering one, you&rsquo;re part of how Lagos
            moves.
          </p>
          <p className="mt-3 font-display text-sm font-semibold tracking-tight text-accent md:text-base">
            {brand.catchphrase}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#ride"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-primary transition hover:bg-accent hover:text-accent-foreground"
            >
              Ride with {brand.name}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#drive"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/70 bg-transparent px-7 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Drive with {brand.name}
            </Link>
            <Link
              href="mailto:hello@tagrides.com"
              className="inline-flex h-12 items-center gap-2 px-2 text-sm font-medium text-white/85 underline-offset-4 transition hover:text-white hover:underline"
            >
              Talk to us
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
