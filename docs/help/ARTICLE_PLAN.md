# Screen-by-screen article plan

Implementation update: full article copy and related links now live in
`src/data/help/articles.mjs`. That catalogue is the canonical current title/slug
map and expands the original 20-topic outline below into focused walkthroughs.
The local `/help` hub and category/article pages are implemented, not deployed.
Public scope excludes admin completely. The capture manifest has 71 user-facing
checkpoints; operational admin training remains outside this help project.

Baseline: frontend routes and presentation source inspected 2026-09-25.
Source: `lib/core/constants/app_routes.dart`, `presentation/navigation/`,
`presentation/verification/`, `presentation/admin/`, `presentation/matching/`,
`presentation/in_ride/`, `presentation/wallet/` and existing acceptance runbooks.
Public article paths below are proposed, not currently live.

## Article catalogue

| ID  | Proposed `/help/` slug                    | Scope                                                                           | Priority                  |
| --- | ----------------------------------------- | ------------------------------------------------------------------------------- | ------------------------- |
| H01 | getting-started/open-the-web-app          | Supported entry URL, phone browser, location, connectivity, reload              | Before test               |
| H02 | getting-started/create-and-verify-account | Sign in, sign up, phone/email verification and expired links                    | Before onboarding         |
| H03 | getting-started/how-along-shared-works    | Overlapping routes, different destinations, per-seat fares, boarding commitment | Before test               |
| H04 | riders/request-a-shared-ride              | GPS origin, destination search, pickup pin, route, seats/payment confirmation   | Before test               |
| H05 | riders/understand-driver-options          | Driver cards, vehicle, rating, fare, distance vs ETA, open seats and map legend | Before test               |
| H06 | riders/agree-a-fare-and-choose            | Offer/counter/accept/choose, expiry, alternatives and switching                 | Before test               |
| H07 | riders/find-and-board-your-driver         | Public meeting point, walking line, road side, arrival, identity and boarding   | Before test               |
| H08 | riders/during-and-after-your-ride         | Tracking, drop-off, completion, payment status, rating, receipt                 | Before test               |
| H09 | riders/no-match-cancel-or-reconnect       | No match, driver gone, full vehicle, cancellation, offline and refresh          | Before test               |
| H10 | drivers/get-verified                      | Intro, five sections, save, summary, submission, pending/rejection/review       | Before onboarding         |
| H11 | drivers/add-car-or-keke                   | Vehicle class, manual model, passenger capacity and class-specific documents    | Before onboarding         |
| H12 | drivers/offer-seats-along-your-route      | Origin, final destination, seats offered, route confirmation and start          | Before test               |
| H13 | drivers/read-and-answer-offers            | Pickup/drop-off, detour, gross fare vs net, counter/accept/expiry               | Before test               |
| H14 | drivers/manage-pickups-and-seats          | Journey board, pickup count, passengers, waiting, boarding, full capacity       | Before test               |
| H15 | drivers/drop-off-and-finish               | Stops, confirmations, ratings, gross/service fee/net and pending settlement     | Before test               |
| H16 | money/wallet-payments-and-withdrawals     | Balance/holds, top-up, checkout, transaction status and payout limits           | Review before payment use |
| H17 | account/profile-history-and-referrals     | Profile, role, logout, history/detail, referral terms and eligibility           | Follow-up                 |
| H18 | support/get-help-or-report-a-problem      | FAQ/contact, trip problem, alerts, escalation and response expectations         | Before test               |
| H19 | getting-started/updates-and-version       | Find version, refresh while idle, stuck old release, supported browsers         | With release system       |
| H20 | drivers/dashboard-and-earnings            | Summary metrics, periods, empty states and link to underlying trips             | Follow-up                 |

## Critical explanations (use consistently in app and articles)

- **Along Shared:** drivers state their own route; riders may travel different
  portions of it. A shared ride does not require everyone to have one destination.
- **GPS / pickup / destination:** current GPS is where the device estimates you
  are; the agreed public meeting point may differ; destination is where you want
  to go. A nearby map label is not permission to stop at that place.
- **Selection / boarding:** browsing, fare agreement and choosing a driver are
  not the same as the server-confirmed boarding state. Explain the actual
  current pre-boarding seat policy without promising a guaranteed pickup order.
- **Capacity:** physical passenger capacity, offered seats, available seats,
  pending pickups and onboard passengers are distinct. Counts need labels.
- **Fare:** show the same selected driver's agreed amount through boarding and
  receipt. Explain a genuine adjustment if supported; never dismiss an unexplained
  discrepancy as normal. Gross fare, platform fee, net and settled balance differ.
- **Progress:** pending means waiting for acknowledgement; do not tap repeatedly
  or interpret a spinner as acceptance. Give a safe retry/refresh path.
- **Maps:** distinguish walking approach, vehicle route, pickup, drop-off,
  location accuracy and stale GPS. Use text + symbols, not colour alone.
- **Keke:** correct vehicle class, observed passenger capacity and actual road
  access. Do not select a car model merely to get through registration.
- **Status:** draft → submitted/pending → needs correction/rejected → resubmitted
  → verified/eligible. A verified document alone does not unlock driving.
- **Support:** `/support` is the pilot-support/contribution page. User Help &
  Support must lead to assistance, not imply a contribution is required for help.

## Route and state inventory

| Screen group              | Actual route/source surface                        | Segments and states to explain                                         | Article / shot family |
| ------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------- | --------------------- |
| Startup                   | Native/web splash + Flutter loading overlays       | Light/dark two-colour logo; loading vs stuck connection                | H01 / G01–G02         |
| Sign-in                   | `/signin`                                          | Phone country, number, code flow, social controls, errors              | H02 / G03–G05         |
| Sign-up                   | `/signup`                                          | Name/email; account creation vs verification; validation               | H02 / G06             |
| Email result              | `/email_verified`                                  | Success, expired, invalid, error, return-to-app                        | H02 / G07             |
| General intro             | `/onboarding`                                      | Route sharing, roadside pickup, pricing promise                        | H03 / G08             |
| Driver intro              | `/driver_onboarding`                               | Own route, verification, choosing riders, earnings                     | H10 / V01             |
| Profile/role              | `/profile`, drawer role tile                       | Edit profile, rider/driver role, verification entry, logout            | H17 / G09             |
| Rider home                | `/rider_home_screen`                               | Location state, destination search, saved locations, route map         | H04 / R01–R03         |
| Ride confirmation         | Rider home sheets                                  | Pickup/destination, seats, Along/Shared mode, payment, request         | H04 / R04             |
| Rider discovery           | `/matching/rider/:id`                              | No cards/loading; options, selected strip, carousel, map and sheet     | H05 / R05–R08         |
| Negotiation               | Driver card + negotiation stepper                  | Original offer, counter, agreement, choose, pending, expiry            | H06 / R09–R11         |
| Selection alternatives    | Strip, driver-options sheet                        | Selected vs alternative, capacity contested, disappeared driver        | H06/H09 / R12–R14     |
| Pickup approach           | Rider matching route/arrival sheets                | Walk/drive separation, meet-on-route, identification and wait window   | H07 / R15–R16         |
| Rider in-trip             | `/in_ride`                                         | Driver identity, vehicle, next stop, tracking, contact and alert       | H08/H18 / R17–R18     |
| Rider completion          | Completion/rating sheet                            | Agreed fare, duration/distance, payment state, optional rating         | H08 / R19–R20         |
| Rider interruption        | Cancellation/recovery surfaces                     | No match, cancel confirmation, stale network, app resume               | H09 / R21–R23         |
| Driver Home               | `/driver_home_screen`                              | Applicant strip, eligibility, Along route input, GPS status            | H10/H12 / V02/D01     |
| Bank section              | `/driver_verification_screen?section=bank_account` | Bank, account resolution, save/failure; private data                   | H10 / V03             |
| Personal section          | `?section=personal_info`                           | Licence/NIN, next of kin, input validity, saved state                  | H10 / V04             |
| Vehicle section           | `?section=vehicle`                                 | Car make/model/year vs keke manual entry, plate/colour/capacity        | H11 / V05–V06         |
| Vehicle documents         | `?section=vehicle_documents`                       | Class requirements, upload/preview, expiry, rejection reasons          | H10/H11 / V07         |
| Driver documents          | `?section=driver_documents`                        | Licence/profile/ownership fields, status and corrections               | H10 / V08             |
| File preview              | `/filePreview`                                     | Image/PDF, missing URL, back navigation                                | H10 / V09             |
| Verification summary      | `/driver_verification_screen`                      | Five sections, edit link, incomplete fields, final submit              | H10 / V10             |
| Review states             | Summary + home status strip                        | Pending, rejected section, resubmitted, eligible; refresh              | H10 / V11–V13         |
| Driver route confirmation | Driver Home sheet                                  | Real destination, chosen route, seats offered and Start trip           | H12 / D02             |
| Driver marketplace        | `/matching/driver/:id`                             | Stationary board vs moving controls, route and final stop              | H13/H14 / D03–D04     |
| Incoming rider            | Offer panel/cards                                  | Rider, pickup/drop-off, walk/detour/ETA, gross/net, accept/counter     | H13 / D05–D07         |
| Driver journey roster     | Board / expanded roster                            | Pending pickups, onboard, counts, shared stop grouping                 | H14 / D08–D09         |
| Driver arrival            | Pickup confirmation sheet                          | Rider identity, seats, wait deadline, confirm, failure/retry           | H14 / D10–D11         |
| Driver wait decision      | Expired wait / no-show                             | Wait extension, rider didn't show, release vs onboard                  | H14 / D12             |
| Capacity                  | Seat controls + full state                         | Offered/available/onboard, adjust, no seats and reserved pickup        | H14 / D13             |
| Driver interruptions      | Unexpected stop / cancel / reconnect               | Current status, resuming route, rider communication                    | H14/H18 / D14         |
| Driver drop-off           | Drop-off/rating sheets                             | Correct passenger/stop, confirmation and acknowledgement               | H15 / D15             |
| Driver final summary      | Session completion sheet                           | Gross, fees, net, per-trip amounts, settlement and return home         | H15 / D16             |
| Driver dashboard          | `/driver_dashboard_screen`                         | Metric meanings, periods, no activity                                  | H20 / D17             |
| Wallet                    | `/wallet_screen` + indexed pages                   | Balance, top-up, hosted checkout, transaction pending/failed, withdraw | H16 / M01–M05         |
| History                   | `/history_screen` + detail                         | Rider/driver records, completed vs cancelled, receipt                  | H17 / M06–M07         |
| Referral                  | `/referral`                                        | QR/code/share, pending eligibility vs paid reward                      | H17 / M08             |
| Help/contact              | `/help_and_support_screen`                         | FAQ/contact tabs, available channel, external app return               | H18 / G10             |

Direct-mode screens exist in source but are outside this Along Shared test.
Constants such as `/enhanced_auth`, `/home_screen` and `/rider_trip_screen` are
not automatically evidence of a separately mounted screen. Confirm in the router
before writing a user guide. Dormant/disabled modes should not appear as promises.

## In-app clarity work order

1. Admin failures retain actionable review; direct-link navigation and list refresh.
2. Correct brand mark in native/web splash and legacy Flutter loaders.
3. Make vehicle capacity and boarding acknowledgement understandable; exercise
   zero-available-but-reserved pickup, wait expiry and rejected confirmation.
4. Preserve named road/terminal references and distinguish drive/walk metrics.
   Mac commits `642cee32` and `920bbcef` already address receipt labels and driver
   card focus; include/review them rather than reimplementing in an older clone.
5. Re-run the previously observed fare mismatch and offer timeout on the candidate.
   Old demo footage is not evidence the current build still contains those bugs.
6. Verify web keyboard, bottom-sheet scrolling, back/refresh, no-match and permission
   recovery. Use the confusion log to prioritize remaining copy changes.

## Initial capture order

Onboarding: V01–V13. First ride: R01–R04, R06, R09–R12,
R15–R17, R19; driver: D01–D03, D05–D06, D08–D10, D13, D15–D16.
Then error/recovery images, wallet/history and remaining reference shots.
Each article is reviewed against the same release as its screenshots before
publishing; final control wording comes from that release, not this planning table.
