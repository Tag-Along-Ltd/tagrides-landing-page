// Actual production Flutter widgets captured in the isolated documentation app.
// Sample identities and financial states are not real accounts or transactions.
// source + fixture code live in tagrides-frontend/tools/help_capture/.
const image = (id, caption, alt, callouts, crop = null) => ({
  src: `/assets/help/review-2026-09/${id}.webp`,
  width: 860,
  height: crop?.height || 1864,
  caption,
  alt,
  callouts,
  crop,
  platform: crop ? 'Web app panel · sample data' : 'Web app · sample data',
  capturedAt: '2026-09-25',
  sourceCommit: '94d74be85d05815de524559750332313aa7a5a06',
  sourceHasLocalChanges: true,
});
const point = (text, x, y) => ({ text, x, y });
const panel = { left: 0, top: 740, width: 860, height: 400 };

export const helpScreenshots = {
  M07: image(
    'M07',
    'One rider journey, expanded into its recorded legs.',
    'A two-leg rider journey with a 1200-naira total, separate 500 and 700-naira legs, and a 15-minute gap.',
    [
      point('The journey header holds the full route, total fare and elapsed time.', 94, 27),
      point('Each leg keeps its own route, fare and timings.', 94, 40),
      point('The gap is shown between the recorded legs.', 94, 49),
    ],
  ),
  D18: image(
    'D18',
    'One driving session, expanded into its completed passenger rides.',
    'Driver history with a 1200-naira gross total and two passenger rides with separate pickups, drop-offs and overlapping times.',
    [
      point('Gross fares are passenger prices before service fees.', 94, 21),
      point('Completed passenger rides belong to this driving session.', 94, 42),
      point('Overlapping times are valid for shared passengers.', 94, 59),
    ],
  ),
  G03: image(
    'G03',
    'The phone-first sign-in screen.',
    'TagRides sign-in with Nigeria country code, phone number, Get Code and six code boxes.',
    [
      point('Check the country code and phone number before Get Code.', 95, 55),
      point('Use the newest verification code in these boxes.', 95, 66),
    ],
  ),
  G06: image(
    'G06',
    'Complete the account details requested after phone verification.',
    'Create Account form with first name, last name, email and Send Verification Email.',
    [
      'Use your own first and last name.',
      'Check the email address before sending its verification link.',
    ],
  ),
  G07: image(
    'G07',
    'A successful email-verification result.',
    'Email verified message and Continue in TagRides button.',
    [
      'Read the result before returning to the app.',
      'Email verification is separate from driver approval.',
    ],
  ),
  G09: image(
    'G09',
    'Profile controls in a synthetic rider account.',
    'Aisha Adeoye sample profile with photo control, Logout and Delete Account.',
    [
      'The photo control updates your picture.',
      'Logout ends the session; Delete Account requests account deletion.',
    ],
  ),
  G10: image(
    'G10',
    'The app’s own Help and Support screen.',
    'Help and Support with FAQs, Contact support and topic questions.',
    [
      point('Switch from FAQs to Contact support when you need assistance.', 95, 18),
      point('Choose a topic, then open a question.', 95, 42),
    ],
  ),
  V03: image(
    'V03',
    'Step 1: bank account details. All values shown are fictional.',
    'Driver verification bank step with sample account number, Sample Bank, resolved account name and Next.',
    [
      point('Enter your own account number and select the correct bank.', 95, 35),
      point('Check the resolved account name.', 95, 50),
      point('Continue only after the details are accepted.', 95, 58),
    ],
  ),
  V04: image(
    'V04',
    'Step 2: your personal and next-of-kin details.',
    'Driver Details form showing NIN, licence number, next-of-kin name, phone and relationship using sample values.',
    [
      point('Identity and licence are separate fields.', 95, 33),
      point('Next-of-kin contact and relationship belong to the same person.', 95, 61),
      point('Next continues; Previous returns to the bank section.', 95, 79),
    ],
  ),
  V05: image(
    'V05',
    'Step 3: a car registration example.',
    'Car vehicle details form with Toyota Corolla, manufacturing year and passenger seats.',
    [
      'Choose the real vehicle class and matching make/model.',
      'The form continues below the visible area for plate, colour and navigation.',
    ],
  ),
  V06: image(
    'V06',
    'Step 3: a saved tricycle draft, using a fictional vehicle.',
    'Tricycle vehicle type with Bajaj RE and three passenger seats.',
    [
      point('Tricycle is the keke option in this screen.', 95, 32),
      point('Use Vehicle not listed only if the make or model is missing.', 95, 75),
      point('Passenger seats must match the physical vehicle.', 95, 85),
    ],
  ),
  V07: image(
    'V07',
    'Step 4: the car vehicle-document list.',
    'Vehicle Documents with required markers, expiry fields and empty file statuses.',
    [
      'A red asterisk marks a compulsory field.',
      'Expiry Date and Empty describe different requirements.',
      'This is the car list. A keke showing inappropriate car-only requirements needs support review.',
    ],
  ),
  V08: image(
    'V08',
    'Step 5: driver documents before file selection.',
    'Driver Documents showing licence, profile photo and ownership fields, then Previous and Submit.',
    [
      point('Open each required document field to choose the correct file.', 95, 35),
      point('Read expiry requirements before continuing.', 95, 44),
      point('Submit opens the review path when required documents are valid.', 95, 58),
    ],
  ),
  V10: image(
    'V10',
    'Review the saved application before final submission.',
    'Review and Submit application panel with fictional bank, personal, vehicle and document details.',
    [
      'Check each section against your documents.',
      'Scroll through the review before the final confirmation.',
    ],
  ),
  V11: image(
    'V11',
    'Submitted does not mean approved.',
    'Under Review status and five application sections marked In review.',
    [
      point('The overall state explains why driving is not yet available.', 95, 14),
      point('These tiles let you inspect what was submitted.', 95, 38),
    ],
  ),
  V12: image(
    'V12',
    'A targeted correction request in a sample application.',
    'Verification Rejected status requesting a clear exterior photo showing the plate.',
    [
      'Read the specific correction reason.',
      'Open the affected section instead of starting a second application.',
    ],
  ),
  M01: image(
    'M01',
    'An available balance and two sample ledger entries.',
    'Rider wallet showing 4500 naira available, a 500-naira hold and a 5000-naira top-up.',
    [
      point('Available balance is the amount currently usable.', 95, 9),
      point('History and Top Up are separate sections.', 95, 24),
      point('Entry type and reference explain the financial event.', 95, 44),
    ],
  ),
  M02: image(
    'M02',
    'Choose the top-up amount and an available payment method.',
    'Top Up page with amount, Card, Transfer, USSD, E-wallet and Continue.',
    [
      point('Enter the amount you intend to add.', 95, 34),
      point('Choose an available provider method.', 95, 57),
      point('Continue opens the next checkout stage; it is not a payment receipt.', 95, 83),
    ],
  ),
  M05: image(
    'M05',
    'The current driver wallet explains payout unavailability.',
    'Driver wallet with pending earnings, Payouts are not available yet notice and sample ride earnings.',
    [
      'Read the availability notice before looking for a withdrawal action.',
      'Ride earnings and a completed bank payout are different events.',
    ],
  ),
  M06: image(
    'M06',
    'A past journey in the sample rider’s history.',
    'Trip History screen showing the available sample journey record.',
    [
      'Match the date and route to the journey you need.',
      'For money movement, also check Wallet’s Payment History.',
    ],
  ),
  M08: image(
    'M08',
    'Referral progress in a sample account.',
    'Refer and earn screen with a sample referral, QR code, Invite and pending reward status.',
    [
      'Invite shares the referral supplied by the app.',
      'Pending, unlocked and paid are different milestones.',
    ],
  ),
  M09: image(
    'M09',
    'Decide how this ride will be paid.',
    'Cash and Wallet choices with their explanations and available wallet balance.',
    [
      'Cash is paid to the driver after the ride.',
      'Wallet uses the app’s balance and settlement flow.',
      'Review the choice again before confirming the request.',
    ],
  ),
  R04: image(
    'R04',
    'Review the route and payment choice before requesting.',
    'Confirm ride with Cash, YABATECH Main Gate pickup, Ojuelegba destination, Cancel and Confirm ride.',
    ['Check pickup and destination separately.', 'Use Change if the payment method is wrong.'],
  ),
  R06: image(
    'R06',
    'The driver card’s offer controls, shown as an app-panel detail.',
    'Olumide Bello’s sample driver card with pickup estimates, vehicle information and a 500-naira offer control.',
    [
      point(
        'The metric strip distinguishes driver and rider pickup estimates; it can scroll horizontally.',
        95,
        13,
      ),
      point('Check the name, vehicle and plate.', 95, 39),
      point('Edit the offer and send it once.', 95, 79),
    ],
    panel,
  ),
  R10: image(
    'R10',
    'A counteroffer is an amount to review, not an automatic agreement.',
    'Driver-card detail showing Counter offer 500 naira and Accept.',
    [
      'Read the current counter amount before Accept.',
      'The pickup and vehicle details still matter.',
    ],
    panel,
  ),
  R12: image(
    'R12',
    'A chosen driver with an agreed amount.',
    'Driver-card detail showing Agreed price 500 naira and Chosen.',
    [
      'Chosen identifies your current driver selection.',
      'It does not mean boarding has already been confirmed.',
    ],
    panel,
  ),
  R16: image(
    'R16',
    'The rider’s arrival panel.',
    'Driver has arrived panel with vehicle identity, plate, stops, fare, wait window and Remove driver.',
    [
      point('Compare this identity and plate before boarding.', 95, 28),
      point('Check the fare and pickup wait window.', 95, 56),
      point('Removing a driver is a separate action from boarding.', 95, 72),
    ],
  ),
  R19: image(
    'R19',
    'Completion, wallet settlement and optional feedback.',
    'Ride complete panel with a sample 500-naira wallet deduction, duration, distance and rating controls.',
    [
      point('The payment note tells you whether the wallet deduction is confirmed.', 95, 40),
      point('Rating and written feedback are optional.', 95, 58),
      point('Remind me later differs from Don’t ask again for this ride.', 95, 74),
    ],
  ),
  R22: image(
    'R22',
    'A failed matching refresh with recovery actions.',
    'Couldn’t update your matches screen with Reconnect and Back home.',
    [
      'Reconnect tries to restore the existing request.',
      'Back home is navigation; do not assume it confirms cancellation.',
    ],
  ),
  D02: image(
    'D02',
    'Choose how many passenger seats to offer on this route.',
    'Driver Confirm ride panel with origin, destination, four offered seats and Start trip.',
    [
      'Check the route you actually intend to drive.',
      'Offered seats are not a count of passengers already onboard.',
      'Start trip opens the route; it does not board a rider.',
    ],
  ),
  D05: image(
    'D05',
    'Read the identity and stops before answering an offer.',
    'Rider information panel with Aisha Adeoye, rating, one requested seat and pickup/drop-off.',
    [
      'Check the requested seats and rider identity.',
      'Pickup and drop-off are separate points on the shared journey.',
    ],
    panel,
  ),
  D10: image(
    'D10',
    'Confirm a real pickup after identifying the passenger.',
    'Driver pickup panel with Aisha, stops, fare, wait countdown and Confirm pickup; the sample map is waiting for driver location.',
    [
      point('Identify the passenger and check the requested seats.', 95, 28),
      point('Read the wait countdown.', 95, 57),
      point('Confirm pickup only for the passenger who is boarding.', 95, 64),
    ],
  ),
  D12: image(
    'D12',
    'The wait-decision controls appear when the timer ends.',
    'Driver pickup panel showing Wait time ended, Wait 1 more minute and Rider didn’t show.',
    [
      'Confirm pickup remains available if the rider has arrived.',
      'Choose a wait extension or no-show decision deliberately.',
    ],
  ),
  D13: image(
    'D13',
    'A selected pickup can remain confirmable when online capacity is zero.',
    'Driver pickup controls for a selected sample rider with no additional online capacity.',
    [
      'This example is an existing selected pickup, not permission to exceed vehicle capacity.',
      'Do not increase physical capacity to work around a contradictory state.',
    ],
  ),
  D16: image(
    'D16',
    'Reconcile the route’s gross fare, service fee and net earnings.',
    'Driver completion with sample totals of 500 naira gross, 75 fee, 425 net and a confirmed wallet earning.',
    [
      point('Gross, fee and net are different amounts.', 95, 23),
      point('Read the settlement note and per-rider line.', 95, 37),
      point('Return home after completion.', 95, 46),
    ],
  ),
  D17: image(
    'D17',
    'The dashboard summarises available activity.',
    'Driver Dashboard with sample profile, earnings and weekly charts.',
    [
      'Check the chart period before comparing totals.',
      'Use journey and wallet records to resolve a disputed amount.',
    ],
  ),
};

// One approved screenshot can explain more than one adjacent step.
helpScreenshots.M04 = helpScreenshots.M01;
helpScreenshots.R09 = helpScreenshots.R06;
helpScreenshots.R20 = helpScreenshots.R19;
