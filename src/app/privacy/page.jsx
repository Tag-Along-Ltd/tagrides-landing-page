import Link from 'next/link';

import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'Privacy Policy - TagRides',
  description:
    'How Tag Along Ltd handles personal data across the TagRides website, rider services, driver services, trips, and wallet features.',
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground-muted">
      <Header />
      <section className="mx-auto max-w-3xl px-6 pt-28 pb-16 md:pt-36 md:pb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Privacy</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
          What we collect, why we use it, and the choices you have.
        </h1>
        <p className="mt-4 text-sm text-foreground-muted">Effective and last updated 2026-07-19.</p>

        <div className="prose-tag mt-12 space-y-10">
          <Block heading="Who controls your personal data">
            <p>
              <strong className="text-foreground">TAG-ALONG LTD</strong> operates TagRides and is
              the controller of personal data described in this policy. TagRides is a Lagos-first
              route-share platform for riders and drivers. You can contact our privacy team at{' '}
              <a
                href="mailto:privacy@tagrider.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                privacy@tagrider.com
              </a>{' '}
              or write to us at 6, Alh Memunatu Shelle Crescent, off Murphy Mudashiru Street, Rovers
              Estate, Owode-Ogombo, Lagos State, Nigeria.
            </p>
            <p>
              This policy covers the TagRides app, website, accounts, ride services, wallet,
              support, and research forms. Some described features are limited, in pilot, or
              disabled; we identify important availability limits below.
            </p>
          </Block>

          <Block heading="The information we collect">
            <h3 className="font-semibold text-foreground">Account, identity, and communication</h3>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Name, email address, phone number, account role, profile image, and account
                identifiers.
              </li>
              <li>
                Login, session, email-verification, and phone-verification records, including OTP
                delivery channel and status.
              </li>
              <li>
                Messages, support requests, notification preferences, device push tokens, and
                transactional communications.
              </li>
              <li>
                Referral records, where the feature is used, including referrer and referred-user
                identifiers, roles, status, reward amount, and related timestamps.
              </li>
            </ul>

            <h3 className="mt-6 font-semibold text-foreground">Driver and vehicle verification</h3>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Driver's licence, vehicle registration, roadworthiness, insurance, and other
                regionally required documents.
              </li>
              <li>
                Vehicle make, model, colour, year, image, licence plate, class, and available seats.
              </li>
              <li>
                Review status, rejection or review reasons, verification history, and resulting
                eligibility to drive or receive payouts.
              </li>
            </ul>

            <h3 className="mt-6 font-semibold text-foreground">
              Location, routes, and trip activity
            </h3>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Precise or near-precise coordinates, accuracy, heading, speed, timestamps, pickup,
                destination, stops, and recent driver fixes while location-dependent services are in
                use.
              </li>
              <li>
                The app may request a fresh position when it opens or returns to the foreground. Web
                location may be approximate or use a position cached for up to 30 seconds.
              </li>
              <li>
                During driver availability, matching, confirmation, recovery, and active trips,
                driver location may be sent to our systems. During an active ride it may be shared
                with the matched rider together with movement, ETA, ride, and temporary session
                information.
              </li>
              <li>
                If a driver allows background location, collection may continue while an active
                driver session runs in the background. Driver fixes may also be stored in GPS
                history for ride reconstruction, audit, safety, reliability, and analytics.
              </li>
              <li>
                Derived information such as route-matched position, progress, distance remaining,
                ETA, arrival state, route deviation, and rider-driver distance.
              </li>
              <li>
                Ride requests, selections, offers, accepted price, participants, seats, arrival,
                boarding, cancellation, completion, ratings, and related timestamps and identifiers.
              </li>
            </ul>
            <p className="mt-3">
              TagRides does not need to track a driver continuously when no driver session or
              location-dependent service is active. Device and platform behaviour can vary, so use
              your operating-system or browser settings to review or revoke foreground or background
              location permission. Location-dependent functions may then be unavailable.
            </p>

            <h3 className="mt-6 font-semibold text-foreground">
              Wallet, payment, refund, and payout data
            </h3>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Wallet balances, funding references, holds, releases, ride charges, refunds, driver
                earnings, service fees, transfer fees, currency, status, reason, and timestamps.
              </li>
              <li>
                Payment-provider transaction, refund, transfer, webhook, reconciliation, error,
                attempt, and audit records. Signed provider webhook bodies and signatures may be
                retained to verify and safely process payment events.
              </li>
              <li>
                For drivers: account-holder name, bank, full account number at submission, payout
                currency, recipient token, destination version, and change time. We send the full
                bank details to Paystack for resolution and recipient creation. Locally, the account
                number is replaced with a masked value containing only the last four digits.
              </li>
            </ul>
            <p className="mt-3">
              Card numbers, PINs, and CVVs entered in Paystack's hosted payment flow are handled by
              Paystack rather than stored by TagRides. New and scheduled Nigerian driver payouts are
              currently disabled, and no bank-change cooling duration is configured.
            </p>

            <h3 className="mt-6 font-semibold text-foreground">Pickup contact</h3>
            <p>
              After pickup arrival and before boarding, our systems may disclose a rider's account
              phone number to the selected driver for pickup coordination. The driver initiates the
              call through the device phone app and telephone network. The number may therefore
              appear in device call history, and normal caller ID may reveal the driver's number.
              Reveal attempts are authorised, rate-limited, and audited using user, ride, session,
              action, and timestamp information; the audit record does not include the phone number.
            </p>

            <h3 className="mt-6 font-semibold text-foreground">Device and operational data</h3>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                IP address, browser or device information, app version, operating system, language,
                region, request path, and timestamps.
              </li>
              <li>
                Authentication, messaging, network, security, rate-limit, crash, and diagnostic
                events.
              </li>
              <li>
                Safety and ride-integrity metadata such as ride and session identifiers, phase,
                location freshness and accuracy, divergence, and participant count. Precise
                coordinates may be processed to calculate safety signals without being written to
                general safety logs.
              </li>
            </ul>

            <h3 className="mt-6 font-semibold text-foreground">
              Website visitors and contributors
            </h3>
            <ul className="ml-5 list-disc space-y-2">
              <li>Waitlist email, submission source, and time if you join the waitlist.</li>
              <li>
                Trip-fare research including origin, destination, minimum and maximum fare, time,
                duration, travel mode, optional notes, source, and submission time.
              </li>
              <li>
                IP address and request information used temporarily for rate limiting and abuse
                prevention.
              </li>
              <li>Basic website usage events collected through Vercel Analytics.</li>
            </ul>
          </Block>

          <Block heading="How we use information">
            <ul className="ml-5 list-disc space-y-2">
              <li>Create and secure accounts, verify contact details, and maintain sessions.</li>
              <li>
                Match riders and drivers, coordinate pickups, show trip participants, and manage
                ride state.
              </li>
              <li>
                Provide maps, route progress, ETA, arrival detection, trip completion, and safety
                signals.
              </li>
              <li>
                Calculate prices, record offers, reserve and settle fares, maintain wallets, and
                reconcile transactions.
              </li>
              <li>
                Verify drivers, vehicles, and payout destinations and enforce eligibility
                requirements.
              </li>
              <li>Send service, security, ride, receipt, and account communications.</li>
              <li>
                Prevent fraud, abuse, duplicate transactions, unauthorised access, and cross-trip
                data exposure.
              </li>
              <li>
                Debug and improve reliability, matching, routing, pricing suggestions, and aggregate
                marketplace planning.
              </li>
              <li>
                Keep records, respond to lawful requests, resolve disputes, and meet legal, tax,
                accounting, and regulatory duties.
              </li>
            </ul>
          </Block>

          <Block heading="What other users can see">
            <p>
              For trip coordination, we share information needed to recognise and coordinate with a
              counterpart. Depending on role and trip stage, this can include first and last name,
              profile image, rating, vehicle details and licence plate, pickup and destination,
              seats, offer details, live or recent driver location, route progress, and ETA. General
              discovery profiles do not include email addresses or phone numbers.
            </p>
            <p>
              The limited pickup-contact disclosure described above is an exception. Do not use
              another user's information for unrelated contact, marketing, harassment, publication,
              or off-platform solicitation.
            </p>
            <p>
              If you use a referral link or code, a prospective referred user may see an abbreviated
              version of the referrer's name and account role so they can recognise the referral.
            </p>
          </Block>

          <Block heading="Service providers and other recipients">
            <p>
              We use service providers to operate TagRides. The provider and hosting configuration
              can change as we deploy the service, so this is a description of the main categories
              and providers rather than a promise that no other contracted processor is used.
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-foreground">
                  Google services, including Firebase and Google Maps:
                </strong>{' '}
                authentication, push notifications, map display, address search, geocoding, and
                routing.
              </li>
              <li>
                <strong className="text-foreground">Paystack:</strong> hosted payment processing,
                bank-account resolution, recipient creation, refunds, transfers, and payment
                verification.
              </li>
              <li>
                <strong className="text-foreground">
                  MailerSend, KudiSMS, and, where enabled, Meta's WhatsApp services:
                </strong>{' '}
                delivery of email, OTP, and service messages.
              </li>
              <li>
                <strong className="text-foreground">Cloudinary:</strong> storage and delivery of
                uploaded images.
              </li>
              <li>
                <strong className="text-foreground">
                  Hosting, database, messaging, and analytics providers:
                </strong>{' '}
                infrastructure used to host APIs, store records, exchange live ride messages,
                protect services, host the website, and understand basic website use. Current
                deployment options include AWS, MongoDB infrastructure, Vercel, Cloudflare, and
                Netlify.
              </li>
              <li>
                <strong className="text-foreground">Phone and network providers:</strong> when a
                driver chooses to call a rider, the device dialler, mobile carrier, and telephone
                network process the call.
              </li>
            </ul>
            <p className="mt-3">
              We may also disclose information when required by law, to protect a person or the
              service, in connection with a corporate transaction, or with your direction or
              consent. We do not sell personal data or share it with advertisers for targeted
              advertising.
            </p>
          </Block>

          <Block heading="Legal bases">
            <p>Under the Nigeria Data Protection Act 2023, our legal bases include:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Contract:</strong> to create your account, match
                and coordinate trips, maintain wallets, and process requested transactions.
              </li>
              <li>
                <strong className="text-foreground">Legal obligation:</strong> for tax, accounting,
                regulatory, safety, consumer-protection, and lawful-disclosure duties.
              </li>
              <li>
                <strong className="text-foreground">Legitimate interests:</strong> to secure the
                service, prevent fraud, audit access, reconcile transactions, support users, and
                improve reliability.
              </li>
              <li>
                <strong className="text-foreground">Consent:</strong> where required for device
                permissions, optional profile information, or optional communications. You can
                withdraw consent.
              </li>
            </ul>
          </Block>

          <Block heading="Automated and derived processing">
            <p>
              Software helps match riders and drivers, check regional seat capacity, calculate or
              suggest prices, map-match GPS fixes, detect arrival or completion, identify suspicious
              or duplicate activity, and determine whether configured verification and transaction
              rules are met. These outputs can affect what is shown or whether an action is
              available. You may contact us to question an outcome or request human review where
              applicable.
            </p>
          </Block>

          <Block heading="How long we keep information">
            <p>
              We keep personal data only for as long as reasonably needed for the purposes above,
              including providing an account, completing and reconciling transactions, handling
              complaints, protecting the service, and meeting legal, tax, accounting, and regulatory
              obligations. Retention varies by record and applicable requirement.
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Account and active operational data are generally kept while the account or service
                relationship continues.
              </li>
              <li>
                Trip, wallet, payment, refund, payout, webhook, and audit records may be retained
                after account closure where required for financial records, disputes, fraud
                prevention, or law.
              </li>
              <li>
                Driver verification records may be retained after driving ends to demonstrate
                eligibility and respond to safety or regulatory matters.
              </li>
              <li>
                Bank details stored locally remain masked to the last four digits; recipient tokens
                and associated audit metadata may remain with financial records. Deletion of a bank
                destination can initially be a soft deletion.
              </li>
              <li>
                Waitlist and research submissions are kept until they are no longer needed for the
                stated purpose or you validly request deletion, subject to applicable exceptions.
              </li>
            </ul>
            <p className="mt-3">
              Our retention and deletion controls are still being standardised across services,
              including GPS history and referral records. We assess deletion and de-identification
              requests against the operational and legal requirements above. Backups and legally
              restricted records may take longer to cycle out, and we will not describe retained
              records as anonymous if they remain linkable for compliance.
            </p>
          </Block>

          <Block heading="International transfers">
            <p>
              Some providers process information outside Nigeria. International transfers must
              comply with the Nigeria Data Protection Act 2023. We assess the transfer mechanism and
              safeguards required for the provider and processing involved; contact us if you want
              information about a particular transfer.
            </p>
          </Block>

          <Block heading="Security">
            <p>
              We use technical and organisational measures designed to protect personal data,
              including access controls, transport encryption where configured, masked bank details,
              signed payment webhooks, rate limits, audit records, and controls intended to reject
              stale or mismatched ride-location updates. No system is completely secure, and we
              cannot guarantee that loss, misuse, or unauthorised access will never occur.
            </p>
            <p>
              If a personal-data breach occurs, we will investigate and notify affected people and
              the Nigeria Data Protection Commission when and within the period required by
              applicable law.
            </p>
          </Block>

          <Block heading="Your rights and choices">
            <p>
              Subject to the Nigeria Data Protection Act 2023 and applicable exceptions, you may
              request access, correction, deletion, restriction, portability, or information about
              your data; object to certain processing; withdraw consent; and question certain
              automated outcomes. Email{' '}
              <a
                href="mailto:privacy@tagrider.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                privacy@tagrider.com
              </a>{' '}
              from your account email or provide enough information for us to verify your request.
            </p>
            <p>
              You can manage location, notification, camera, and similar permissions in your device
              or browser settings. Revoking a permission can prevent the related feature from
              working. You can also ask us to remove a waitlist or research submission.
            </p>
            <p>
              If you are dissatisfied with our response, you may complain to the Nigeria Data
              Protection Commission at{' '}
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

          <Block heading="Account deletion" id="data-deletion">
            <p>
              The current in-app permanent-deletion control removes the core sign-in and profile
              account. It does not by itself erase every linked record held by driver, wallet,
              telemetry, referral, analytics, audit, or provider systems. To request broader erasure
              across TagRides services, email{' '}
              <a
                href="mailto:privacy@tagrider.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                privacy@tagrider.com
              </a>{' '}
              with "Delete my account" in the subject. We may need to verify your identity.
            </p>
            <p>
              We will verify and assess the request across relevant systems. Erasure does not
              override legal duties or legitimate requirements to retain transaction, tax, safety,
              fraud-prevention, dispute, or regulatory records. We will explain any material
              limitation or retention that applies to the request.
            </p>
          </Block>

          <Block heading="Children">
            <p>
              TagRides currently requires account holders, including riders, to be at least 18.
              Students who are 18 or older may use the rider service. We have not yet implemented a
              guardian-consent or guardian-booking flow for an under-18 rider, and drivers should
              not request a rider's identity document to determine age. Drivers must also meet all
              legal age and licensing requirements. If you believe a child has created an account or
              provided personal data, contact{' '}
              <a
                href="mailto:privacy@tagrider.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                privacy@tagrider.com
              </a>
              .
            </p>
          </Block>

          <Block heading="Changes to this policy">
            <p>
              We will update the effective date when this policy changes. If a change materially
              affects how we use personal data, we will provide reasonable notice through the app,
              website, email, or another appropriate channel before it takes effect where required.
            </p>
          </Block>

          <Block heading="Related terms">
            <p>
              Read the{' '}
              <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                TagRides Terms of Service
              </Link>{' '}
              for the rules that apply to accounts, trips, location features, payments, pickup
              contact, and use of the platform.
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
