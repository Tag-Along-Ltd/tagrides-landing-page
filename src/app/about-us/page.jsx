import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog';
import { WaitlistForm } from '@/components/sections/WaitlistForm';
import survey from '@/data/lagos-rider-survey.json';
import brand from '@/data/brand.json';

export const metadata = {
  title: 'About — Tag Rides',
  description:
    'Tag Rides is the ride-hailing platform built in Lagos, for how Lagos actually moves.',
};

const TOP_FACTORS = survey.demandFactors.slice(0, 3);

const REACH = [
  { city: 'Lagos', state: 'Lagos State, Nigeria', status: 'Launching first' },
  { city: 'Abuja', state: 'FCT, Nigeria', status: 'Next' },
  { city: 'Accra', state: 'Greater Accra, Ghana', status: 'On the roadmap' },
  { city: 'Nairobi', state: 'Nairobi County, Kenya', status: 'On the roadmap' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Page header */}
      <section className="mx-auto max-w-5xl px-6 pt-28 pb-16 md:pt-40">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          About {brand.name}
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          Built in Lagos, for how Lagos actually moves.
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-lg text-neutral-300 md:text-xl">
          {brand.name} is the ride-hailing platform Tag Along Ltd is building from the ground up
          for the African market. We surveyed {survey.totalResponses} Lagos riders before we wrote
          a line of code. Everything you see is shaped by what they told us.
        </p>
      </section>

      {/* Video */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <HeroVideoDialog
          className="mx-auto block max-w-4xl"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I"
          thumbnailSrc="/assets/img/banner/1.jpg"
          thumbnailAlt="Tag Rides in motion"
        />
      </section>

      {/* The story */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          The story
        </h2>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-neutral-300">
          <p>
            Lagos doesn&rsquo;t have a transportation problem. It has a transportation paradox: the
            most mobile city in West Africa, served by services that were never built for it. The
            global players treat Lagos like an outpost. The local options, from danfos to
            roadside hails, were built for a city half its current size.
          </p>
          <p>
            We started by listening. {survey.totalResponses} riders &mdash; students, traders,
            engineers, mothers, business owners &mdash; told us what they actually want when they
            pick a ride. Pricing came first. Then convenience. Then safety. The list wasn&rsquo;t
            surprising. What was surprising was how little of it the current options reliably
            deliver.
          </p>
          <p>
            {brand.name} is what happens when you take that brief seriously. Lower fares,
            tighter pickup times, vetted drivers, and an app that respects the way Lagos moves.
            Launching in {brand.location.city}, then the rest of the continent.
          </p>
        </div>
      </section>

      {/* What riders told us */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            What Lagos riders told us
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Three priorities, ranked by 200+ riders.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TOP_FACTORS.map((factor, i) => (
            <div
              key={factor.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition hover:border-primary/40"
            >
              <div className="text-sm font-medium text-neutral-400">#{i + 1}</div>
              <div className="mt-2 text-5xl font-semibold tracking-tight text-primary">
                {factor.percent}%
              </div>
              <div className="mt-1 text-sm text-neutral-500">
                of riders ranked it among their top priorities
              </div>
              <div className="mt-6 text-lg font-medium">{factor.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Where we're headed */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Where we&rsquo;re headed.
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-400">
          Lagos comes first. Once the rider and driver experience is dialed in, we expand into the
          cities where we&rsquo;ve seen the same gap.
        </p>
        <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {REACH.map((stop) => (
            <li
              key={stop.city}
              className="flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:justify-between"
            >
              <div>
                <span className="text-xl font-medium">{stop.city}</span>
                <span className="ml-3 text-sm text-neutral-500">{stop.state}</span>
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.15em] text-primary">
                {stop.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-32 text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          Want first access?
        </h2>
        <p className="mt-4 text-neutral-400">
          Join the waitlist and you&rsquo;ll be the first to ride when we launch in {brand.location.city}.
        </p>
        <WaitlistForm className="mt-8" />
      </section>
    </main>
  );
}
