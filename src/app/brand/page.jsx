'use client';

import {
  MarkStronger,
  MarkRoute,
  MarkTag,
  Wordmark,
  AppIconMock,
  BusinessCardMock,
  ShirtMock,
  AvatarMock,
} from '@/components/brand/LogoConcepts';
import { Header } from '@/components/sections/Header';
import { Reveal } from '@/components/sections/Reveal';
import { Footer } from '@/components/sections/Footer';
import brand from '@/data/brand.json';

const CONCEPTS = [
  {
    id: 'stronger',
    Mark: MarkStronger,
    name: 'Stronger Together',
    tagline: 'Two rings, one shared journey.',
    why: [
      'Two interlocking rings, teal + amber. The intersection is the brand: the moment a driver and a rider share a path.',
      'Mathematically pure (perfect circles), works infinitely from favicon to billboard. The secondary colour is *in* the mark itself, not borrowed from decoration.',
      'Carries the original "stronger together" thesis — refined from the literal chainlink into a geometry-first form that still reads "linked." No bumps, no rust.',
    ],
    accent: false,
  },
  {
    id: 'route',
    Mark: MarkRoute,
    name: 'The Route',
    tagline: 'The mark is the product.',
    why: [
      'A driver leaving point A, three riders tagging along at points along the way, an amber destination. The product story is encoded in the mark — no abstraction needed.',
      'Wide aspect ratio: works perfectly inline with the wordmark, less ideal as a square favicon (but the origin dot can stand alone).',
      'Reads as "rideshare" instantly to anyone who has used any ride-hail app. The amber endpoint signals "destination reached together" — a small narrative built in.',
    ],
    accent: false,
  },
  {
    id: 'tag',
    Mark: MarkTag,
    name: 'The Tag',
    tagline: 'A pin, three riders, here.',
    why: [
      'The literal map pin — universal ride-share visual — with three riders inside, one of them amber.',
      'Square-ish aspect ratio means it lives naturally as an app icon, a favicon, a sticker. Abstractable: the pin shape can carry the brand alone, even without the dots, once the mark is established.',
      'Most direct and recognisable of the three. Lowest risk for a brand-new audience to immediately understand "ride-share."',
    ],
    accent: true,
  },
];

export default function BrandPage() {
  return (
    <main className="min-h-screen bg-background text-foreground-muted">
      <Header />
      {/* Page header */}
      <section className="relative">
        <div className="hero-light absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto max-w-5xl px-6 pt-28 pb-16 md:pt-36 md:pb-20">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground-muted backdrop-blur-sm">
              Brand exploration · Round 01
            </p>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Three directions for the {brand.name} mark.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted md:text-lg">
              The original chain-link concept carried the right thesis (stronger together) but the
              execution wasn&rsquo;t principled enough — bumps, arbitrary curves, the wordmark
              detached from the mark. Three replacements below, each principled from a single
              clear idea, each shown in four real contexts so you can judge which lives best at
              every scale.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Concepts */}
      {CONCEPTS.map((concept, idx) => {
        const Mark = concept.Mark;
        return (
          <section
            key={concept.id}
            className={`relative ${idx % 2 === 1 ? 'bg-surface/40' : ''}`}
          >
            <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
              {/* Header strip */}
              <Reveal>
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      Concept 0{idx + 1}
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                      {concept.name}
                    </h2>
                    <p className="mt-2 max-w-xl text-base text-foreground-muted">
                      {concept.tagline}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Hero card: large mark + wordmark */}
              <Reveal delay={0.1} className="mt-10">
                <div className="rounded-3xl border border-border bg-elevated p-10 md:p-16">
                  <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-14">
                    <Mark size={140} />
                    <Wordmark accent={concept.accent} className="text-4xl md:text-6xl" />
                  </div>
                </div>
              </Reveal>

              {/* Why this concept */}
              <Reveal delay={0.15} className="mt-10 grid gap-8 md:grid-cols-3">
                {concept.why.map((line, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-surface p-6"
                  >
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      Why · {i + 1}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{line}</p>
                  </div>
                ))}
              </Reveal>

              {/* Application mockups */}
              <Reveal delay={0.2} className="mt-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                  Lives as
                </p>
                <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
                  <AppIconMock MarkComp={Mark} />
                  <AvatarMock MarkComp={Mark} />
                  <BusinessCardMock MarkComp={Mark} accent={concept.accent} />
                  <ShirtMock MarkComp={Mark} />
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* Decision strip */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <Reveal>
            <div className="rounded-3xl border border-primary/30 bg-elevated p-10 text-center md:p-16">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Pick one
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Which direction wins?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-foreground-muted">
                Tell me which concept lands. The winner gets expanded into a full brand identity:
                colour system, typography scale, logo lockups (horizontal / stacked / mono /
                reverse), favicon set, social headers, business cards, T-shirt and hoodie merch
                mockups, wristband, and brand voice guidelines.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
