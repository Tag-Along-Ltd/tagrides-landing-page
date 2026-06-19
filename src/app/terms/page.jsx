import Link from 'next/link';

import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'Terms of Service — Tag Rides',
  description:
    'The plain-language agreement between Tag Along Ltd and people who use TagRides.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground-muted">
      <Header />
      <section className="mx-auto max-w-3xl px-6 pt-28 pb-16 md:pt-36 md:pb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Terms</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Plain language. Honest agreement.
        </h1>
        <p className="mt-4 text-sm text-foreground-muted">Last updated 2026-06-19.</p>

        <div className="mt-12 space-y-10">
          <Block heading="Who's behind this">
            <p>
              TagRides is a product of <strong className="text-foreground">TAG-ALONG LTD</strong>, a
              registered Nigerian limited company. When this page says "we" or "us," it means
              TAG-ALONG LTD. When it says "you," it means anyone who uses this website or the
              TagRides app once it ships.
            </p>
          </Block>

          <Block heading="What this site is right now">
            <p>
              Pre-launch marketing and waitlist. The TagRides app is not yet available. The route
              data and waitlist sign-ups you submit here help us build it; they are not bookings,
              not rides, not commitments to ride.
            </p>
          </Block>

          <Block heading="Using this site">
            <p>You agree to:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Not submit fake routes, repeated junk, or bot traffic</li>
              <li>Not attempt to compromise our servers, exfiltrate data, or interfere with other users</li>
              <li>Not claim to represent Tag Along Ltd or its founders without permission</li>
              <li>Be honest about whether you live in or know Lagos when contributing trip data</li>
            </ul>
            <p>
              We reserve the right to remove or block any account or submission that violates the
              above without notice.
            </p>
          </Block>

          <Block heading="Our content">
            <p>
              Everything on this site — copy, design, brand mark, charts, code — is owned by
              TAG-ALONG LTD unless explicitly licensed. The brand kit at{' '}
              <Link
                href="/brand"
                className="text-primary underline-offset-4 hover:underline"
              >
                /brand
              </Link>{' '}
              is provided for press, partners, and contractors to use Tag Rides assets accurately;
              it is not a transfer of ownership.
            </p>
          </Block>

          <Block heading="Your content">
            <p>
              When you submit a trip-fare entry, you grant Tag Along Ltd a non-exclusive,
              royalty-free licence to use that data to train and improve TagRides' price-suggestion
              and trip-pattern models. We do not republish your individual submission. We do not
              claim ownership of the route or fare information itself — only the right to use it
              internally.
            </p>
            <p>
              If you ask us to delete your submission ({' '}
              <a
                href="mailto:privacy@tagrides.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                privacy@tagrides.com
              </a>
              ), we will and we'll exclude that data from future model training.
            </p>
          </Block>

          <Block heading="No warranty, no liability for content">
            <p>
              The forecasts, statistics, and copy on this site reflect our current best
              understanding. We try to be accurate but we don't warrant it. Don't make important
              financial or travel decisions based solely on what you read here.
            </p>
            <p>
              To the maximum extent permitted by Nigerian law, Tag Along Ltd is not liable for
              indirect, consequential, or incidental loss arising from your use of this website.
            </p>
          </Block>

          <Block heading="When the app launches">
            <p>
              Separate, longer Terms of Service will govern the TagRides app — covering rides,
              fares, payments, driver onboarding, safety obligations, and dispute resolution. Those
              terms will be presented at sign-up and will supersede the in-app sections of these
              terms.
            </p>
          </Block>

          <Block heading="If these terms change">
            <p>
              We update the "Last updated" date and, for material changes, email the waitlist
              before the new version takes effect.
            </p>
          </Block>

          <Block heading="Governing law">
            <p>
              These terms are governed by the laws of the Federal Republic of Nigeria. Disputes
              that can't be resolved by email go to the courts of Lagos State.
            </p>
          </Block>

          <Block heading="Contact">
            <p>
              <a
                href="mailto:hello@tagrides.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                hello@tagrides.com
              </a>
              {' '}for anything that isn't urgent.{' '}
              <a
                href="mailto:legal@tagrides.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                legal@tagrides.com
              </a>
              {' '}for anything that is.
            </p>
          </Block>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Block({ heading, children }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
        {heading}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground-muted md:text-base">
        {children}
      </div>
    </section>
  );
}
