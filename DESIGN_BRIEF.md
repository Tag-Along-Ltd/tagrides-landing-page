# TagRides Homepage — Build Brief

Canonical design + content reference for the marketing site. Updated 2026-06-17.

This is the **skeleton**. Implementation should bring its own design language; the brief's
"design direction" section is a starting point, not a literal spec.

## Brand foundation

- Legal entity: **TAG-ALONG LTD**
- Consumer brand / product: **TagRides**
- Signature mode within the product: **Tag-Along**
- Catchphrase: **"Their route. Your ride."**

### Mission

To organise the way Lagosians already move — making everyday shared rides safer, fairer, and more reliable.

### Vision

A Lagos where every commute carries someone else along — where moving across the city is affordable, dignified, and trusted.

### Positioning

For Lagosians who commute every day, TagRides is the safer, organised version of the rides you already share — where drivers heading your way pick you up, you agree the fare directly, and you pay only for your part of the trip.

### Voice

Warm, plain, confident. Active voice. Second person. Short sentences. Lagos-rooted but globally legible (`danfo`, `kabu-kabu`). No corporate jargon.

---

## Design direction

### Palette (canonical — matches `tagrides-frontend/lib/core/theme/themes.dart`)

The landing page must read as the same product as the Flutter app. These are the actual `AppColors` values used in production:

| Token                | Hex       | Use                                |
| -------------------- | --------- | ---------------------------------- |
| Primary teal         | `#008080` | CTAs, accents, active states       |
| Primary hover        | `#006F6F` | Hover interaction                  |
| Primary active       | `#005C5C` | Pressed                            |
| Soft teal            | `#BFE5E5` | Subtle highlights                  |
| Muted teal           | `#5F8F8F` | Secondary surfaces                 |
| Accent amber         | `#F59E0B` | "Boarded" semantic, warm emphasis  |
| Star amber           | `#F0B429` | Ratings                            |
| Warning amber        | `#D4960A` | Warning states                     |
| Dark background      | `#0A0A0A` | Page background                    |
| Dark surface         | `#1A1A1A` | Cards                              |
| Dark elevated        | `#262626` | Floating / lifted surfaces         |
| Dark divider         | `#333333` | Borders                            |
| Primary text         | `#E5E5E5` | Headings + body on dark            |
| Secondary text       | `#B3B3B3` | Captions, sub-copy                 |
| Disabled text        | `#666666` | Muted                              |
| Success              | `#2EAD8A` | Verified, OK                       |
| Danger               | `#D14343` | Incident, alert                    |

Theme is **dark by default** to match the app's primary surface.

### Typography

- **Headings:** Plus Jakarta Sans (700, 800)
- **Body:** Inter (400, 500, 600)
- **Numbers / stats:** JetBrains Mono (or PJS tabular)
- Hero `text-6xl` desktop / `text-4xl` mobile

### Motion

Subtle. Departure-board ticker for driver cards. Scroll reveals (fade + 20px up). Route line animation in How It Works. Card lift on hover (200ms ease-out). All motion ≤ 600ms.

### Imagery

Real Lagos scenes. Avoid generic stock. UI screenshots of the actual app. Illustrative route diagrams.

---

## Homepage sections (scroll order)

1. **Hero** — Headline `"Tag along. Move together."` + subhead + two CTAs (Get the App / Drive with TagRides) + departure-board visual.
2. **Problem** — *Getting around Lagos shouldn't be this hard.* 3 cards (ride-hail too expensive / danfo chaotic / drivers waste empty seats).
3. **Solution** — *What if your commute was the ride?* Animated route diagram, 1 car + 3 riders.
4. **Rider Journey** — *Five steps. Less than a minute to book.* 6 numbered cards.
5. **Driver Journey** — *Turn your daily commute into daily income.* 6 numbered cards.
6. **Two Modes** — *One app. Two ways to move.* Tag-Along vs Direct side by side.
7. **Pricing Philosophy** — Cobalt contrast section. *Fairer than ride-hail. Safer than danfo.* + comparison table.
8. **Safety & Trust** — *Safety isn't a feature. It's the whole point.* 6 trust signals.
9. **Vision / By the Numbers** — 3 stats: 2,000 active drivers / 50,000 Lagosians / 6 African cities (3-year target).
10. **Why Now** — okada ban / fuel prices broke ride-hail / mobile money finally works.
11. **Testimonials** — placeholder until real ones exist.
12. **For Investors & Partners** — thesis + status + Talk to us.
13. **FAQ** — accordion.
14. **Final CTA** — Cobalt contrast, mirror of section 7.
15. **Footer** — About / Product / For Partners / Connect.

---

## Build notes

- Next.js (App Router) + Tailwind v4 + shadcn/Magic UI base components.
- `motion` for scroll reveals. Lottie if needed for route animation.
- Mobile-first. Sections `py-24` desktop / `py-16` mobile.
- Lighthouse 90+ on mobile. No autoplay videos. Lazy-load below the fold.
- Don't add: testimonials carousel until real ones exist. App-store badges until apps submitted. "As seen in" logos unless real.
- Header sizing: hero `text-6xl` desktop / `text-4xl` mobile. Use `Plus Jakarta Sans` 800 weight.
- Buttons: rounded-full pills. Primary cobalt, secondary cobalt-bordered ghost.

## SEO

```
<title>TagRides — Share the ride. Share the fare. | TAG-ALONG LTD</title>
<meta name="description" content="TagRides connects Lagosians with drivers already heading their way. Agree the fare directly, pay only for your leg of the trip, and move safely across the city for what you'd already pay for a danfo.">
```
