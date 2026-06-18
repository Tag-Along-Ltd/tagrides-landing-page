'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { DriverDiscoveryCarousel } from '@/components/sections/DriverDiscoveryCarousel';
import { LagosResearchCarousel } from '@/components/sections/LagosResearchCarousel';
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

// TODO: swap for the real Tag Rides 3D / Lagos street-life clip when it lands.
// Pexels stock — free, no attribution required for commercial use:
const HERO_VIDEO_URL =
  'https://videos.pexels.com/video-files/2103099/2103099-uhd_2560_1440_30fps.mp4';

const Home1 = () => {
  return (
    <main className="min-h-screen bg-background text-foreground-muted">
      <Header />
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {/* Video backdrop — flowing in from the right behind the carousel */}
        <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full md:w-3/5">
          <video
            src={HERO_VIDEO_URL}
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            className="size-full object-cover opacity-[0.18]"
          />
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
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted backdrop-blur-sm">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/80" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              {brand.name} · Lagos pilot · 2026
            </p>

            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-foreground md:text-7xl">
              Tag along.
              <br />
              <AuroraText
                speed={0.8}
                colors={['#008080', '#5F8F8F', '#F59E0B', '#BFE5E5', '#008080']}
              >
                Move together.
              </AuroraText>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted md:text-xl">
              {brand.name} connects you with drivers already heading your way. Agree the fare
              directly. Pay only for your leg of the trip. Move safely across {brand.location.city}{' '}
              for what you would already pay for a danfo.
            </p>

            <p className="mt-5 font-display text-sm font-semibold tracking-tight text-accent md:text-base">
              {brand.catchphrase}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#join"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
              >
                Ride with {brand.name}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#drive"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary/60 bg-transparent px-6 text-sm font-semibold text-primary transition hover:bg-primary/10"
              >
                Drive with {brand.name}
              </Link>
            </div>

            <div className="mt-6 text-xs uppercase tracking-[0.18em] text-foreground-disabled">
              Native apps coming · for now ride from the web
            </div>
          </div>

          {/* Right: driver discovery carousel — capped width so it reads as a contained
              wheel/coverflow instead of sprawling across the viewport. */}
          <DriverDiscoveryCarousel className="mx-auto w-full max-w-[440px] md:mx-0 md:ml-auto" />
        </div>
      </section>

      <Problem />
      <StoryLadder />
      <Solution />
      <RiderJourney />
      <DriverJourney />
      <TwoModes />
      <PricingPhilosophy />
      <Safety />
      <LagosResearchCarousel />
      <VisionNumbers />
      <WhyNow />
      <BackedBy />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Home1;
