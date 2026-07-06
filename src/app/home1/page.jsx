'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { DriverDiscoveryCarousel } from '@/components/sections/DriverDiscoveryCarousel';
import dynamic from 'next/dynamic';

// Charting is below the fold. Skip on SSR; load after hydrate.
const LagosResearchCarousel = dynamic(
  () => import('@/components/sections/LagosResearchCarousel').then((m) => m.LagosResearchCarousel),
  { ssr: false, loading: () => <div className="h-[500px]" /> },
);
import { AuroraText } from '@/components/magicui/aurora-text';
import { Header } from '@/components/sections/Header';
import { Problem } from '@/components/sections/Problem';
import { StoryLadder } from '@/components/sections/StoryLadder';
import { Solution } from '@/components/sections/Solution';
import { RiderJourney, DriverJourney } from '@/components/sections/Journeys';
import { TwoModes } from '@/components/sections/TwoModes';
import { PricingPhilosophy } from '@/components/sections/PricingPhilosophy';
import { Safety } from '@/components/sections/Safety';
import { VisionNumbers } from '@/components/sections/VisionNumbers';
import { WhyNow } from '@/components/sections/WhyNow';
import { BackedBy } from '@/components/sections/BackedBy';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import brand from '@/data/brand.json';

// Optimized from the Pexels source clip. Keep this local and compressed;
// remote UHD autoplay video was the biggest landing-page performance hit.
const HERO_VIDEO_MP4 = '/assets/video/lagos-traffic-hero.mp4';
const HERO_VIDEO_WEBM = '/assets/video/lagos-traffic-hero.webm';
const HERO_VIDEO_POSTER = '/assets/video/lagos-traffic-hero-poster.jpg';

const Home1 = () => {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground-muted">
      <Header />
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {/* Video backdrop — flowing in from the right behind the carousel */}
        <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full md:w-3/5">
          <video
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            poster={HERO_VIDEO_POSTER}
            className="size-full object-cover opacity-[0.18]"
          >
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
            <source src={HERO_VIDEO_WEBM} type="video/webm" />
          </video>
          {/* Left-to-transparent gradient mask so the video fades into the dark background under the headline */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.85) 35%, rgba(10,10,10,0.4) 65%, rgba(10,10,10,0.85) 100%)',
            }}
          />
        </div>
        <div className="hero-light absolute inset-0 -z-10" aria-hidden="true" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-24 pb-20 md:grid-cols-2 md:gap-20 md:pt-32 md:pb-28">
          {/* Left: copy */}
          <div className="min-w-0 max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted backdrop-blur-sm">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/80" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              {brand.name} · Lagos first · built where routes are already shared
            </p>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-7xl md:leading-[1.02]">
              Turn your everyday route
              <br />
              <AuroraText
                speed={0.8}
                colors={['#008080', '#5F8F8F', '#F59E0B', '#BFE5E5', '#008080']}
              >
                into shared income.
              </AuroraText>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted md:text-xl">
              You are already burning the fuel. Let the empty seats pay their part. Pick up riders
              along your route, agree the fare before pickup, and keep moving. Lagos is the first
              proof market for a model built wherever routes are already shared.
            </p>

            <p className="mt-5 font-display text-sm font-semibold tracking-tight text-accent md:text-base">
              {brand.catchphrase}
            </p>

            {/* CTA pair — driver-first acquisition.
              *
              * Two-sided marketplace: drivers convert *today* — sign
              * up, complete verification, and they're ready when launch
              * traffic arrives. Riders go on the waitlist for activation
              * at launch. One app, role-switch after sign-in, but the
              * conversion split is supply-first / demand-later.
              */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={brand.app.signinDriver}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
              >
                Start driving
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href="#join"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary/40 bg-transparent px-6 text-sm font-semibold text-primary transition hover:bg-primary/10"
              >
                Join the rider waitlist
              </Link>
            </div>

            <div className="mt-6 text-xs uppercase tracking-[0.18em] text-foreground-disabled">
              For daily commuters · private-car owners · verified city drivers
            </div>
          </div>

          {/* Right: driver discovery carousel — capped width so it reads as a contained
              wheel/coverflow instead of sprawling across the viewport. */}
          <DriverDiscoveryCarousel className="mx-auto min-w-0 w-full md:max-w-[440px] md:mx-0 md:ml-auto" />
        </div>
      </section>

      <Problem />
      <Solution />
      <DriverJourney />
      <RiderJourney />
      <PricingPhilosophy />
      <Safety />
      <TwoModes />
      <StoryLadder />
      <LagosResearchCarousel />
      <BackedBy />
      <VisionNumbers />
      <WhyNow />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Home1;
