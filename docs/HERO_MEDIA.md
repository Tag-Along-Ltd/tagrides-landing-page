# Hero portraits and founder film

## Founder video

- Owner-supplied YouTube URL: https://youtu.be/EvR_qmWTxQg
- YouTube oEmbed title: “TagRides Pitch Video”; channel: Oniya Olaiya.
- Matching local master: `media/pitch-production/output-v2/tagrides-cascador-review-v2.mp4` (149.5 seconds).
- Poster: frame at 8 seconds from the local master, scaled to 960px wide.
- Shared configuration: `src/data/founder-video.js`.
- About replaces the old generic 45-second placeholder; Support shows the same film before the contribution details. Homepage/first-route article link into `/support#founder-film`.
- Only the local poster is requested initially. A click loads the privacy-enhanced YouTube embed; a direct YouTube link remains available if embedding is blocked.

Suggested short description:

> Founder Oniya Olaiya introduces TagRides and its vision for affordable, accountable shared journeys—connecting riders with drivers already heading their way, starting in Lagos.

For a public video description, retain the film’s licensed B-roll credit:

> Lagos footage adapted from “Nigeria: How To Get Around Lagos In A Day” by BattaBox, via Wikimedia Commons, CC BY 3.0. Source: https://commons.wikimedia.org/wiki/File:Nigeria-_How_To_Get_Around_Lagos_In_A_Day.webm · Licence: https://creativecommons.org/licenses/by/3.0/

## Illustrative commuter portraits

These are stock photographs, not TagRides customers or endorsements. Names, routes, times, fares and requests are fictional examples. The carousel labels this explicitly and adds no ratings or verification badges to the photographed people.

| Local asset        | Source image                          |
| ------------------ | ------------------------------------- |
| `commuter-01.webp` | https://www.pexels.com/photo/1681010/ |
| `commuter-02.webp` | https://www.pexels.com/photo/3769021/ |
| `commuter-03.webp` | https://www.pexels.com/photo/3778603/ |
| `commuter-04.webp` | https://www.pexels.com/photo/1181686/ |
| `commuter-05.webp` | https://www.pexels.com/photo/1239291/ |

Source CDN: `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg`.
Licence reference: https://www.pexels.com/license/ (the licence webpage was not retrievable from the research environment).

Images were face-cropped and exported as 160×160 WebP files, approximately 20KB combined. They are served locally without runtime stock-photo requests or image-transformation calls. No claim is made about the subjects’ actual names, nationality or use of TagRides.

## Light treatment

The carousel’s large card shadow was being clipped by Swiper’s overflow viewport, creating a hard horizontal boundary. The glow now lives on a separate oversized radial layer outside Swiper. The hero lighting fades independently. Following founder feedback, the traffic video retains its original right-aligned 60% desktop width (full width on mobile), original horizontal shading, source files and 18% opacity. The temporary full-width video treatment and radial video mask were removed.

## Local verification

- Netlify-target production build and release smoke checks passed locally; no deployment was triggered.
- Home, About and Support checked at 320, 390, 768 and 1440px. An existing About research-carousel overflow was contained during this review.
- All five local portraits loaded. Carousel pause/resume passed; reduced-motion mode pauses both the carousel and the traffic video without hydration errors.
- About and Support use the supplied video ID, local poster and working direct YouTube link. No YouTube requests occur before clicking play. Opening and closing the inline player passed.
- YouTube loaded its player but requested “Sign in to confirm you’re not a bot” from the automated browser. Full playback needs a normal-browser check; the direct YouTube fallback remains visible.
- Lint: no errors; the same four existing warnings elsewhere in the repository.
