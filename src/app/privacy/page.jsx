import Link from 'next/link';

import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'Privacy Policy — Tag Rides',
  description:
    'How Tag Along Ltd collects, uses, and protects information about people who use TagRides.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground-muted">
      <Header />
      <section className="mx-auto max-w-3xl px-6 pt-28 pb-16 md:pt-36 md:pb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Privacy</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
          What we collect, why, and what we never do with it.
        </h1>
        <p className="mt-4 text-sm text-foreground-muted">Last updated 2026-06-19.</p>

        <div className="prose-tag mt-12 space-y-10">
          <Block heading="The short version">
            <p>
              Tag Along Ltd operates TagRides. We collect the smallest amount of personal information
              we need to run the product. We never sell it, we never share it for advertising, and
              we delete it when you ask us to.
            </p>
          </Block>

          <Block heading="What we collect">
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Waitlist email.</strong> Stored only to email you
                when TagRides launches in your city.
              </li>
              <li>
                <strong className="text-foreground">Trip-fare research submissions.</strong> Origin,
                destination, fare range, time-of-day, mode, and any notes you add. Used only to
                train the in-app price-suggestion and trip-pattern models.
              </li>
              <li>
                <strong className="text-foreground">Standard server logs.</strong> IP address, user
                agent, request paths. Used for spam and abuse prevention only.
              </li>
            </ul>
          </Block>

          <Block heading="What we don't collect">
            <ul className="ml-5 list-disc space-y-2">
              <li>Real names — we never ask</li>
              <li>Phone numbers — pre-launch, we have no reason to</li>
              <li>Anything from third-party trackers we haven't installed</li>
              <li>Anything we don't have a reason to use right now</li>
            </ul>
          </Block>

          <Block heading="Who sees it">
            <p>
              Internal Tag Along Ltd team only. We store everything in our own MongoDB Atlas
              cluster. We use Vercel for hosting and they get the same anonymised request logs any
              host would. That's it. No advertisers, no data brokers, no resale.
            </p>
          </Block>

          <Block heading="How long we keep it">
            <ul className="ml-5 list-disc space-y-2">
              <li>Waitlist email: until you ask us to remove it, or until 12 months after launch
                (whichever comes first)</li>
              <li>Trip-fare submissions: as long as the AI model needs them; anonymised by default</li>
              <li>Server logs: 90 days, then auto-rotated</li>
            </ul>
          </Block>

          <Block heading="Your rights (and how to use them)">
            <p>
              Email{' '}
              <a
                href="mailto:privacy@tagrider.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                privacy@tagrider.com
              </a>{' '}
              and we'll respond inside 5 business days. You can ask us to:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Show you everything we have about you</li>
              <li>Correct anything that's wrong</li>
              <li>Delete everything (including trip-fare data tied to your IP)</li>
              <li>Stop emailing you</li>
            </ul>
          </Block>

          <Block heading="Children">
            <p>
              TagRides is not designed for under-13s. We don't knowingly collect their information.
              If you believe we have, email{' '}
              <a
                href="mailto:privacy@tagrider.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                privacy@tagrider.com
              </a>{' '}
              and we'll delete it immediately.
            </p>
          </Block>

          <Block heading="If this policy changes">
            <p>
              We'll update the "Last updated" date at the top and, if the change is material, email
              everyone on the waitlist before the new policy takes effect.
            </p>
          </Block>

          <Block heading="The company behind this">
            <p>
              TAG-ALONG LTD, a registered Nigerian limited company, operating in Lagos State. Read
              about us on the{' '}
              <Link href="/about-us" className="text-primary underline-offset-4 hover:underline">
                About page
              </Link>
              .
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
