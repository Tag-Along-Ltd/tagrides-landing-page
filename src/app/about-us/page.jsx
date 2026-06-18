'use client';

import {
  ClipboardList,
  HandCoins,
  Wrench,
  Rocket,
  Globe2,
  Ear,
  Compass,
  Scale,
} from 'lucide-react';

import { AuroraText } from '@/components/magicui/aurora-text';
import { EarthGlobe } from '@/components/magicui/earth-globe';
import { Starfield } from '@/components/magicui/starfield';
import { Header } from '@/components/sections/Header';
import { Reveal, RevealStagger, RevealItem } from '@/components/sections/Reveal';
import { InlineVideoShowcase } from '@/components/sections/InlineVideoShowcase';
import { LagosResearchCarousel } from '@/components/sections/LagosResearchCarousel';
import { BackedBy } from '@/components/sections/BackedBy';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import survey from '@/data/lagos-rider-survey.json';
import brand from '@/data/brand.json';

const STORY_BLOCKS = [
  {
    eyebrow: 'Why',
    icon: Compass,
    title: 'Lagos already shares rides.',
    body:
      'From danfo to keke to the friend-of-a-friend driving past your junction, communal travel is how the city has always moved. What it never had was structure — booking, verification, fare records, accountability. Tag Rides starts there.',
  },
  {
    eyebrow: 'How we listened',
    icon: Ear,
    title: `${survey.totalResponses} riders. One brief.`,
    body:
      'Before writing a single line of product code, we surveyed Lagos riders about what they actually use, what it costs them, what they wish was different. 91% told us price was the deciding factor. 70% ride Danfo daily. The brief wrote itself.',
  },
  {
    eyebrow: 'What we’re building',
    icon: Scale,
    title: 'Marginal-zero economics, made into a product.',
    body:
      'Fares default to public-transport price. They often land below, because a driver heading there anyway has near-zero marginal cost on the empty seat. Any positive fare is profit on a seat that would otherwise be empty. That is the principle. The product is the structure around it: verified drivers, two-way ratings, fares logged before pickup, trip-share.',
  },
];

const MILESTONES = [
  { year: '2023', icon: ClipboardList, title: 'Listening',  body: `Surveyed ${survey.totalResponses} Lagos riders. The brief came directly from what they said.` },
  { year: '2024', icon: HandCoins,     title: 'Funded',     body: 'Selected for the Tony Elumelu Foundation grant. The first cheque that took TagRides from idea to plan.' },
  { year: '2025', icon: Wrench,        title: 'Built',      body: 'Product development inside the Google for Startups and Microsoft for Startups (Founders Hub) ecosystems.' },
  { year: '2026', icon: Rocket,        title: 'Launching',  body: `Lagos pilot — the corridor where the model was designed.` },
  { year: 'Next', icon: Globe2,        title: 'Expanding',  body: 'Abuja next. Accra and Nairobi on the roadmap — cities that move the same way.' },
];

const CITIES = [
  { city: 'Lagos',   sub: 'Lagos State, Nigeria',  status: 'Launching first' },
  { city: 'Abuja',   sub: 'FCT, Nigeria',          status: 'Next' },
  { city: 'Accra',   sub: 'Greater Accra, Ghana',  status: 'On the roadmap' },
  { city: 'Nairobi', sub: 'Nairobi County, Kenya', status: 'On the roadmap' },
];

const HERO_VIDEO_THUMB = '/assets/img/banner/1.jpg';
const HERO_VIDEO_URL = 'https://www.youtube.com/embed/qh3NGpYRG3I';

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground-muted">
      <Header />
      {/* HERO — two-column: copy left, Globe right (matches home page composition).
          Starfield video fills the entire hero, then fades into the page bg at the
          bottom so the rest of the page stays clean. */}
      <section className="relative isolate overflow-hidden">
        {/* Starfield backdrop — pure CSS/SVG, covers the entire hero,
            fades into the page at the bottom. */}
        <Starfield className="absolute inset-0 -z-20 size-full" />
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(10,10,10,0.0) 0%, rgba(10,10,10,0.35) 55%, rgba(10,10,10,1) 100%)',
          }}
          aria-hidden="true"
        />
        <div className="hero-light absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-28 pb-20 md:grid-cols-2 md:gap-20 md:pt-36 md:pb-28">
          <Reveal className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted backdrop-blur-sm">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/80" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              About {brand.name}
            </p>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              We built {brand.name} for how {brand.location.city}{' '}
              <AuroraText
                speed={0.8}
                colors={['#008080', '#5F8F8F', '#F59E0B', '#BFE5E5', '#008080']}
              >
                actually moves.
              </AuroraText>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted md:text-xl">
              {brand.name} is a route-shared mobility platform built around what{' '}
              {survey.totalResponses}+ {brand.location.city} riders told us they wanted, designed to
              meet them at public-transport prices and bring real structure to a thing the city was
              already doing informally.
            </p>
            <p className="mt-4 font-display text-sm font-semibold tracking-tight text-accent md:text-base">
              {brand.catchphrase}
            </p>
          </Reveal>

          {/* Earth Globe — real continents as a hex-polygon grid, auto-rotating
              with expansion arcs from Lagos to next-city pins. */}
          <Reveal delay={0.15} className="relative mx-auto w-full max-w-[480px] md:ml-auto">
            <EarthGlobe />
            <p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-foreground-muted">
              Lagos · Abuja · Accra · Nairobi — and the corridors between
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOUNDER NOTE — contrast block, single principled paragraph, signed */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-6 pb-20 md:pb-28">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-primary text-white">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 8% 0%, rgba(255,255,255,0.18) 0, transparent 45%), radial-gradient(circle at 92% 100%, rgba(245,158,11,0.22) 0, transparent 50%)',
                }}
                aria-hidden="true"
              />
              <div className="relative px-8 py-14 md:px-16 md:py-20">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Founding principle
                </p>
                <blockquote className="mt-5 font-display text-2xl font-bold leading-snug tracking-tight md:text-4xl">
                  &ldquo;We didn&rsquo;t invent communal travel in Lagos. The city had been sharing
                  rides for generations before any app existed. What we did was give that natural
                  way of moving the structure it always lacked — booking, verification, fare
                  records, accountability — without taking away the part that makes it work, which
                  is that drivers and riders agree directly.&rdquo;
                </blockquote>
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-white/85">
                  — {brand.company}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Video */}
      <section className="relative bg-surface/40">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">In motion</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              See {brand.name} in motion.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <InlineVideoShowcase
              youtubeSrc={HERO_VIDEO_URL}
              poster={HERO_VIDEO_THUMB}
              duration="0:45"
              label="TagRides demo"
              caption="Auto-plays muted as you scroll past · click for sound · ESC to close"
            />
          </Reveal>
        </div>
      </section>

      {/* THE STORY — 3 richer blocks, each with eyebrow, icon, headline, body */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The story</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              Built in Lagos, for the way Lagos was already moving.
            </h2>
          </Reveal>
          <RevealStagger className="mt-14 grid gap-6 md:grid-cols-3">
            {STORY_BLOCKS.map((block) => {
              const Icon = block.icon;
              return (
                <RevealItem
                  key={block.eyebrow}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-7 transition hover:border-primary/40 hover:bg-elevated"
                >
                  <div className="absolute -right-8 -top-8 size-24 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                    <Icon className="size-4" />
                  </div>
                  <p className="relative mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {block.eyebrow}
                  </p>
                  <h3 className="relative mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
                    {block.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-foreground-muted">
                    {block.body}
                  </p>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* MILESTONES — horizontal-feeling timeline (vertical stack on mobile) */}
      <section className="relative bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Milestones</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              The path from a survey to a launch.
            </h2>
          </Reveal>

          <div className="relative mt-14">
            {/* Connecting spine — horizontal on desktop, vertical on mobile */}
            <div
              className="pointer-events-none absolute left-4 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:hidden"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-0 right-0 top-[28px] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
              aria-hidden="true"
            />

            <RevealStagger className="grid gap-6 md:grid-cols-5 md:gap-4">
              {MILESTONES.map((m, i) => {
                const Icon = m.icon;
                const isPrimary = i === 1 || i === 3; // accent the grant + the launch
                return (
                  <RevealItem key={m.year} className="relative">
                    <div className="flex items-start gap-4 md:flex-col md:items-center md:text-center">
                      <div
                        className={`relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-xs font-semibold tracking-[0.1em] ${
                          isPrimary
                            ? 'border-primary/60 text-primary shadow-[0_0_0_6px_rgba(10,10,10,1)]'
                            : 'border-border text-foreground-muted shadow-[0_0_0_6px_rgba(10,10,10,1)]'
                        }`}
                      >
                        <Icon className="size-5" />
                      </div>
                      <div className="md:mt-5">
                        <p
                          className={`font-mono text-xs font-semibold uppercase tracking-[0.18em] ${
                            isPrimary ? 'text-primary' : 'text-foreground-muted'
                          }`}
                        >
                          {m.year}
                        </p>
                        <p className="mt-1 font-display text-base font-semibold tracking-tight text-foreground">
                          {m.title}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-foreground-muted">
                          {m.body}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Three priorities — the survey */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              What riders told us
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              Three priorities, ranked by 200+ riders.
            </h2>
          </Reveal>
          <RevealStagger className="mt-12 grid gap-5 md:grid-cols-3">
            {survey.demandFactors.slice(0, 3).map((factor, i) => (
              <RevealItem
                key={factor.label}
                className="relative overflow-hidden rounded-3xl border border-border bg-elevated p-7"
              >
                <div className="absolute -right-6 -top-6 size-28 rounded-full bg-primary/12 blur-2xl" />
                <p className="relative font-mono text-xs text-foreground-muted">#{i + 1}</p>
                <p className="relative mt-2 font-mono text-5xl font-semibold tracking-tighter text-primary md:text-6xl">
                  {factor.percent}%
                </p>
                <p className="relative mt-3 text-sm font-medium text-foreground">
                  named {factor.label.toLowerCase()} as a top priority
                </p>
                <p className="relative mt-1 text-xs text-foreground-muted">
                  {factor.count} of {survey.totalResponses} riders
                </p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Research carousel — full 3D charts */}
      <LagosResearchCarousel />

      {/* City roadmap */}
      <section className="relative bg-surface/40">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Where we&rsquo;re headed
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              Lagos first. Then the cities that move the same way.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted md:text-lg">
              Lagos came first because Lagos taught us how. We expand into cities where the
              rider-and-driver experience is shaped by the same informal-transit DNA.
            </p>
          </Reveal>
          <RevealStagger className="mt-12 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-background/40">
            {CITIES.map((city) => (
              <RevealItem
                key={city.city}
                className="flex items-center justify-between px-6 py-5 transition hover:bg-elevated"
              >
                <div>
                  <p className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {city.city}
                  </p>
                  <p className="text-xs text-foreground-muted">{city.sub}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {city.status}
                </span>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <BackedBy />
      <FinalCTA />
      <Footer />
    </main>
  );
}
