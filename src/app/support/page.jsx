import Link from 'next/link';
import { ArrowRight, Route, Users, ClipboardCheck, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { BackedBy } from '@/components/sections/BackedBy';
import { BankTransfer } from '@/components/support/BankTransfer';
import { FounderVideo } from '@/components/sections/FounderVideo';
import { support, supportEmail } from '@/data/support';

const title = 'Help put the first TagRides route to work';
const description =
  'Support TagRides’ Lagos pilot preparation through a business contribution, sponsorship, or an introduction to drivers and commuter communities.';

export const metadata = {
  title: `${title} — TagRides`,
  description,
  alternates: { canonical: '/support' },
  openGraph: {
    title,
    description,
    url: '/support',
    type: 'website',
    images: ['/assets/brand/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/assets/brand/og-image.png'],
  },
};

const work = [
  {
    icon: Users,
    title: 'Prepare the people',
    text: 'Driver onboarding and coordination with a commuter community whose journeys already overlap.',
  },
  {
    icon: Route,
    title: 'Make the pickup practical',
    text: 'Field coordination, connectivity and the operating details needed for a focused pilot.',
  },
  {
    icon: ClipboardCheck,
    title: 'Measure what matters',
    text: 'Completed rides, repeat use, complete journey costs and driver net earnings.',
  },
];

export default function SupportPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground-muted">
      <Header />
      <section className="relative isolate overflow-hidden">
        <div className="hero-light absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-14 md:pt-24 md:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            MVP in internal testing · Lagos pilot preparation
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-7xl">
            The app is built.
            <br />
            <span className="text-primary-soft">Help put the first route to work.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed md:text-xl">
            An empty seat. A person heading the same way. Help us turn that connection into a useful
            everyday journey—starting right here in Lagos.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#bank-transfer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Contribute to the work <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#partner"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-foreground transition hover:border-primary"
            >
              Offer a partnership
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm">
            <span>
              <strong className="text-foreground">210</strong> Lagos riders surveyed
            </span>
            <span>
              <strong className="text-foreground">Built MVP</strong> in internal testing
            </span>
            <span>
              <strong className="text-foreground">Yaba area</strong> pilot focus
            </span>
          </div>
        </div>
      </section>

      <section
        id="founder-film"
        aria-labelledby="founder-film-heading"
        className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-16 md:pb-20"
      >
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              The person behind the product
            </p>
            <h2
              id="founder-film-heading"
              className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl"
            >
              Hear the story. Help write what’s next.
            </h2>
          </div>
          <a
            href="#bank-transfer"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary-soft underline underline-offset-4"
          >
            Ready to support? <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
        <FounderVideo />
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <section aria-labelledby="next-step-heading">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              The next useful milestone
            </p>
            <h2
              id="next-step-heading"
              className="mt-4 font-display text-3xl font-bold leading-tight text-foreground"
            >
              One route. People who choose to come back.
            </h2>
            <p className="mt-5 leading-relaxed">
              We’re preparing a small pilot around Yaba with route-aligned drivers and a commuter
              community. The goal is to learn whether riders use it again and drivers find the
              earnings worthwhile. The exact route, dates and partner arrangements are still being
              agreed.
            </p>
            <div className="mt-8 space-y-6">
              {work.map(({ icon: Icon, title: itemTitle, text }) => (
                <div key={itemTitle} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary-soft">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{itemTitle}</h3>
                    <p className="mt-1 text-sm leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={support.articlePath}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-soft underline underline-offset-4"
            >
              Why this matters beyond Lagos <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </section>

          <section
            id="partner"
            aria-labelledby="partner-heading"
            className="mt-12 scroll-mt-28 rounded-3xl border border-border bg-surface/60 p-6 sm:p-8"
          >
            <h2 id="partner-heading" className="font-display text-2xl font-bold">
              Bring more than a transfer.
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              An operator introduction, a commuter group or help with a specific pilot expense can
              move the work forward.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={supportEmail(
                  'Lagos pilot — sponsorship',
                  'Hello Oniya,\n\nI would like to discuss sponsoring a defined part of the Lagos pilot.\n\nOrganisation/name:\nSupport I can offer:\nBest way to reach me:\n',
                )}
                className="inline-flex min-h-12 items-center justify-between gap-3 rounded-xl border border-border px-4 text-sm font-semibold text-foreground transition hover:border-primary"
              >
                Sponsor a pilot expense{' '}
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
              <a
                href={supportEmail(
                  'Lagos pilot — drivers or commuter community',
                  'Hello Oniya,\n\nI can help with a driver/operator introduction or a commuter community.\n\nName/organisation:\nUsual route and travel times:\nHow I can help:\nBest way to reach me:\n',
                )}
                className="inline-flex min-h-12 items-center justify-between gap-3 rounded-xl border border-border px-4 text-sm font-semibold text-foreground transition hover:border-primary"
              >
                Connect drivers or commuters{' '}
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-4 text-xs leading-relaxed">
              These links open your email app. You can also write directly to{' '}
              <a
                href={`mailto:${support.email}`}
                className="break-all text-primary-soft underline underline-offset-4"
              >
                {support.email}
              </a>
              .
            </p>
          </section>
        </div>

        <div>
          <BankTransfer />
          <section
            aria-labelledby="support-details-heading"
            className="mt-7 px-1 text-sm leading-relaxed"
          >
            <h2 id="support-details-heading" className="font-semibold text-foreground">
              What your contribution means
            </h2>
            <p className="mt-3">
              This is business support for TAG-ALONG LTD’s pilot preparation. A contribution does
              not buy shares, a financial return or a ride reservation. It is not a charitable
              tax-deductible donation.
            </p>
            <p className="mt-3">
              For a sponsorship tied to specific deliverables, reporting dates, or conditions if
              plans change, contact us to agree the scope in writing before transferring. You can
              ask the founder about current progress using the email above.
            </p>
            <a
              href={supportEmail('TagRides — investment conversation')}
              className="mt-4 inline-flex items-center gap-2 font-semibold text-primary-soft underline underline-offset-4"
            >
              Interested in investing? Let’s talk{' '}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </section>
        </div>
      </div>

      <BackedBy />
      <Footer />
    </main>
  );
}
