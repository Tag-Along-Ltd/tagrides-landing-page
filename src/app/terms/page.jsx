import Link from 'next/link';

import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'Terms of Service - TagRides',
  description:
    'The terms that apply when you use the TagRides website, rider services, driver services, and wallet features.',
};

export default function TermsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground-muted">
      <Header />
      <section className="mx-auto max-w-3xl px-6 pt-28 pb-16 md:pt-36 md:pb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Terms</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
          The agreement for using TagRides.
        </h1>
        <p className="mt-4 text-sm text-foreground-muted">Effective and last updated 2026-07-19.</p>

        <div className="mt-12 space-y-10">
          <Block heading="Who we are and what these terms cover">
            <p>
              TagRides is operated by <strong className="text-foreground">TAG-ALONG LTD</strong> in
              Nigeria. These terms apply to the TagRides website and to rider, driver, trip, wallet,
              and related services we make available. Our{' '}
              <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                Privacy Policy
              </Link>{' '}
              explains how we handle personal data.
            </p>
            <p>
              Some services may be in pilot, limited to a region, awaiting operational approval, or
              disabled in the app. A description in these terms does not promise that a feature is
              available to every user.
            </p>
          </Block>

          <Block heading="Accepting these terms and eligibility">
            <p>
              By creating an account, using the app, requesting or providing a ride, funding a
              wallet, or using this website, you agree to these terms. Account holders must be at
              least 18 and legally able to enter this agreement. Students who are 18 or older may
              register and ride. TagRides does not currently support an under-18 rider account or a
              guardian-booked minor ride. Drivers must also hold all licences, documents, insurance,
              and approvals required for the vehicle and service they provide.
            </p>
            <p>
              You must provide accurate information, keep your credentials and one-time codes
              secure, and promptly update information that changes. You are responsible for activity
              carried out through your account unless you have reported unauthorised use.
            </p>
          </Block>

          <Block heading="How the platform works">
            <p>
              TagRides provides technology for route sharing, matching, trip coordination, pricing,
              and payment records. Drivers decide whether to make a trip and whether to accept a
              rider or offer. A displayed request, offer, or button press is not confirmed until the
              platform records and communicates authoritative acceptance. Connectivity delays can
              cause an offer or trip state to arrive late, be rejected, or require a retry.
            </p>
            <p>
              Riders and drivers must confirm the correct person, vehicle, pickup, destination,
              seats, and price before travel. Drivers remain responsible for lawful and safe
              operation of their vehicles. Riders remain responsible for their conduct and for
              following reasonable safety instructions.
            </p>
          </Block>

          <Block heading="Location, maps, routes, and estimates">
            <p>
              Location access may be required for nearby rides, matching, pickup and arrival
              detection, live trip progress, route completion, and safety signals. During matching
              and active trips, a rider may see the selected driver's live or recent location.
            </p>
            <p>
              Vehicle markers may be delayed, cached, smoothed, filtered, or snapped to a mapped
              route and may not show the vehicle's exact physical position. Routes, stop markers,
              distance, traffic, arrival status, and ETA are estimates that depend on device GPS,
              connectivity, and third-party map data. Do not rely on the app as an emergency,
              navigation, or personal-safety guarantee. Contact local emergency services where
              necessary.
            </p>
          </Block>

          <Block heading="Pickup contact and respectful use">
            <p>
              For pickup coordination, an eligible selected driver may be allowed to reveal and call
              the rider's account phone number after arrival and before boarding. The call is made
              through the device's phone app and telephone network, not through an anonymous
              TagRides relay. Normal caller ID and call-history behaviour may therefore expose or
              retain both numbers.
            </p>
            <p>
              A phone number obtained through TagRides may be used only for that pickup. You must
              not retain it for unrelated use, contact someone after the trip without permission,
              harass them, market to them, publish it, sell it, or use it to move transactions off
              platform. Drivers must not request, photograph, or retain a rider's identity document
              unless TagRides has introduced and clearly communicated a lawful verification process
              that requires it.
            </p>
          </Block>

          <Block heading="Fares, offers, wallet holds, and settlement">
            <p>
              Suggested prices and driver or rider offers are estimates until accepted and recorded
              by the service. For wallet rides, we may place a hold before the trip, capture the
              final server-calculated fare at completion, and release unused held funds. Records may
              separately identify fare, platform fee, driver earnings, holds, releases, refunds, and
              settlement status. Cash payments are not independently verified by TagRides.
            </p>
            <p>
              You authorise us and our payment provider to process the transactions you initiate and
              to correct duplicate, failed, reversed, or incorrectly recorded entries. If a payment
              outcome is uncertain, funds may remain held while we verify it with the payment
              provider.
            </p>
          </Block>

          <Block heading="Refunds and driver payouts">
            <p>
              Refunds are subject to the original payment, available refundable amount, operational
              review, and payment-provider processing. A wallet adjustment may occur before the
              external refund settles. Definitively failed refunds are restored; an uncertain result
              may remain pending during reconciliation.
            </p>
            <p>
              Driver payouts, when enabled, may depend on identity and bank verification, settled
              earnings, minimum and maximum amounts, frequency or value limits, a bank-change
              cooling period, fees, and provider or receiving-bank availability. A payout can remain
              pending while its result is verified, and a failed or reversed transfer may be
              returned to pending earnings.
            </p>
            <p>
              <strong className="text-foreground">Current Nigeria availability:</strong> new and
              scheduled driver payouts are disabled. No payout weekday, time, timezone, or
              bank-change cooling duration is currently configured. The app does not currently offer
              a driver withdrawal control. We will communicate applicable limits and fees before
              enabling withdrawals.
            </p>
          </Block>

          <Block heading="Driver verification">
            <p>
              We may review identity, driver's licence, vehicle registration, roadworthiness,
              insurance, bank-account, and other required information. We may restrict driving,
              matching, or payout access while information is missing, expired, inconsistent,
              rejected, or under review. Verification reduces risk but is not a guarantee of any
              person's identity, conduct, skill, vehicle condition, or future compliance.
            </p>
          </Block>

          <Block heading="Prohibited conduct">
            <p>You must not:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                submit false identity, trip, bank, vehicle, document, route, or fare information;
              </li>
              <li>
                misuse another person's location, contact details, image, or trip information;
              </li>
              <li>circumvent fares, wallet controls, verification, capacity, or safety rules;</li>
              <li>harass, threaten, discriminate against, exploit, or endanger another person;</li>
              <li>
                use bots, scrape private data, reverse engineer security controls, or disrupt the
                service;
              </li>
              <li>
                use TagRides for unlawful transport, fraud, money laundering, or other illegal
                activity.
              </li>
            </ul>
          </Block>

          <Block heading="Suspension, cancellation, and service changes">
            <p>
              We may restrict or suspend an account or feature where reasonably necessary for
              safety, fraud prevention, legal compliance, investigation, non-payment, document
              review, or breach of these terms. We may change, pause, or discontinue features,
              subject to applicable law and any outstanding transaction obligations.
            </p>
          </Block>

          <Block heading="Website submissions and intellectual property">
            <p>
              The TagRides name, software, design, copy, and brand assets belong to TAG-ALONG LTD or
              its licensors. When you submit trip-fare research, you grant us a non-exclusive,
              royalty-free licence to analyse it and use it to improve pricing and trip-pattern
              models. You retain any rights you have in your submission and may request deletion,
              subject to legal retention requirements, at{' '}
              <a
                href="mailto:privacy@tagrider.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                privacy@tagrider.com
              </a>
              .
            </p>
          </Block>

          <Block heading="Availability, warranties, and liability">
            <p>
              We work to keep TagRides accurate and available, but the service can be interrupted or
              contain errors. To the extent permitted by law, we do not guarantee uninterrupted
              matching, a particular driver or rider, route accuracy, ETA, earnings, payout timing,
              or the conduct of another user or third-party provider.
            </p>
            <p>
              Nothing in these terms excludes rights or remedies that cannot lawfully be excluded,
              including applicable consumer-protection rights. To the maximum extent permitted by
              Nigerian law, we are not responsible for indirect, incidental, special, or
              consequential loss arising from use of the service.
            </p>
          </Block>

          <Block heading="Changes to these terms">
            <p>
              We will update the effective date when these terms change. For a material change, we
              will provide reasonable notice through the app, website, or account contact details
              before it takes effect where required. Continued use after the effective date means
              you accept the revised terms.
            </p>
          </Block>

          <Block heading="Governing law and disputes">
            <p>
              Nigerian law governs these terms. Please contact us first so we can try to resolve a
              complaint. If it cannot be resolved informally, either party may use any court or
              regulator with jurisdiction, and you retain any mandatory consumer rights available
              under Nigerian law.
            </p>
          </Block>

          <Block heading="Contact">
            <p>
              Contact{' '}
              <a
                href="mailto:hello@tagrider.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                hello@tagrider.com
              </a>{' '}
              for service questions,{' '}
              <a
                href="mailto:legal@tagrider.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                legal@tagrider.com
              </a>{' '}
              for legal notices, or{' '}
              <a
                href="mailto:privacy@tagrider.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                privacy@tagrider.com
              </a>{' '}
              for personal-data requests.
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
