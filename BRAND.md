# Tag Rides — Brand System

**Version 1.0 · Owner: Tag Along Ltd**

This document is the source of truth for the Tag Rides identity. Anyone touching the brand — engineers, designers, contractors, social ops, agency partners — works from this file.

---

## 1. Brand Foundation

### 1.1 The hierarchy

| Layer | Name | Role |
| --- | --- | --- |
| Parent / legal entity | **TAG-ALONG LTD** | The company. Owns the products, signs the contracts, hires the team. |
| Consumer brand (product 01) | **Tag Rides** | The first product — route-shared mobility in Lagos. |
| Signature mode within Tag Rides | **Tag-Along** | The route-shared ride. Sister mode: **Direct** (dedicated ride). |

This is the standard parent/product structure. Examples:

| Parent | Product |
| --- | --- |
| Alphabet Inc. | Google |
| Meta Platforms Inc. | Instagram, WhatsApp, Facebook |
| Snap Inc. | Snapchat |
| **Tag Along Ltd** | **Tag Rides** (and any future Tag-* products) |

**Why this matters for branding:**
- The catchphrase **"Their route. Your ride."** lives at the **Tag Along** level — the family promise.
- The product mark (the interlocked rings) sits on **Tag Rides** but can extend cleanly to any future Tag-* product (Tag Eats / Tag Bus / Tag Pay) without rebranding the parent.
- When signing legal docs, partnerships, MOUs → **TAG-ALONG LTD**. When marketing to riders → **Tag Rides**.

### 1.2 Mission, vision, catchphrase

| Field | Value |
| --- | --- |
| Headquarters | Lagos, Nigeria |
| Catchphrase | **Their route. Your ride.** |
| Mission | Organise the way Lagosians already move — making everyday shared rides safer, fairer, and more reliable. |
| Vision | A Lagos where every commute carries someone else along — where moving across the city is affordable, dignified, and trusted. |

---

## 2. Logo System

### 2.1 The Mark — *Stronger Together*

Two interlocking rings — **teal** and **amber** — meeting at the centre. The intersection *is* the brand: the moment a driver and a rider share a path.

#### All SVG assets (no background, transparent)

Every SVG in `/public/assets/brand/` is **transparent-background by default** — drop them on any surface.

| File | What it is | Use when |
| --- | --- | --- |
| `mark.svg` | Primary color mark | Default — anywhere two-color is fine |
| `mark-mono.svg` | Mono via `currentColor` | React/HTML — inherits any color the parent sets |
| `mark-teal.svg` | Single-color, all teal | Embroidery, foil, single-ink print |
| `mark-amber.svg` | Single-color, all amber | When the surface is teal — for inverse contrast |
| `mark-white.svg` | Single-color, white | On photography, dark backgrounds, video |
| `mark-black.svg` | Single-color, black | On white paper, light merch, line-art contexts |
| `wordmark.svg` | Text only ("tagrides") | When the mark would compete with surrounding imagery |
| `lockup-horizontal.svg` | Mark + wordmark, side-by-side | Headers, footers, business cards, signage |
| `lockup-stacked.svg` | Mark above wordmark | Posters, OG images, square containers |
| `lockup-reverse.svg` | Horizontal lockup styled for dark backgrounds | Video lower-thirds, dark merch tags |
| `favicon.svg` | 64×64 mark on rounded charcoal square | Browser tab, source for ICO and Apple touch icons |
| `og-image.svg` | 1200×630 OG card with mark, wordmark, headline, catchphrase | `og:image` meta tag template |

React equivalents in `src/components/brand/Logo.jsx`:
- `<Logo />` — the mark, with `variant` prop (`color` / `mono` / `reverse`)
- `<Wordmark />` — text only
- `<Lockup />` — mark + wordmark together

**Design rationale:**
- One idea, executed in one geometry. No bumpy chain links, no scenery, no arbitrary curves.
- Mathematically pure (perfect circles) → scales infinitely from 16 px favicon to 10 ft banner.
- The secondary colour (amber) lives *inside* the mark — not borrowed from decoration.
- Carries the original "stronger together" thesis but refined: the chainlink metaphor without the literalness.

### 2.2 Justification — why this mark over the alternatives

Three concepts were explored at `/brand` on the live site. Concept 01 (Stronger Together) was selected. Reasoning:

- **Principle.** One clear idea, executed in one geometry. The intersection of the two rings *is* the brand — the moment a driver and a rider share a path. Defendable in one sentence.
- **Marketability.** Lineage of MasterCard / Audi / Olympic rings. The "two things joined" visual category carries equity automatically.
- **Extensibility.** Pure geometry hosts infinite variation (color, animation, monogramming, sub-brand differentiation for **Tag-Along** vs **Direct** etc.) — illustrated marks like *The Route* or *The Tag* are scenes, not systems, and don't grow.
- **Scale.** Survives every size: identical at 16 px favicon and 10 ft banner. No detail lost on reduction.
- **Modern-brand alignment.** Stripe / Linear / Vercel / Notion / Arc / Raycast are all geometry-first marks. Concept 01 is in that lineage.

### 2.3 Color variants

- **Color** — teal + amber. Default; used wherever color reproduction is faithful.
- **Mono (light)** — single-color mark in `#0a0a0a` charcoal on light backgrounds.
- **Mono (dark/reverse)** — single-color mark in `#e5e5e5` on dark backgrounds.
- **One-color brand** — entirely in `#008080` (teal), useful for embroidery / heat-press merch where two colours add cost.

### 2.4 Exclusion zone (clear space)

The clearspace around the mark equals the **diameter of one of the rings** (~22 SVG units on the unit grid). No copy, no graphic element, no edge crops inside that zone.

### 2.5 Minimum sizes

| Use | Minimum size |
| --- | --- |
| Print | 14 mm wide |
| Digital | 24 px tall (mark only); 32 px tall (lockup) |
| Favicon | 16 px (mark only, single-color preferred) |

Below those sizes, the rings start to crowd and the interlock no longer reads — substitute with a wordmark or initial only.

### 2.6 Don'ts

- ❌ Do not rotate the mark.
- ❌ Do not change the relative ring sizes.
- ❌ Do not add a stroke around the rings.
- ❌ Do not place on a busy photo without a contrast overlay.
- ❌ Do not change the colour pairing — teal + amber is the brand. (Mono is OK; one-off recoloring is not.)
- ❌ Do not redraw the wordmark in a different typeface; it's set in Plus Jakarta Sans 800.

---

## 3. Color System

Source of truth: `src/data/brand.json`. CSS tokens: `src/app/globals.css`. Reproduces verbatim from the Flutter `tagrides-frontend/lib/core/theme/themes.dart`.

### 3.1 Primary (Teal)

| Token | Hex | OKLCH | Use |
| --- | --- | --- | --- |
| `--primary` | `#008080` | `oklch(0.72 0.13 192)` | CTAs, brand mark, primary structural accents |
| `--primary-hover` | `#006F6F` | — | Hover interaction |
| `--primary-active` | `#005C5C` | — | Pressed state |
| `--primary-soft` | `#BFE5E5` | — | Light backgrounds, soft surfaces |
| `--muted-teal` | `#5F8F8F` | — | Secondary surfaces |

### 3.2 Accent (Amber)

| Token | Hex | Use |
| --- | --- | --- |
| `--accent` | `#F59E0B` | Brand mark second ring, catchphrase, atmospheric/decorative moments |
| `--accent-star` | `#F0B429` | Star ratings (universal convention) |
| `--accent-warning` | `#D4960A` | Warning states |

### 3.3 Surface (Dark)

| Token | Hex | Use |
| --- | --- | --- |
| `--background` | `#0A0A0A` | Page background |
| `--surface` | `#1A1A1A` | Cards |
| `--elevated` | `#262626` | Floating / lifted surfaces |
| `--border` | `#333333` | Borders |

### 3.4 Text

| Token | Hex | Use |
| --- | --- | --- |
| `--foreground` | `#E5E5E5` | Headings + body on dark |
| `--foreground-muted` | `#B3B3B3` | Captions, sub-copy |
| `--foreground-disabled` | `#666666` | Muted |

### 3.5 Feedback

| Token | Hex | Use |
| --- | --- | --- |
| `--success` | `#2EAD8A` | Verified, OK |
| `--danger` | `#D14343` | Incident, alert |

---

## 4. Typography

### 4.1 Type families

| Role | Family | Loaded via |
| --- | --- | --- |
| Display (H1–H3, mark, eyebrows) | **Plus Jakarta Sans** (500, 600, 700, 800) | `next/font/google` in `src/app/layout.js` |
| Body | **Inter** (400, 500, 600, 700) | `next/font/google` |
| Numbers / mono (fares, stats) | **JetBrains Mono** (400, 500, 600) | `next/font/google` |

### 4.2 Scale (Tailwind v4 tokens)

| Class | Size | Use |
| --- | --- | --- |
| `text-6xl` / `text-7xl` | 60 / 72px | Hero H1 |
| `text-4xl` / `text-5xl` | 36 / 48px | Section H2 |
| `text-2xl` / `text-3xl` | 24 / 30px | Card H3 / subhead |
| `text-lg` / `text-xl` | 18 / 20px | Lead paragraph |
| `text-base` | 16px | Body |
| `text-sm` | 14px | Caption |
| `text-xs` | 12px | Eyebrow, fine print |

### 4.3 Weight + tracking conventions

- Hero headlines: 800 weight, `tracking-tight`
- Section headlines: 700, `tracking-tight`
- Body: 400–500, default tracking
- Eyebrows / labels: 600, **uppercase**, `tracking-[0.18em]` (0.2em for larger sizes)
- Mono numbers: 600, `tracking-tighter` only on the largest stat displays

---

## 5. Voice & Tone

- Warm, plain, confident — not corporate.
- Lagos-rooted but globally legible. Use *danfo* and *kabu-kabu* where they land; explain where needed.
- No jargon. No "synergy." No "leverage." No "ecosystem."
- Active voice. Second person (*you*).
- Sentences short. Sometimes very short.

**Catchphrase:** *Their route. Your ride.* Tag Rides is the place that proves the line — a driver's existing route becomes your trip.

---

## 6. Spacing & Layout

- Section padding: `py-20` mobile / `py-28` desktop
- Container max-width: `max-w-6xl` for most sections, `max-w-5xl` for narrative / hero, `max-w-7xl` for asymmetric two-column heroes
- Horizontal padding: `px-6` everywhere
- Card radius: `rounded-2xl` (cards), `rounded-3xl` (hero surfaces, contrast blocks)
- Pill / button radius: `rounded-full`

---

## 7. Iconography

- **Library:** [lucide-react](https://lucide.dev) — covers ~95% of needs.
- **Stroke width:** 1.5–1.75 (lucide default of 2 is too heavy for our type weight).
- **Size:** `size-4` (16px) inline, `size-5` (20px) standalone in cards, `size-6` (24px) for larger features.
- **Brand logos** (Instagram, X, LinkedIn, Facebook) — hand-rolled inline SVG in `Footer.jsx`; lucide doesn't ship trademarked brand glyphs (intentional, correct).

---

## 8. Application

### 8.1 Landing page (`tag_rides_landing_page`)

| Surface | Status |
| --- | --- |
| Footer | ✅ Uses canonical `<Lockup />` |
| `/brand` exploration page | ✅ Shows all 3 concepts + this picked direction |
| Hero — about-us page | Pending: replace inline "About TagRides" pill with mark + label |
| Open Graph image | Pending: generate 1200×630 with mark + headline |
| Favicon | Pending: replace `/public/favicon.ico` with mark export |
| Apple touch icon | Pending |

### 8.2 Flutter app (`tagrides-frontend`)

Brand assets copied to:

- `tagrides-frontend/assets/brand/mark.svg`
- `tagrides-frontend/assets/brand/mark-mono.svg`
- `tagrides-frontend/assets/brand/lockup-horizontal.svg`
- `tagrides-frontend/web/splash/img/mark.svg`

**To regenerate platform splash PNGs** (Android / iOS / web), the recommended path:

```bash
cd tagrides-frontend
flutter pub add --dev flutter_native_splash
# Add to pubspec.yaml:
#   flutter_native_splash:
#     color: "#0a0a0a"
#     image: assets/brand/mark.svg     # Note: native_splash needs PNG; pre-convert via flutter
#     image_dark: assets/brand/mark.svg
#     color_dark: "#0a0a0a"
#     android: true
#     ios: true
#     web: true
flutter pub run flutter_native_splash:create
```

Until that runs, the existing splash PNGs remain in place. The SVG is in `web/splash/img/mark.svg` so a web-only splash update can reference it directly:

```html
<!-- in tagrides-frontend/web/index.html -->
<picture id="splash">
  <img src="splash/img/mark.svg" width="120" height="72" />
</picture>
```

### 8.3 Merch (mockups in round 2)

- T-shirt — mark over left chest (3" wide), wordmark across back upper.
- Hoodie — same as T, mark on hood right side.
- Cap — embroidered single-colour teal mark, centred front.
- Wristband — repeating mark + wordmark in 0.5" silicone.
- Sticker pack — color mark, mono mark, full lockup, "Stronger together" word strip.
- Lanyard — mono mark repeating along strap, in teal silkscreen.

---

## 9. Update workflow

1. Update SVG masters in `/public/assets/brand/` (landing repo).
2. Mirror to `tagrides-frontend/assets/brand/` (Flutter).
3. Bump version in `data/brand.json` if the mark itself changed.
4. Regenerate downstream assets:
   - Favicons (16, 32, 96, 192, 512)
   - Apple touch icon (180×180)
   - OG image (1200×630)
   - Flutter splash via `flutter_native_splash:create`
5. Update this file's version + date.

---

## 10. Open questions

- Domain: `tagrides.com` registration status?
- Trademark filing for the mark (Nigeria + relevant ECOWAS markets)?
- Press kit endpoint (`/press`) — when do we ship?
- Will we need a sub-brand mark for **Tag-Along** (the route-shared mode) and a separate one for **Direct** (the dedicated mode)? Round 2 design exercise.
