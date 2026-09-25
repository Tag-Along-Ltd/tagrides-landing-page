export const helpReview = {
  date: '2026-09-25',
  status: 'Published pre-launch app guides',
  frontendCommit: '94d74be8',
  newerMacCommit: '920bbcef',
  note: 'Source-reviewed guides with actual app UI and sample data. Screens illustrate the product; they do not represent completed customer transactions.',
};

export const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting started',
    description: 'Open the app, verify your account and understand shared routes.',
    icon: 'compass',
  },
  {
    id: 'riders',
    title: 'Riding with TagRides',
    description: 'Find a driver, agree a fare and get to the right pickup.',
    icon: 'route',
  },
  {
    id: 'drivers',
    title: 'Driving with TagRides',
    description: 'Complete registration, offer seats and manage your journey.',
    icon: 'car',
  },
  {
    id: 'money',
    title: 'Payments & earnings',
    description: 'Understand cash, your wallet, payment records and earnings.',
    icon: 'wallet',
  },
  {
    id: 'account',
    title: 'Your account',
    description: 'Manage your profile, find trip records and share your referral.',
    icon: 'user',
  },
  {
    id: 'support',
    title: 'Help when you need it',
    description: 'Resolve common problems and contact the right support channel.',
    icon: 'help',
  },
];

const step = (title, body, shots = []) => ({ title, body, shots });
const issue = (question, answer) => ({ question, answer });
const make = (category, slug, title, summary, options) => ({
  category,
  slug: `${category}/${slug}`,
  title,
  summary,
  before: [],
  steps: [],
  troubleshooting: [],
  related: [],
  ...options,
});

export const helpArticles = [
  make(
    'getting-started',
    'open-the-web-app',
    'Open TagRides on your phone',
    'Start in your browser, allow location access and learn where to find the main controls.',
    {
      before: [
        'Use a phone with mobile data or Wi-Fi and device location switched on.',
        'Start at app.tagrider.com. The main tagrider.com website explains the product; it is not the ride-request screen.',
      ],
      steps: [
        step(
          'Open the app',
          'Visit **https://app.tagrider.com/signin** in your phone browser. Wait for the TagRides opening screen to finish. Sign in with the phone number you use for your account.',
          ['G01', 'G03'],
        ),
        step(
          'Allow location when asked',
          'When the browser asks to use your location, choose **Allow**. If the app shows **Enable location**, tap **Enable**. Turn on device location as well as browser permission; one does not replace the other.',
        ),
        step(
          'Check that your position makes sense',
          'Let the position settle before choosing a destination. A GPS estimate can drift indoors. If the pin is clearly wrong, move to a place with a clearer signal and retry. Do not place a pickup across a divided road simply to make the route appear.',
          ['R01'],
        ),
        step(
          'Find the menu',
          'Open the menu on the home screen for **Profile**, **Wallet**, **History** and **Help & Support**. Driver options appear according to your role and verification status. You can return to the home screen to begin a journey.',
        ),
      ],
      outcome:
        'You can open the app, access your account and see a usable current position before requesting or offering a ride.',
      troubleshooting: [
        issue(
          'Location stays unavailable',
          'Check both phone location settings and this website’s browser permission. Return to TagRides and use **Retry**. Your destination may remain saved while location is being refreshed.',
        ),
        issue(
          'The app keeps loading',
          'Check your connection and wait briefly. If it remains stuck, record the message and contact support. Avoid clearing browser storage during an active trip or document upload.',
        ),
      ],
      related: [
        'getting-started/sign-in',
        'getting-started/location-and-coverage',
        'support/reconnect-and-update',
      ],
    },
  ),
  make(
    'getting-started',
    'sign-in',
    'Sign in or create your account',
    'Verify your phone number first, then complete any account details the app requests.',
    {
      before: [
        'Have access to the phone number you enter.',
        'If you are joining as a driver, use app.tagrider.com/signin?intent=drive.',
      ],
      steps: [
        step(
          'Enter your phone number',
          'On **Welcome to TagRides**, choose the correct country code and enter your phone number. Check the full number carefully before asking for a code.',
          ['G03'],
        ),
        step(
          'Request and enter the code',
          'Tap **Get Code** when shown. Enter the verification code sent to your phone, then use the screen’s continuation action. Use the most recent code if you requested another one.',
          ['G04'],
        ),
        step(
          'Follow the next screen',
          'TagRides checks whether the number already belongs to an account. Existing users continue into the app; new or incomplete accounts may be asked for their name and email. You do not need a second account to become a driver.',
          ['G06'],
        ),
        step(
          'Complete email verification if requested',
          'Enter your **First Name**, **Last Name** and **Email**, then follow **Send Verification Email**. A displayed Google or Apple option can help verify email, but it does not replace the required phone step.',
        ),
      ],
      outcome:
        'Your phone is verified and the app either opens your account or clearly tells you which account-verification step remains.',
      troubleshooting: [
        issue(
          'The code has not arrived',
          'Check the number and wait for the resend timer. Use **Get Code** again when it becomes available. Repeated requests can trigger a temporary limit.',
        ),
        issue(
          'The code is rejected',
          'Check that you entered the newest code and that it has not expired. Request another when allowed; do not create another account as a workaround.',
        ),
        issue(
          'Someone asks for your code',
          'Do not share it. Support does not need your OTP, password or PIN to explain an account problem.',
        ),
      ],
      related: ['getting-started/verify-email', 'drivers/get-verified', 'support/contact-support'],
    },
  ),
  make(
    'getting-started',
    'verify-email',
    'Verify your email and return to the app',
    'Finish the email step, including what to do with an expired or invalid link.',
    {
      steps: [
        step(
          'Confirm the email address',
          'Check the address in the account form before tapping **Send Verification Email**. The **Verify your email** screen tells you where the link was sent.',
          ['G06'],
        ),
        step(
          'Open the latest email',
          'Open your inbox and follow the secure verification link. Check spam or junk if the message is missing. Use the newest email if you requested another link.',
        ),
        step(
          'Read the result',
          'A successful link confirms your email. Return to the TagRides browser tab or app and allow it to refresh your account status. If the result says the link is expired or invalid, return to the verification flow and request a fresh link.',
          ['G07'],
        ),
        step(
          'Continue the right journey',
          'Riders continue towards the ride home screen. Drivers continue with driver introduction or verification. Seeing a verified email does not mean your driver application has been approved.',
        ),
      ],
      outcome:
        'The app recognises your verified email and moves you to the next appropriate screen.',
      troubleshooting: [
        issue(
          'The app is still waiting after I verified',
          'Return to the original app tab and give it time to refresh. If necessary, reopen the app and sign in with the same phone number. Contact support if the verified result and account state still disagree.',
        ),
        issue(
          'I used the wrong email',
          'Correct it through the available account-verification flow before continuing. If that option is unavailable, contact support rather than registering the same identity again.',
        ),
      ],
      related: ['getting-started/sign-in', 'drivers/get-verified'],
    },
  ),
  make(
    'getting-started',
    'how-along-works',
    'Understand Along Shared before your first trip',
    'Different destinations can share a useful route. Here is how the journey fits together.',
    {
      steps: [
        step(
          'Start with the driver’s route',
          'An **Along** driver is already travelling towards a chosen destination. TagRides looks for a useful overlap with the rider’s journey. People in the same vehicle can get off at different stops; they do not all need one destination.',
        ),
        step(
          'Expect a practical meeting point',
          'Your pickup may be on the driver’s route rather than exactly where you are standing. Read the walking and pickup guidance before choosing. Location, direction, available seats and a usable meeting point all matter.',
          ['R08'],
        ),
        step(
          'Agree the fare, then choose',
          'Review the offer shown for your request. Where negotiation is available, propose an offer or accept a counteroffer. **Agreed price** and **Chosen** describe different steps: the fare is agreed first, and the chosen-driver state identifies your current selection.',
          ['R09', 'R12'],
        ),
        step(
          'Treat boarding as its own confirmation',
          'Choosing a driver is not the same as being onboard. Follow the arrival guidance, identify the correct person and vehicle, and wait for pickup confirmation to move the app into the in-ride state. Availability can change before that point.',
        ),
      ],
      outcome:
        'You understand the route-sharing model, the meeting point and the difference between agreeing, choosing and boarding.',
      note: 'Along is the current journey covered by these guides. Direct is not available in the live journey described by the current app FAQ. Do not plan a dedicated Direct booking around these instructions.',
      troubleshooting: [
        issue(
          'Why did someone else receive a match?',
          'Two nearby people may have different directions, requested seats or walking access. A useful overlap—not just distance between phones—determines whether a match can work.',
        ),
      ],
      related: ['riders/request-a-ride', 'drivers/start-an-along-trip', 'riders/agree-and-choose'],
    },
  ),
  make(
    'getting-started',
    'location-and-coverage',
    'Understand your pin, pickup and service area',
    'A road appearing on the map does not automatically mean rides are available there.',
    {
      steps: [
        step(
          'Separate the three locations',
          '**Current location** is your device’s estimate. **Pickup** is where you meet. **Destination** is where you want to go. Check all three; a familiar area name is not an exact roadside instruction.',
          ['R04'],
        ),
        step(
          'Check the active area',
          'The app can show map roads and search results beyond the area where requests are accepted. If it says the area is not served, do not move the pin to a false location to get through the check.',
        ),
        step(
          'Read the approach',
          'Follow the relevant walking or driver-approach instruction. Check the road side, entrance and public landmark. If the proposed approach is impractical, use the available contact option and resolve it before boarding.',
          ['R15'],
        ),
        step(
          'Refresh a poor GPS fix',
          'Enable location for both phone and browser. If **Location unavailable** appears, check the settings and tap **Retry**. If the route itself fails after the position is ready, use **Retry route** when shown.',
        ),
      ],
      outcome: 'Your request uses a real position and a meeting point both parties can identify.',
      troubleshooting: [
        issue(
          'The name is vague or wrong',
          'Use the map position as well as the label. Report the public landmark, road side and problematic label to support. Do not publish your home coordinates in public screenshots.',
        ),
        issue(
          'No driver appears inside the service area',
          'Coverage is not a promise of available supply. A driver with a compatible route and sufficient seats still needs to be available.',
        ),
      ],
      related: ['riders/find-your-pickup', 'riders/cancel-or-recover'],
    },
  ),
  make(
    'riders',
    'request-a-ride',
    'Request your first Along ride',
    'Set your destination, check the route and choose how to pay before searching for drivers.',
    {
      before: [
        'Sign in and allow location access.',
        'Know the destination and how many people are travelling with you.',
      ],
      steps: [
        step(
          'Choose where you are going',
          'On Rider Home, tap **Where are you going?** and search for your destination. Choose the result whose name and location match the place you intend to reach.',
          ['R01', 'R03'],
        ),
        step(
          'Review the route',
          'Check your current location, pickup and destination on the route preview. Read any walking requirement. Correct an inaccurate location before sending the request.',
          ['R04'],
        ),
        step(
          'Set the request details',
          'Choose **Along** and the correct number of seats wherever the passenger control is shown. Include everyone travelling with you. Do not assume a displayed fare should be multiplied again; review the amount shown for your request.',
        ),
        step(
          'Choose payment and request',
          'Select **Cash** or **Wallet** from **How would you like to pay?**, then **Continue**. Review the final details and use the request action. Wait for the app to move into matching rather than submitting repeatedly.',
        ),
      ],
      outcome:
        'The matching screen opens for one request and begins showing compatible drivers, or explains why no match is available.',
      troubleshooting: [
        issue(
          'Wallet cannot be selected',
          'Check the balance shown. The app may ask you to top up to meet the required amount or offer **Use cash instead**.',
        ),
        issue(
          'The route does not build',
          'Resolve location permission and GPS first. If it still fails, use the route retry or contact support with the pickup and destination.',
        ),
      ],
      related: ['riders/compare-drivers', 'money/cash-or-wallet', 'riders/cancel-or-recover'],
    },
  ),
  make(
    'riders',
    'compare-drivers',
    'Read the driver cards and map',
    'Compare the whole pickup—not just the lowest fare.',
    {
      steps: [
        step(
          'Read the person and vehicle',
          'Each card identifies a driver and vehicle. Check the name, rating, vehicle description and plate where available. A **Keke** is a tricycle; confirm that it can accommodate your whole group.',
          ['R06'],
        ),
        step(
          'Separate walking from driving',
          'Read which time or distance belongs to you and which belongs to the vehicle. An arrival estimate can change as traffic and location updates change. It is not a guaranteed arrival time.',
          ['R08'],
        ),
        step(
          'Check fare and seats',
          'Compare the displayed offer, the available seats and your requested seats. A fare agreement does not mean a passenger is already onboard. Read the current state alongside the price.',
        ),
        step(
          'Explore alternatives',
          'Swipe through the cards or open the driver-options surface. Viewing a card and choosing it are different actions. Look at the selected-driver strip to identify your current chosen driver.',
          ['R07'],
        ),
      ],
      outcome:
        'You can explain who would pick you up, where you would meet, what the offer is and whether the vehicle fits your party.',
      troubleshooting: [
        issue(
          'A card disappears',
          'The driver may have moved beyond a useful overlap, ended the route, lost availability or filled the vehicle. Review the remaining options rather than following a stale screenshot.',
        ),
        issue(
          'A marker is close but the pickup takes longer',
          'A nearby marker can be on the other side of a divided road or need a longer road approach. Use route guidance, not straight-line distance alone.',
        ),
      ],
      related: ['riders/agree-and-choose', 'riders/find-your-pickup'],
    },
  ),
  make(
    'riders',
    'agree-and-choose',
    'Agree a fare and choose a driver',
    'Understand an offer, a counteroffer and the chosen-driver confirmation.',
    {
      steps: [
        step(
          'Review the current offer',
          'Open the driver card and read the trip details and amount. If an editable offer is available, enter an amount within the displayed rules and submit it once.',
          ['R09'],
        ),
        step(
          'Respond to a counteroffer',
          'If the driver proposes a different amount, decide whether it works for you before accepting. Negotiation is deliberately short; it is not an unlimited back-and-forth auction.',
          ['R10'],
        ),
        step(
          'Choose after agreement',
          'When the card shows **Agreed price** and **Choose**, check the amount and tap **Choose**. Wait for **Chosen** or the selected-driver strip. A loading indicator alone is not confirmation.',
          ['R12'],
        ),
        step(
          'Recheck after a switch',
          'Before boarding, another driver may remain available through **Change driver** or **Switch driver**. Read that driver’s fare, vehicle and pickup again. Do not board based on the first driver’s details after switching.',
        ),
      ],
      outcome:
        'The app clearly identifies your chosen driver and agreed amount, ready for the pickup step.',
      troubleshooting: [
        issue(
          'The offer expired',
          'Read the latest available offer. Driver position and capacity change; an old amount cannot be assumed valid.',
        ),
        issue(
          'The action was not confirmed',
          'Stay on the current request and check the updated status before retrying. Do not assume success or send repeated taps while the request is processing.',
        ),
        issue(
          'More riders want the vehicle than there are seats',
          'Read the capacity warning and consider another valid option. A queue position is not a promise of pickup order.',
        ),
      ],
      related: ['riders/find-your-pickup', 'riders/cancel-or-recover', 'money/payment-records'],
    },
  ),
  make(
    'riders',
    'find-your-pickup',
    'Find your driver and board the right vehicle',
    'Use the arrival instructions, roadside landmark and identity details together.',
    {
      steps: [
        step(
          'Read what you should do next',
          '**Walk to your driver** means you need to reach the displayed meeting point. **Wait at pickup**, **Be ready at pickup** or **Head to pickup now** describe different stages of the vehicle’s approach. Follow the current instruction.',
          ['R15'],
        ),
        step(
          'Confirm the meeting place',
          'Check the exact entrance or roadside landmark, not just the general address. Stay on a practical road side. If the pin or approach is unclear, use the available contact option before moving.',
        ),
        step(
          'Identify the driver and vehicle',
          'When **Driver has arrived** appears, compare the driver name, vehicle and plate with what is in front of you. Check **Your fare** and the **Wait window**. Do not board a different vehicle simply because it is nearby.',
          ['R16'],
        ),
        step(
          'Check the boarding transition',
          'Board only after both parties identify the trip. Allow the pickup confirmation to complete and check that the app enters **In ride**. If it still shows a pending pickup, clarify that before setting off.',
        ),
      ],
      outcome:
        'You are in the correct vehicle and the app recognises that the journey has started.',
      troubleshooting: [
        issue(
          'The wait window ends',
          'Follow the message to choose another driver or cancel the request. Contacting a driver does not automatically extend the timer.',
        ),
        issue(
          'The driver or plate does not match',
          'Do not board. Use the app’s help/contact option to report the mismatch.',
        ),
        issue(
          'The GPS pin is on the other side of the road',
          'Do not cross unsafely to follow a line. Clarify a usable meeting point with the driver.',
        ),
      ],
      related: ['riders/during-and-after-your-ride', 'support/contact-support'],
    },
  ),
  make(
    'riders',
    'during-and-after-your-ride',
    'Follow your ride and check the receipt',
    'Know what to watch during the journey and what completion means for payment.',
    {
      steps: [
        step(
          'Follow the active journey',
          'Use the in-ride map, driver details, destination and estimated progress. Other riders may have different stops along the shared route. Keep the app available for updates.',
          ['R17'],
        ),
        step(
          'Use the trip controls deliberately',
          'Use the available contact or trip-assistance controls if you need help. If **Stop here** is offered, request a practical stopping point and wait for acknowledgement; sending a stop request is not the same as a completed drop-off.',
        ),
        step(
          'Read Ride complete',
          'At the end, check **Trip stops**, **Total fare**, **Duration** and **Distance**. Read the payment note: cash requires payment to the driver; a confirmed wallet deduction means the amount has been taken from your wallet. A processing/pending message is not a final deduction.',
          ['R19'],
        ),
        step(
          'Leave feedback if you wish',
          'Rate your driver and add a short note, then **Submit**. Choose **Remind me later** to postpone feedback, or **Don’t ask again for this ride** to decline it for that journey. Keep a payment problem separate from the rating: report it through support with the trip and payment details.',
          ['R20'],
        ),
      ],
      outcome:
        'The journey has ended, you understand its payment state and you can find the record again in History or Wallet.',
      troubleshooting: [
        issue(
          'The receipt amount differs from the agreed fare',
          'Do not assume an unexplained increase is normal. Record the trip, the agreed amount and receipt amount, then contact support. Planned Direct shared-fare savings do not explain an Along discrepancy.',
        ),
        issue(
          'The app is offline at the end',
          'Reconnect and allow the trip record to restore. Check the final status before repeating a payment or assuming a wallet charge succeeded.',
        ),
      ],
      related: ['money/payment-records', 'account/trip-history', 'support/contact-support'],
    },
  ),
  make(
    'riders',
    'cancel-or-recover',
    'Handle no matches, cancellation or a lost connection',
    'Recover without creating duplicate requests or mistaking an old screen for current availability.',
    {
      steps: [
        step(
          'Identify the kind of problem',
          'An empty result means no suitable driver is currently shown. **Couldn’t update your matches** means the app could not refresh the request. Those are different problems; check the message before starting again.',
          ['R05', 'R22'],
        ),
        step(
          'Reconnect the existing request',
          'For a connection problem, restore data/Wi-Fi and use **Reconnect**. Wait for a current result. If you leave using **Back home**, check whether the app offers to resume the existing request before creating another one.',
        ),
        step(
          'Choose another valid option',
          'If the selected driver is gone or full, read the reason and any current alternatives. Recheck the new driver’s pickup, vehicle and amount rather than assuming the original arrangement still applies.',
          ['R13', 'R14'],
        ),
        step(
          'Cancel intentionally',
          'If you no longer want to travel, use **Cancel Request** or the current cancellation control and read the confirmation. Wait for the acknowledged outcome. Closing a browser tab is not a reliable way to cancel.',
          ['R21'],
        ),
      ],
      outcome:
        'You have either resumed one current request, selected another valid option or received a confirmed cancellation.',
      troubleshooting: [
        issue(
          'Money is still held after cancellation',
          'Check Wallet for **Funds Released** or the relevant transaction state. If the hold remains unavailable, contact support with the trip and payment reference.',
        ),
        issue(
          'The same recovery screen returns',
          'Send support the visible message and what happened immediately before it. Do not clear all browser data while a trip or payment may still be active.',
        ),
      ],
      related: ['money/payment-records', 'support/reconnect-and-update'],
    },
  ),
  make(
    'drivers',
    'get-verified',
    'Complete your driver registration',
    'A guided path through all five sections—from your bank details to the final submission.',
    {
      featured: true,
      before: [
        'Verify your phone and email first. Use the same account you would use as a rider.',
        'Have your bank account, identity/licence details, vehicle details and clear document files ready.',
        'Registration and review are separate. Finishing the form does not immediately authorise driving.',
      ],
      steps: [
        step(
          'Open driver verification',
          'Choose **Switch to Driver** from the menu or enter through the driver sign-in link. Follow the introduction, then tap **Start verification** on Driver Home. The step indicator shows where you are in the application.',
          ['V01', 'V02'],
        ),
        step(
          'Complete Account Details',
          'Choose your bank and enter the account number. Wait for the account name to resolve and confirm that it is yours. Tap **Next** after the form accepts the details. Bank setup records where eligible earnings would be paid; it does not itself enable withdrawals.',
          ['V03'],
        ),
        step(
          'Complete Driver Details',
          'Enter your **National ID**, **Driver License**, **Next of Kin Name**, **Next of Kin Phone** and **Relationship**. Check for inline validation errors, then **Next**. Use the separate personal-details guide if a format is rejected.',
          ['V04'],
        ),
        step(
          'Complete Vehicle Details',
          'Choose the actual vehicle class and supply its make/model, year, colour, plate and passenger-seat count. Use **Tricycle**, the keke option, rather than choosing a car model just to continue.',
          ['V05', 'V06'],
        ),
        step(
          'Add Vehicle Documents, then Driver Documents',
          'Follow the required list for your vehicle class. Choose readable files, add expiry dates where requested and inspect each preview. Use **Next** to move between sections and **Submit** at the end of the document flow.',
          ['V07', 'V08'],
        ),
        step(
          'Review and confirm',
          'On **Review & Submit**, inspect all five sections. Correct omissions before **Confirm & Submit**. Keep the app open while it saves details and uploads files. Wait for the successful submission message and the pending/under-review state.',
          ['V10', 'V11'],
        ),
      ],
      outcome:
        'Your application is submitted for review and the app shows its status. You can return to review what you submitted.',
      troubleshooting: [
        issue(
          'A section is Incomplete',
          'Open that section, fill the missing required field or file, and use its save/submit action. A selected local file is not necessarily an uploaded document.',
        ),
        issue(
          'Submission fails partway through',
          'Read the failing stage and retry after restoring the connection. Check what the app has saved before selecting every file again.',
        ),
        issue(
          'The application is still under review',
          'Wait for a review decision or contact support about the status. Do not create another account or submit misleading details to unlock driving.',
        ),
      ],
      related: [
        'drivers/personal-and-bank-details',
        'drivers/add-car-or-keke',
        'drivers/upload-documents',
        'drivers/correct-and-resubmit',
      ],
    },
  ),
  make(
    'drivers',
    'personal-and-bank-details',
    'Fill in bank and personal details correctly',
    'Understand the fields, their formats and the confirmation to look for before continuing.',
    {
      steps: [
        step(
          'Select the bank and resolve the account',
          'In **Account Details**, choose the bank, enter the account number and wait for the resolved account name. Check the name before **Next**. If resolution fails, correct the bank/number or retry the lookup; an unresolved entry is not a verified destination.',
          ['V03'],
        ),
        step(
          'Enter your identity and licence',
          'In **Driver Details**, **National ID** expects an 11-digit NIN. **Driver License** accepts the supported licence-number format shown by the form. Enter the number from your own document, not the document’s filename.',
          ['V04'],
        ),
        step(
          'Add your next of kin',
          'Enter the person’s name, a valid contact number and your relationship. Review the country/number format and ask them before using their details. This is separate from your account’s sign-in phone.',
        ),
        step(
          'Save and check the summary',
          'Use **Next** in first-time registration, or **Submit Section** when editing a section. Review the corresponding **Bank account** and **Personal information** tiles later to confirm the saved values.',
        ),
      ],
      outcome:
        'The correct account name and your own personal details appear in the verification summary.',
      troubleshooting: [
        issue(
          'The account name looks wrong',
          'Stop and check the bank and account number. Do not accept another person’s resolved name simply to progress.',
        ),
        issue(
          'The keyboard covers the action',
          'Tap outside the field or scroll the form to dismiss the keyboard and reveal the action. If the action remains inaccessible, report your phone and browser.',
        ),
        issue(
          'Editing an approved application shows a warning',
          'Read it before continuing. Editing can return the application to re-verification and temporarily prevent driving.',
        ),
      ],
      related: ['drivers/get-verified', 'drivers/correct-and-resubmit'],
    },
  ),
  make(
    'drivers',
    'add-car-or-keke',
    'Add your car or keke',
    'Choose the right vehicle class and make the vehicle easy for riders to identify.',
    {
      steps: [
        step(
          'Choose the actual vehicle class',
          'Open **Vehicle Details**. Use **Car** for a car or **Tricycle**, the keke option, for a keke. The class should determine the appropriate vehicle details and documents. If a saved keke returns as Car or shows inappropriate car-only requirements, stop and contact support before submitting.',
          ['V05', 'V06'],
        ),
        step(
          'Identify the make, model and year',
          'Select the matching make/model when the app provides a list. Keke and other supported manual-entry classes allow you to describe the vehicle. If you change the make or year, recheck the model rather than leaving an incompatible selection.',
        ),
        step(
          'Check colour and plate',
          'Choose the actual colour and enter the registration plate. Follow the format hint, such as **ABC123DE** or **ABC-123-DE**. Confirm the plate against the vehicle and its document; spelling mistakes make pickup identification harder.',
        ),
        step(
          'Set passenger capacity',
          'Enter the genuine number of passenger seats available in the vehicle. This is not the driver’s seat and not a count of people already waiting for rides. Later, **Seats offered this trip** lets you offer an appropriate portion of the vehicle’s passenger capacity.',
        ),
        step(
          'Continue to the right document list',
          'Tap **Next** or **Submit Section** as appropriate. Check that the next document screen corresponds to the selected vehicle class. A missing car model should not force a keke into the wrong category.',
        ),
      ],
      outcome:
        'Your summary identifies the right vehicle and capacity, and riders will have useful details to recognise it.',
      troubleshooting: [
        issue(
          'My model is missing',
          'Use manual entry if the selected class provides it. Otherwise contact support with the class, make and model instead of choosing an unrelated vehicle.',
        ),
        issue(
          'The plate is already registered',
          'Check for a typing error, then contact support if the plate genuinely belongs to your vehicle. Do not substitute another plate.',
        ),
        issue(
          'The displayed seat count seems too high',
          'Correct it before offering a trip and report the discrepancy. Do not use a default number that exceeds the real passenger capacity.',
        ),
      ],
      related: [
        'drivers/upload-documents',
        'drivers/start-an-along-trip',
        'drivers/manage-pickups',
      ],
    },
  ),
  make(
    'drivers',
    'upload-documents',
    'Upload clear documents and check their status',
    'Know what to upload, when an expiry date is needed and when a file has really been submitted.',
    {
      before: [
        'Use readable files within the size/type limits shown by the upload control.',
        'Keep each document’s text, edges and required identifying details visible.',
      ],
      steps: [
        step(
          'Follow your current required list',
          'Open **Vehicle Documents** or **Driver Documents**. The vehicle list depends on the chosen class. Car and keke requirements differ; follow the required markers in your current form rather than another driver’s checklist.',
          ['V07', 'V08'],
        ),
        step(
          'Choose one file for the correct field',
          'Tap the file control for that document and choose the matching photo or PDF. On web, the browser’s file picker controls the available sources. In an installed app, available camera/gallery choices depend on the device and screen.',
        ),
        step(
          'Supply the expiry date when requested',
          'Enter the date printed on the document for fields that require one. Do not invent a future date to clear a validation error. Fields without an expiry requirement do not need an arbitrary date.',
        ),
        step(
          'Inspect the preview',
          'Use **View** or the preview control to check that the correct file is legible. If it is wrong, replace it before submitting. **Submitted file — tap to replace** refers to an existing uploaded file.',
          ['V09'],
        ),
        step(
          'Submit and read the resulting state',
          'Continue with **Next**, **Submit** or **Submit Section** as shown. Wait for the upload/submission acknowledgement. **Selected**, **uploaded/submitted** and **Approved** represent different stages; choosing a file does not approve it.',
        ),
      ],
      outcome:
        'The intended documents appear in the submission/summary with the appropriate pending or reviewed status.',
      troubleshooting: [
        issue(
          'The file is too large or cannot open',
          'Choose a supported file within the displayed limit. A clear, smaller image is better than an unreadable compressed image. Retry with another file if the preview cannot open it.',
        ),
        issue(
          'A document is rejected',
          'Read the specific reason, replace the affected file or correct its date, and resubmit that section. See the correction guide before editing an already approved application.',
        ),
        issue(
          'An upload was interrupted',
          'Restore the connection and check saved status. Retry the incomplete upload; do not assume it succeeded because the filename is visible.',
        ),
      ],
      related: ['drivers/get-verified', 'drivers/add-car-or-keke', 'drivers/correct-and-resubmit'],
    },
  ),
  make(
    'drivers',
    'correct-and-resubmit',
    'Understand review status and correct a rejected section',
    'Return to the right section without confusing a saved draft with an approved application.',
    {
      steps: [
        step(
          'Read the overall status',
          '**Under Review** means the application is awaiting a decision. **Verification needs another look** asks for corrections. **Updates in progress** means edits are underway. **Verified** is a review result; the app still checks eligibility before enabling a trip.',
          ['V11', 'V12', 'V13'],
        ),
        step(
          'Open the section that needs attention',
          'Tap **Fix and resubmit**, or open the verification summary. Look for **Needs update** and read its reason. Use **Edit this section** on the relevant Bank account, Personal information, Vehicle or document tile.',
        ),
        step(
          'Read any re-verification warning',
          'If the app asks **Edit this section?**, understand that changes may send the application back for review and prevent driving until approved again. Choose **Edit anyway** only when you intend to make the correction.',
        ),
        step(
          'Correct and submit',
          'Update the actual field/file, then **Submit Section**. Review the summary and complete any final submission requested by the app. Wait for acknowledgement and check that the revised application is pending review again.',
        ),
      ],
      outcome:
        'Your corrected information is submitted, with a clear new status rather than an unresolved draft.',
      troubleshooting: [
        issue(
          'I cannot load my verification status',
          'Use **Try again** or **Retry verification check** after checking the connection. A failed status lookup does not mean your previous application disappeared.',
        ),
        issue(
          'One tile says Approved but I cannot drive',
          'Individual section approval is not whole-application eligibility. Check all sections and the overall home status; contact support if they disagree.',
        ),
      ],
      related: ['drivers/get-verified', 'drivers/upload-documents', 'support/contact-support'],
    },
  ),
  make(
    'drivers',
    'start-an-along-trip',
    'Offer seats along your route',
    'Set your own destination and offer the seats you can genuinely provide.',
    {
      before: [
        'Complete driver verification and wait for the app to enable driving.',
        'Set up the journey while safely stationary.',
      ],
      steps: [
        step(
          'Open Driver Home',
          'Switch to the driver role. If a verification message replaces the route controls, resolve that status first. Allow location access and wait for the current position to settle.',
          ['D01'],
        ),
        step(
          'Choose your destination',
          'Select **Along** and search for the place you actually intend to reach. Check the result and route. This destination describes your journey; passengers can join useful portions of it.',
        ),
        step(
          'Review the offered seats',
          'On **Confirm ride**, review **Current location**, **Destination** and **Seats offered this trip**. Offer only seats you can provide, accounting for passengers already in the vehicle.',
          ['D02'],
        ),
        step(
          'Start once and wait for confirmation',
          'Tap **Start trip**. Wait for the driver marketplace/journey screen. Incoming requests are opportunities to review, not proof that riders have boarded.',
          ['D03'],
        ),
      ],
      outcome:
        'The app shows an active Along route with the correct destination and offered capacity.',
      troubleshooting: [
        issue(
          'Start trip is unavailable',
          'Check verification eligibility, location and route readiness. Do not make another account to bypass an incomplete application.',
        ),
        issue(
          'No offers arrive',
          'There may be no rider with a suitable overlap, pickup or requested capacity. Check network status and the active service area; a route being online does not guarantee demand.',
        ),
      ],
      related: [
        'drivers/read-and-answer-offers',
        'drivers/manage-pickups',
        'getting-started/location-and-coverage',
      ],
    },
  ),
  make(
    'drivers',
    'read-and-answer-offers',
    'Read a rider request and answer the offer',
    'Review the route, requested seats and expected earnings before accepting.',
    {
      steps: [
        step(
          'Identify the rider and journey',
          'Read the rider’s name and requested seats, pickup and drop-off. Distinguish the time to reach pickup from the passenger’s trip length. A short straight-line distance may still involve a difficult road approach.',
          ['D05'],
        ),
        step(
          'Separate fare from earnings',
          '**Rider’s offer** is the offered gross fare. **You’ll receive** is the quoted driver amount after the applicable service fee. They are not two payments to collect. Read the current quote rather than applying a fee percentage from memory.',
        ),
        step(
          'Accept or counter',
          'If the offer works for the route, use **Accept**. Where a counter control is available, adjust the amount and send it once. **Awaiting rider** means your counter still needs the rider’s response.',
          ['D06'],
        ),
        step(
          'Watch the confirmed state',
          'Wait for the card or journey board to update. An agreed fare, an upcoming pickup and an onboard passenger are separate states. Use the confirmed pickup list to decide whom you are meeting next.',
        ),
      ],
      outcome:
        'The request shows the acknowledged offer/pickup state and you understand the amount and route involved.',
      troubleshooting: [
        issue(
          'Offer response was not confirmed',
          'Check the latest price and availability before retrying. Do not treat a timeout as acceptance or keep tapping while processing.',
        ),
        issue(
          'The request disappears',
          'The rider may choose someone else or the route/availability may change. Do not count the request as completed income.',
        ),
        issue(
          'The quoted net changes',
          'Review the latest confirmed amount. If the accepted fare, fee and completion record cannot be reconciled, report the request and amounts to support.',
        ),
      ],
      related: ['drivers/manage-pickups', 'drivers/finish-and-check-earnings'],
    },
  ),
  make(
    'drivers',
    'manage-pickups',
    'Manage pickups, waiting riders and seats',
    'Know who is waiting, who is onboard and when to confirm each pickup.',
    {
      featured: true,
      steps: [
        step(
          'Read the journey board',
          'The pickup count identifies riders awaiting pickup; **agreed** refers to fare agreements; **Onboard** identifies passengers already recorded in the vehicle. A party may occupy more than one seat, so passenger and request counts can differ.',
          ['D08', 'D09'],
        ),
        step(
          'Arrive at the correct point',
          'Use the next-pickup guidance and confirm the rider’s identity and destination. If several riders share a stop, check each person individually rather than assuming one confirmation boards everyone.',
          ['D10'],
        ),
        step(
          'Confirm actual boarding',
          'When the passenger is there and ready to board, tap **Confirm pickup** once. Wait for acknowledgement and the onboard state. Do not use pickup confirmation to reserve a person who has not arrived.',
        ),
        step(
          'Handle the wait window',
          'Read the countdown in the pickup sheet. When the app offers a wait decision, choose **Wait 1 more minute** or **Rider didn’t show** as appropriate. A wait extension takes effect after acknowledgement, not simply after the tap.',
          ['D12'],
        ),
        step(
          'Keep capacity truthful',
          '**Seats** describes current online availability; **Onboard** describes occupied passenger seats. **FULL** can include capacity committed to pending pickups and does not necessarily mean every seat is already occupied. Follow the specific pickup status; never carry more people than the real passenger capacity.',
          ['D13'],
        ),
      ],
      outcome:
        'Each boarded rider moves to onboard state, remaining pickups stay clear and the seat count reflects the journey.',
      troubleshooting: [
        issue(
          'No seats left blocks a pickup I expected',
          'Check whether the rider is an acknowledged reserved pickup and whether other passengers use the capacity. Do not increase the physical vehicle capacity as a workaround. Report a contradictory state.',
        ),
        issue(
          'Confirmation fails',
          'Keep the rider/stop visible, restore connectivity and retry only when the action is available. Do not assume the app recorded the passenger.',
        ),
        issue(
          'A pickup is released',
          'Read the updated roster. A released pickup is not an onboard passenger; the rider may have switched or the pickup may have ended.',
        ),
      ],
      related: [
        'drivers/read-and-answer-offers',
        'drivers/finish-and-check-earnings',
        'support/contact-support',
      ],
    },
  ),
  make(
    'drivers',
    'finish-and-check-earnings',
    'Complete drop-offs and review your earnings',
    'Close each passenger journey before checking the final route summary.',
    {
      steps: [
        step(
          'Follow the next drop-off',
          'Use the next-stop details and the onboard roster. Different passengers can have different destinations. Match the displayed rider to the person leaving the vehicle.',
        ),
        step(
          'Confirm the passenger’s drop-off',
          'At the correct stopping point, complete the drop-off action and any optional rating. Wait for the server-acknowledged change before assuming that passenger has left the onboard list or the seat has been released.',
          ['D15'],
        ),
        step(
          'Continue to the remaining stops',
          'Check the new next stop after each completion. If a rider requests an earlier stop through the app, acknowledge the situation and stop somewhere practical; the original destination may no longer be the active stop.',
        ),
        step(
          'Read the final summary',
          'At the end of your route, compare **Gross rider fares**, **TagRides service fees**, **Net earnings** and the per-trip lines. Read the settlement note. **Settlement pending** and mixed cash/wallet records are not proof that every amount has reached a withdrawable wallet.',
          ['D16'],
        ),
        step(
          'Return home and keep the records',
          'Use **Return to driver home** after the route is complete. Consult **History** for journeys and **Wallet** for financial entries when reconciling the day.',
        ),
      ],
      outcome:
        'Every passenger’s trip is completed and your route summary can be reconciled with the underlying records.',
      troubleshooting: [
        issue(
          'The session still shows a passenger after drop-off',
          'Check connectivity and the last confirmation result. Do not start a duplicate journey to clear the screen.',
        ),
        issue(
          'Cash and wallet totals are mixed',
          'Separate cash collected from wallet-settled income. A summary can report the journey economics without proving a bank payout.',
        ),
        issue(
          'The app does not return home',
          'Record the remaining stop/status and contact support. Avoid clearing session data while completion is uncertain.',
        ),
      ],
      related: ['money/driver-payouts', 'money/payment-records', 'account/trip-history'],
    },
  ),
  make(
    'drivers',
    'dashboard',
    'Understand your driver dashboard',
    'Use earnings and ride summaries without confusing missing data with zero activity.',
    {
      steps: [
        step(
          'Open Dashboard',
          'In driver mode, open the menu and choose **Dashboard**. Check the profile, vehicle and verification information before reading the statistics.',
          ['D17'],
        ),
        step(
          'Read Today’s Stats',
          '**Rides** and **Earnings** summarise the data available to the dashboard. A dash such as **—** means a value is unavailable, not necessarily zero. The current app does not have a live source for its active-time metric.',
        ),
        step(
          'Choose a chart period',
          'Use **Week** or **Month** for the earnings and rides overviews. Compare the period you selected; do not add today’s total to the chart again if it already includes today.',
        ),
        step(
          'Verify money against its records',
          'Use Wallet’s financial history and the completed trip/session records for a disputed amount. A dashboard chart is a summary, not a transfer receipt.',
        ),
      ],
      outcome:
        'You can distinguish activity summaries, unavailable values and confirmed financial records.',
      troubleshooting: [
        issue(
          'A figure has not updated',
          'Check the underlying trip/payment status and reload after reconnecting. Report a persistent mismatch with the relevant references rather than the chart alone.',
        ),
      ],
      related: ['money/payment-records', 'account/trip-history'],
    },
  ),
  make(
    'money',
    'cash-or-wallet',
    'Choose cash or wallet for a ride',
    'Know who receives the payment and what to check before confirming your request.',
    {
      steps: [
        step(
          'Open the payment choice',
          'During the request flow, read **How would you like to pay?**. Choose from the methods offered for that request.',
          ['M09'],
        ),
        step(
          'Choose Cash deliberately',
          '**Cash** means you pay the driver after the ride. Check that you can pay the agreed amount. A cash instruction does not mean the app has charged your wallet.',
        ),
        step(
          'Choose Wallet deliberately',
          '**Wallet** uses funds in your TagRides wallet. Check the available balance and required amount. **Top up to use** or a low-balance message means you need to fund the wallet or choose an available alternative.',
        ),
        step(
          'Review the final choice',
          'Tap **Continue**, then check **Paying with** on the confirmation. Use **Change** before submitting if it is wrong. At completion, read the receipt’s actual payment state before paying again.',
          ['R04', 'R19'],
        ),
      ],
      outcome:
        'You know whether to hand cash to the driver or expect wallet settlement for the confirmed journey.',
      troubleshooting: [
        issue(
          'The balance says Unavailable',
          'The wallet service could not supply a current balance. Restore connectivity and retry, or use cash if the app offers that option.',
        ),
        issue(
          'I paid cash but the app says wallet',
          'Keep both the trip and payment evidence and contact support. Do not send a second payment just to make the screen disappear.',
        ),
      ],
      related: ['money/top-up', 'money/payment-records'],
    },
  ),
  make(
    'money',
    'top-up',
    'Top up your rider wallet',
    'Start one payment, finish the provider’s checkout and wait for wallet verification.',
    {
      before: [
        'Open Wallet in rider mode. The current driver wallet does not expose the same top-up page.',
        'Have access to your chosen payment method.',
      ],
      steps: [
        step(
          'Open the funding page',
          'Choose **Wallet** from the menu and open the top-up section. Enter a **Top-up amount**. The current form displays a minimum of ₦100; follow any current validation shown by the app.',
          ['M01', 'M02'],
        ),
        step(
          'Choose the available method',
          'The interface lists methods such as **Card**, **Transfer**, **USSD** and **E-wallet**. Choose the method available in your checkout; payment-provider availability can vary.',
        ),
        step(
          'Continue to secure checkout',
          'Tap **Continue** and wait for **Preparing secure checkout…**. Follow the payment provider’s instructions. Use only the account details/reference supplied for that transaction, not a number from an old screenshot.',
          ['M03'],
        ),
        step(
          'Return for verification',
          'After payment, allow the app to complete **Verifying payment…**. Look for the success message and the updated wallet/payment-history entry. A debit alert alone does not prove the app has credited the wallet.',
        ),
      ],
      outcome:
        'The wallet shows the confirmed top-up, or clearly records a pending, failed or cancelled result.',
      troubleshooting: [
        issue(
          'My bank was debited but the wallet is unchanged',
          'Keep the amount, date and provider reference. Check Payment History and contact support if the provider confirms payment but the wallet remains unchanged. Do not immediately repeat the same transfer.',
        ),
        issue(
          'I cancelled checkout',
          'Return to the app and check that the attempt is cancelled or unconfirmed. Start a new attempt only when you intend another payment.',
        ),
        issue(
          'I cannot see Top up',
          'Check your current role. The driver wallet currently shows payment history and a payout-availability notice rather than the rider funding flow.',
        ),
      ],
      related: ['money/payment-records', 'money/cash-or-wallet', 'support/contact-support'],
    },
  ),
  make(
    'money',
    'payment-records',
    'Read holds, charges and payment history',
    'Understand what happened to your money before making another payment.',
    {
      featured: true,
      steps: [
        step(
          'Open Payment History',
          'Choose **Wallet**, then **Payment History**. Find the relevant date, amount and reference. Check the entry type and status together.',
          ['M04'],
        ),
        step(
          'Understand a hold',
          '**Funds Held** means money has been set aside for a journey. It is not a second, additional fare. **Funds Released** records money becoming available again after the relevant outcome.',
        ),
        step(
          'Separate the other entry types',
          '**Ride Payment**, **Ride Earnings**, **Service Fee**, **Wallet Top Up**, **Ride Refund**, **Payout** and **Reversal** describe different events. Do not add a hold and its later completed charge as if they were two purchases.',
        ),
        step(
          'Match the record to the trip',
          'Compare the transaction reference, fare and trip details. Read **pending**, **completed** or the actual returned status before deciding the issue is resolved. Trip completion and bank payout are separate events.',
        ),
      ],
      outcome:
        'You can identify the transaction that needs attention and explain its current state clearly.',
      troubleshooting: [
        issue(
          'A cancelled ride still has a hold',
          'Check for its release entry and available balance. If the hold remains unresolved, contact support with the trip and payment reference.',
        ),
        issue(
          'History will not load',
          'A failed lookup is not evidence that there are no transactions. Retry after reconnecting; preserve the provider receipt.',
        ),
        issue(
          'I do not recognise a charge',
          'Report the exact amount, date and reference. Never send card credentials, an OTP or your bank PIN to support.',
        ),
      ],
      related: ['money/top-up', 'money/driver-payouts', 'support/contact-support'],
    },
  ),
  make(
    'money',
    'driver-payouts',
    'Understand driver earnings and payout availability',
    'What you can check now—and why the current driver wallet may have no withdrawal button.',
    {
      note: 'In the current frontend reviewed for this guide, the driver wallet shows “Payouts are not available yet” and does not mount the withdrawal form. These instructions do not promise that a bank withdrawal can be completed in this version.',
      steps: [
        step(
          'Check completed journey earnings',
          'Read your completed passenger/session summary for gross fares, service fees and net earnings. Separate physical cash collected from wallet-settled amounts.',
          ['D16'],
        ),
        step(
          'Open your driver wallet',
          'Choose **Wallet** in driver mode. Read **Payment History** and the payout-availability notice. If a pending earnings balance is shown, it is not automatically an amount already sent to your bank.',
          ['M05'],
        ),
        step(
          'Check the payment state',
          'Use the financial records to identify whether an earning is pending, settled, reversed or otherwise awaiting processing. The presence of a bank account in verification does not activate a missing withdrawal action.',
        ),
        step(
          'Ask about the eligible next step',
          'If you need a payout update, contact support with the earning/trip references. Follow current account-specific guidance. Do not rely on an old withdrawal screenshot, a fixed processing promise or a minimum from another release.',
        ),
      ],
      outcome:
        'You understand the recorded earnings and whether a payout action is actually available in your current app.',
      troubleshooting: [
        issue(
          'I found withdrawal instructions elsewhere',
          'Check that they apply to the version and account you are using. This guide reflects the currently mounted driver-wallet flow.',
        ),
        issue(
          'A payment is shown as paid out but the bank has not received it',
          'Keep the payout reference and date and contact support for reconciliation. A screenshot of a pending balance is not a completed bank transfer.',
        ),
      ],
      related: [
        'money/payment-records',
        'drivers/finish-and-check-earnings',
        'support/contact-support',
      ],
    },
  ),
  make(
    'account',
    'profile-and-roles',
    'Manage your profile and switch roles',
    'Use one account for riding and driving, and keep your profile recognisable.',
    {
      steps: [
        step(
          'Open Profile',
          'Use **Profile** in the app menu. Review your displayed identity. Profile information and driver-verification details are related but are not edited through the same screen.',
          ['G09'],
        ),
        step(
          'Change your profile photo',
          'Tap the photo control and choose a supported image. The current profile upload accepts images smaller than 5 MB. Browser users use a file/gallery choice; the installed mobile app may also offer a camera option.',
        ),
        step(
          'Switch your role from the menu',
          'Use the rider/driver role action shown by the app. An unapproved driver is directed towards verification; switching roles does not bypass it. Your account identity remains the same.',
        ),
        step(
          'Sign out intentionally',
          'Choose **Logout** when you want to end this device’s session. Make sure any active journey, upload or payment has been resolved first. You will need the same registered phone number to sign back in.',
        ),
      ],
      outcome:
        'Your profile is recognisable and you understand which role and verification state the app is using.',
      troubleshooting: [
        issue(
          'My picture does not change',
          'Wait for the upload result. If it fails, use a supported smaller image and retry. A selected file is not proof of a completed upload.',
        ),
        issue(
          'I need to change identity details',
          'Use the available verification section for driver details, or contact support if the profile offers no edit control. Do not register a duplicate identity.',
        ),
      ],
      related: ['drivers/get-verified', 'account/delete-account', 'getting-started/sign-in'],
    },
  ),
  make(
    'account',
    'delete-account',
    'Request account deletion',
    'Find the deletion control and understand the difference between deleting an account and logging out.',
    {
      before: [
        'Resolve any active journey, pending payment or support case you need to keep accessible.',
        'Keep the records you need before requesting deletion.',
      ],
      steps: [
        step(
          'Open Profile',
          'Choose **Profile** from the menu. If you only want to stop using the app on this device for now, **Logout** is the different, less permanent action.',
          ['G09'],
        ),
        step(
          'Choose Delete Account',
          'Tap **Delete Account** and read the confirmation in full. Continue only if you intend to request deletion of the account, not merely remove the current screen.',
        ),
        step(
          'Wait for the result',
          'Look for the deletion-request acknowledgement or an error. The message **Account deletion requested** acknowledges a request; it does not establish that every record has already been removed.',
        ),
        step(
          'Follow up if necessary',
          'If the request fails or you need clarification about retained records, contact support. The Privacy Policy explains the applicable data handling.',
        ),
      ],
      outcome:
        'You receive an acknowledged deletion request or a clear error to follow up, rather than assuming that closing the app deleted the account.',
      troubleshooting: [
        issue(
          'I tapped Delete Account by mistake',
          'Cancel the confirmation if you have not submitted it. If you already submitted, contact support promptly; do not assume the request can be reversed.',
        ),
      ],
      related: ['account/profile-and-roles', 'support/contact-support'],
    },
  ),
  make(
    'account',
    'trip-history',
    'Find a previous journey and its details',
    'Use trip records for the route and Wallet for the financial event.',
    {
      steps: [
        step(
          'Open History',
          'Choose **History** from the menu. The current role determines whether you are viewing your rider journeys or driving sessions.',
          ['M06'],
        ),
        step(
          'Find the relevant entry',
          'Entries are arranged by date. Use **Load more** for older journeys or driving sessions. Each expandable entry is one journey/session, not everything that happened that day. Only completed ride records appear in this history.',
        ),
        step(
          'As a rider, expand your journey',
          'Tap **Journey** or its arrow. A single-ride journey shows **Ride details** and **Leg 1**. A journey with multiple recorded legs shows **Journey legs**, ordered **Leg 1**, **Leg 2** and so on. Each leg has its own pickup, drop-off, times and fare. **Between legs** is the time between recorded rides; the overall journey time includes that gap.',
          ['M07'],
        ),
        step(
          'As a driver, expand your driving session',
          'Tap **Driving session** to see **Passenger rides**. Each **Ride 1**, **Ride 2** entry is a completed passenger ride from that session. Their times can overlap because different passengers can share your vehicle. The total is labelled **Gross fares**, before service fees—not net earnings.',
          ['D18'],
        ),
        step(
          'Open a leg or passenger ride',
          'Tap a leg/ride to view its individual details and payment status or contact support about its reference. History does not yet receive all the names, photos and fee/net breakdowns available on the completion screen; it may explicitly say those identity details are unavailable.',
        ),
        step(
          'Check money separately',
          'For a debit, top-up, release or payout, also open Wallet’s **Payment History**. The trip record describes the journey; the financial record confirms what happened to the money.',
        ),
      ],
      outcome:
        'You can identify the correct past journey and provide useful details for a question or dispute.',
      troubleshooting: [
        issue(
          'Trip History Unavailable appears',
          'Do not treat that as a confirmed empty history. Use **Retry** when offered. The app directs you to Wallet history for confirmed financial activity if journey records are unavailable.',
        ),
        issue(
          'A trip is missing',
          'Check the role and whether the ride is completed. Separate requests are not automatically joined just because their times or locations are close. If a completed leg is missing, report its reference, approximate time, pickup and destination.',
        ),
      ],
      related: ['money/payment-records', 'support/contact-support'],
    },
  ),
  make(
    'account',
    'refer-and-earn',
    'Share your referral and understand its progress',
    'A shared code, a signup, an unlocked reward and a payout are different milestones.',
    {
      steps: [
        step(
          'Open Refer & earn',
          'Choose **Refer & earn** from the menu. Wait for your personal code and available summary to load.',
          ['M08'],
        ),
        step(
          'Share through Invite or the QR code',
          'Tap **Invite** to use the sharing options. If a QR code is displayed, the other person can scan it. Share the link the app supplies rather than typing a guessed referral URL.',
        ),
        step(
          'Read the progress counters',
          '**Signups so far**, **unlocked** and **paid** describe different stages. A person joining with your code does not necessarily qualify a reward immediately; the applicable journey and eligibility conditions still matter.',
        ),
        step(
          'Check pending separately from paid',
          'A pending/unpaid amount has not yet been paid out. Use the current programme terms and account status for conditions; do not assume another account’s reward amount applies to you.',
        ),
      ],
      outcome:
        'You have shared the correct referral and can distinguish progress from a completed reward payment.',
      troubleshooting: [
        issue(
          'My referral data does not load',
          'Retry later after checking the connection. Do not share a fabricated code or assume the missing data means the reward was paid.',
        ),
        issue(
          'A friend joined but no reward is unlocked',
          'Check the programme’s completion/eligibility conditions and allow confirmed activity to update. Contact support with the referral details if the state remains inconsistent.',
        ),
      ],
      related: ['money/payment-records', 'support/contact-support'],
    },
  ),
  make(
    'support',
    'contact-support',
    'Get help with a trip, payment or verification',
    'Send the details that let support identify the problem without exposing your credentials.',
    {
      steps: [
        step(
          'Open Help & Support',
          'Choose **Help & Support** from the menu. Browse **FAQs** for an explanation, or open **Contact support** for the channels currently available to your account/region.',
          ['G10'],
        ),
        step(
          'Include the relevant details',
          'For a trip: date, pickup, destination and the person/vehicle involved. For payment: amount, date and reference. For account/verification: your registered phone number, the section and exact message. A clear screenshot can help.',
        ),
        step(
          'Describe the last action',
          'Say what you tapped, what you expected and what appeared instead. Include your browser/device and whether you were online. Never send your OTP, PIN, password or full card details.',
        ),
        step(
          'Use emergency services for immediate danger',
          'TagRides support is not an emergency service. For immediate danger, contact local emergency services first; use the emergency number shown for your location when appropriate. An in-app report does not guarantee immediate emergency intervention.',
        ),
      ],
      outcome:
        'Your message contains enough context for support to identify the issue and advise the next step.',
      note: 'The website’s “Support the Lagos pilot” page is for contributions and partnerships. You do not need to make a contribution to ask for help with the app.',
      troubleshooting: [
        issue(
          'The external contact app does not open',
          'Use another available channel or copy the displayed contact information. Return to TagRides after sending the message.',
        ),
        issue(
          'I have not had a response yet',
          'Keep the reference and avoid sending contradictory duplicate requests. Response availability can vary; do not rely on a marketing-style timing promise for an urgent situation.',
        ),
      ],
      related: [
        'drivers/correct-and-resubmit',
        'money/payment-records',
        'support/reconnect-and-update',
      ],
    },
  ),
  make(
    'support',
    'reconnect-and-update',
    'Reconnect or refresh without losing your place',
    'Recover carefully when the app is slow, offline or showing an older screen.',
    {
      steps: [
        step(
          'Check the connection first',
          'Restore Wi-Fi/mobile data and look for the current error. **Reconnect**, **Retry** and **Try again** apply to the screen that failed; use the available action before restarting the whole process.',
          ['R22'],
        ),
        step(
          'Let the active state restore',
          'If you were matching or riding, allow the app to restore that same request/trip. Confirm its current driver, route and payment state. Do not start another request just because a loading screen appeared.',
        ),
        step(
          'Refresh while idle',
          'If you need to reload the web app, first finish or resolve an active ride, document upload or checkout. Reopen the same app URL and sign in with your existing account if asked. Do not clear all browser storage as a routine update step.',
        ),
        step(
          'Report a persistent mismatch',
          'Record the visible message and device/browser. The current version-information display is being improved; do not look for a version button that is not on your screen. Support can help identify the build from the available context.',
        ),
      ],
      outcome:
        'You resume the correct account and operation, or have a clear problem report without duplicate requests or payments.',
      troubleshooting: [
        issue(
          'I see old content after a refresh',
          'Close idle duplicate tabs and reopen the app. If the problem persists, contact support rather than deleting an active session’s local data.',
        ),
        issue(
          'Verification looks different after reconnecting',
          'Let the status check complete. The last saved status and a failed refresh are not the same as a new rejection.',
        ),
      ],
      related: [
        'riders/cancel-or-recover',
        'drivers/correct-and-resubmit',
        'support/contact-support',
      ],
    },
  ),
];

export function getHelpArticle(slug) {
  return helpArticles.find((article) => article.slug === slug);
}

export function getHelpCategory(id) {
  return helpCategories.find((category) => category.id === id);
}

export function readingMinutes(article) {
  const text = [
    article.summary,
    ...article.before,
    ...article.steps.map((s) => s.body),
    article.outcome,
    ...article.troubleshooting.map((t) => `${t.question} ${t.answer}`),
    article.note || '',
  ].join(' ');
  return Math.max(2, Math.ceil(text.split(/\s+/).length / 180));
}
