import Link from 'next/link';

import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'Privacy Policy — TagRides',
  description:
    'How Tag Along Ltd collects, uses, and protects information about people who use TagRides — riders, drivers, and everyone in between.',
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
        <p className="mt-4 text-sm text-foreground-muted">Last updated 2026-07-01.</p>

        <div className="prose-tag mt-12 space-y-10">
          <Block heading="The short version">
            <p>
              Tag Along Ltd operates TagRides — a Lagos-first route-share platform for riders and
              drivers. We collect only the information we need to match riders with drivers, process
              payments, support accountable trips, and comply with Nigerian law. We never sell your
              data. We never share it with advertisers. We delete it when you ask us to — through
              the app or by email.
            </p>
          </Block>

          <Block heading="What we collect">
            <p className="mb-3">
              Different information for different roles. Here's the full list.
            </p>

            <h3 className="mt-4 font-semibold text-foreground">From everyone (riders and drivers)</h3>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Account identifiers.</strong> First and last
                name, email address, phone number. Used to identify you inside the app and
                communicate with you about your rides.
              </li>
              <li>
                <strong className="text-foreground">Verification signals.</strong> Email
                verification tokens, one-time codes (OTPs) delivered by SMS or WhatsApp. Used to
                confirm you own the phone number or inbox you registered with.
              </li>
              <li>
                <strong className="text-foreground">Location data.</strong> Your device's GPS
                coordinates while the app is open during a ride — pickup, drop-off, and any
                intermediate stops. Location is used only to route the ride; we don't build
                background location profiles or track you between rides.
              </li>
              <li>
                <strong className="text-foreground">Trip history.</strong> The rides you've taken
                or given: origin, destination, timestamp, fare, driver or rider you were paired
                with, ratings you exchanged. Kept because you may need receipts and because the
                marketplace's future price + match quality depend on aggregate history.
              </li>
              <li>
                <strong className="text-foreground">Payment activity.</strong> Wallet balance,
                top-ups, withdrawals, per-ride charges. Card details themselves never touch our
                servers — see the "Who processes what" section below.
              </li>
              <li>
                <strong className="text-foreground">Device + connection.</strong> Push
                notification token (for ride updates), IP address, device model, operating system
                version, app version, coarse language + region setting. Used for delivery,
                debugging, and abuse prevention.
              </li>
              <li>
                <strong className="text-foreground">Optional profile photo.</strong> If you set
                one, it's shown to your ride counterpart so they can recognise you at pickup.
                Deleted with your account.
              </li>
            </ul>

            <h3 className="mt-6 font-semibold text-foreground">From drivers specifically</h3>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Driver verification documents.</strong>{' '}
                Government-issued ID, driver's licence, vehicle registration, and insurance
                certificate. Reviewed once for eligibility; encrypted at rest afterward.
              </li>
              <li>
                <strong className="text-foreground">Vehicle details.</strong> Make, model, colour,
                year, licence plate, seat count. Shown to riders so they can confirm the right
                vehicle at pickup.
              </li>
              <li>
                <strong className="text-foreground">Payout account information.</strong> Bank name
                and account number for driver earnings withdrawal. Held by our payment processor
                (Paystack); we hold only the last four digits for reference.
              </li>
            </ul>

            <h3 className="mt-6 font-semibold text-foreground">From landing-page visitors</h3>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Waitlist email address (if you submit one). Stored only to email you when we
                launch in your city.
              </li>
              <li>
                Trip-fare research submissions (if you contribute one). Origin, destination, fare
                paid, time of day, mode. Used only to calibrate the in-app price-suggestion
                model. Never linked to your identity.
              </li>
              <li>
                Standard server logs (IP, user agent, request path) — for spam prevention. Rotated
                every 90 days.
              </li>
            </ul>
          </Block>

          <Block heading="What we never collect">
            <ul className="ml-5 list-disc space-y-2">
              <li>Card numbers, PINs, or CVVs — those go direct to our payment processor.</li>
              <li>Background location when the app isn't open for a ride.</li>
              <li>Your contact list, calendar, photos, or any device data outside what's listed above.</li>
              <li>Advertising identifiers or third-party tracking cookies.</li>
              <li>Anything from data brokers or purchased datasets.</li>
            </ul>
          </Block>

          <Block heading="Who processes what (third-party services we use)">
            <p className="mb-3">
              Running a ride-sharing platform means we rely on specialist providers for a handful
              of functions. Each one sees only the specific data they need for their piece, and
              each one is bound by contract to protect it. Here's the whole list, so you know
              exactly where your data flows.
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Firebase (Google Cloud).</strong>{' '}
                Authentication, session management, and push notification delivery. Sees your
                phone number, email, and device push token.
              </li>
              <li>
                <strong className="text-foreground">Google Maps Platform.</strong> Address
                autocomplete, geocoding, and the map tiles you see. Sees the addresses you
                search + your approximate location while the map is open.
              </li>
              <li>
                <strong className="text-foreground">MailerSend.</strong> Transactional email
                delivery (verification links, receipts, security alerts). Sees your email
                address and the message content we generate.
              </li>
              <li>
                <strong className="text-foreground">KudiSMS.</strong> SMS OTP delivery for phone
                verification. Sees your phone number and the OTP message body.
              </li>
              <li>
                <strong className="text-foreground">Meta (WhatsApp Business API).</strong> Once
                enabled, we send OTPs and ride updates through WhatsApp as a preferred channel
                for Nigerian users. Meta sees your phone number and the message we send. We
                only use it as a delivery channel — we don't share ride history or profile
                data with Meta.
              </li>
              <li>
                <strong className="text-foreground">Paystack.</strong> Payment processing (card
                top-ups, wallet holds, driver payouts). Sees the transaction amount, your name,
                your email, and card details you enter into their secure form. Paystack is
                PCI-DSS certified and NDPR-registered.
              </li>
              <li>
                <strong className="text-foreground">Cloudinary.</strong> Storage + delivery of
                profile photos and vehicle images. Sees the images you upload.
              </li>
              <li>
                <strong className="text-foreground">Amazon Web Services (AWS EC2, Lagos region
                where available).</strong> Where the TagRides servers run. AWS sees encrypted
                data at rest and encrypted traffic in transit — they never process it.
              </li>
              <li>
                <strong className="text-foreground">Vercel.</strong> Hosts the marketing site
                (tagrider.com) — the landing page you're reading right now. Vercel sees only
                anonymised request logs typical of any static host.
              </li>
            </ul>
            <p className="mt-4">
              We do not share your data with advertisers, data brokers, or any other third
              party for commercial gain — full stop. When Nigerian law requires disclosure
              (a valid court order, for example) we respond narrowly and log the request
              internally.
            </p>
          </Block>

          <Block heading="Why we're allowed to hold this data (legal basis)">
            <p>
              Under Nigeria's Data Protection Regulation (NDPR) and Data Protection Act 2023, we
              rely on the following bases:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Contract performance.</strong> We can't match
                you with a ride without your account data + location. Signing up = agreeing to
                let us do exactly this.
              </li>
              <li>
                <strong className="text-foreground">Legal obligation.</strong> Nigerian tax and
                consumer-protection law requires us to keep transaction records for a set period.
              </li>
              <li>
                <strong className="text-foreground">Legitimate interest.</strong> Debugging
                crashes, preventing fraud and abuse, improving the matching model. We're
                careful to weigh these against your privacy expectations.
              </li>
              <li>
                <strong className="text-foreground">Consent.</strong> Optional things — profile
                photo, marketing emails, WhatsApp opt-in for non-transactional messages. You
                can withdraw consent any time.
              </li>
            </ul>
          </Block>

          <Block heading="How long we keep it">
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Active account data</strong> (identity,
                contact, wallet): for the life of your account, deleted within 30 days of
                account deletion.
              </li>
              <li>
                <strong className="text-foreground">Trip records</strong>: retained for 7 years
                (Nigerian tax + audit requirement), then automatically deleted.
              </li>
              <li>
                <strong className="text-foreground">Driver verification documents</strong>: for
                the life of your driver account, or 5 years after account closure —
                whichever is longer — because we may need to demonstrate to regulators that
                someone was properly vetted at the time they carried passengers.
              </li>
              <li>
                <strong className="text-foreground">Payment records</strong>: 7 years, same
                reason as trip records.
              </li>
              <li>
                <strong className="text-foreground">Server logs</strong>: 90 days, then
                auto-rotated. Location data older than 30 days is aggregated into anonymous
                traffic patterns; individual GPS traces are deleted.
              </li>
              <li>
                <strong className="text-foreground">Waitlist email</strong>: until you ask us
                to remove it, or 12 months after launch in your city.
              </li>
            </ul>
          </Block>

          <Block heading="Cross-border transfers">
            <p>
              Some of the processors above operate outside Nigeria (Google, Meta, AWS's global
              infrastructure). When your data leaves Nigerian soil, we rely on contractual
              safeguards — standard data-protection clauses — with each provider. We do not
              transfer data to jurisdictions the Nigeria Data Protection Commission has
              flagged as inadequate.
            </p>
          </Block>

          <Block heading="Your rights (and how to use them)">
            <p>
              Under the NDPR + Data Protection Act 2023 you can ask us to do any of the
              following. Email{' '}
              <a
                href="mailto:privacy@tagrider.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                privacy@tagrider.com
              </a>{' '}
              and we'll respond within 5 business days.
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Access.</strong> Show me everything you have
                about me.
              </li>
              <li>
                <strong className="text-foreground">Correction.</strong> Fix anything that's
                wrong.
              </li>
              <li>
                <strong className="text-foreground">Deletion.</strong> Erase my account and
                everything tied to it. See the next section for the in-app path.
              </li>
              <li>
                <strong className="text-foreground">Portability.</strong> Give me my data in a
                machine-readable format so I can take it elsewhere.
              </li>
              <li>
                <strong className="text-foreground">Objection.</strong> Stop using my data for
                a specific purpose (e.g., product improvement model training). We'll comply
                unless we're legally required to keep it.
              </li>
              <li>
                <strong className="text-foreground">Withdraw consent.</strong> For anything we
                do on a consent basis (marketing emails, WhatsApp opt-in).
              </li>
            </ul>
            <p className="mt-4">
              If you're not happy with how we handled a request, you can complain to the
              Nigeria Data Protection Commission (NDPC) at{' '}
              <a
                href="https://ndpc.gov.ng"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                ndpc.gov.ng
              </a>
              .
            </p>
          </Block>

          <Block heading="Data deletion" id="data-deletion">
            <p>
              You can delete your account — and every piece of data we hold about you — from
              inside the app:
            </p>
            <ol className="ml-5 list-decimal space-y-2">
              <li>Open the TagRides app</li>
              <li>Tap the menu icon → Profile</li>
              <li>Tap <strong className="text-foreground">Delete Account</strong> at the bottom</li>
              <li>Confirm when prompted</li>
            </ol>
            <p className="mt-3">
              Deletion is complete within 30 days. We erase your identity, contact, wallet,
              location, and profile data. We keep the anonymised transaction records that
              Nigerian tax law requires us to hold (7 years) — those cannot be tied back to
              you.
            </p>
            <p className="mt-3">
              Prefer not to use the app? Email{' '}
              <a
                href="mailto:privacy@tagrider.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                privacy@tagrider.com
              </a>{' '}
              with "Delete my account" in the subject line, and confirm your identity by
              replying from the email address on your TagRides account. We'll process the
              request within 5 business days and confirm when complete.
            </p>
          </Block>

          <Block heading="Security">
            <p>
              Everything we hold is encrypted in transit (HTTPS/TLS 1.3) and at rest (AES-256
              on our databases). Access to production systems is restricted to a small
              on-call team, gated behind two-factor authentication + hardware keys, and
              logged. We run periodic security reviews and rehearse incident response.
            </p>
            <p className="mt-3">
              If we ever discover a breach involving your data, we'll notify you and the
              Nigeria Data Protection Commission within 72 hours as required by law.
            </p>
          </Block>

          <Block heading="Children">
            <p>
              TagRides isn't designed for anyone under 18 (the driving-age threshold in
              Nigeria). We don't knowingly collect data from minors. If you believe a minor
              has signed up, email{' '}
              <a
                href="mailto:privacy@tagrider.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                privacy@tagrider.com
              </a>{' '}
              and we'll delete the account immediately.
            </p>
          </Block>

          <Block heading="If this policy changes">
            <p>
              We'll update the "Last updated" date at the top. For material changes (new
              processors, new data types collected, changed retention periods), we'll notify
              you inside the app and by email at least 14 days before the new policy takes
              effect. If you disagree with the change, you can delete your account before it
              applies to you.
            </p>
          </Block>

          <Block heading="The company behind this">
            <p>
              <strong className="text-foreground">TAG-ALONG LTD</strong>, a Nigerian limited
              company (RC pending) operating in Lagos State. Registered privacy contact:{' '}
              <a
                href="mailto:privacy@tagrider.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                privacy@tagrider.com
              </a>
              . Read about us on the{' '}
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

function Block({ heading, children, id }) {
  return (
    <section id={id}>
      <h2 className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
        {heading}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground-muted md:text-base">
        {children}
      </div>
    </section>
  );
}
