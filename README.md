# TagRides website

The public marketing site, articles and app walkthroughs for TAG-ALONG LTD. Built with Next.js 16, React 19 and Tailwind 4.

## Develop

```bash
npm ci
npm run dev
```

The default address is `http://localhost:3000`. On the shared EC2 workspace, the article review server uses port 3195; forward it through SSH to review from another machine. `.env` remains machine-local.

## Content

- `/blog`: one collection containing the founder story, economics note and three Shared Value articles. `/article` points to the same collection.
- `/help`: 31 source-reviewed app walkthroughs in six categories, illustrated with 36 real-UI sample-data images.
- `/support`: founder video, pilot context and partnership/support options.
- `/pitch`: audience-specific company presentation.
- `/brand-kit` and `/pitch/ai-poc`: private presentation tools, gated by `ENABLE_PRIVATE_PRESENTATIONS`; production hosting rules keep them unavailable by default.

Published articles and assets live **inside this repository**. See [docs/ARTICLES.md](docs/ARTICLES.md). Earlier operator packages are editorial archives, not build dependencies. App screenshots and guides identify their sample-data/pre-launch status; see [docs/help/DELIVERY_REVIEW.md](docs/help/DELIVERY_REVIEW.md).

The homepage retains its dark brand treatment. Articles use the light reading theme. Changes to colour schemes should be assessed through readability and conversion evidence rather than assumed sales effects.

## Verify before release

```bash
npm run lint
npm run test:articles
npm run test:help
npm audit
NEXT_PUBLIC_SITE_URL=https://tagrider.com TAGRIDES_BUILD_DIR=.next/release-check npm run build
TAGRIDES_BUILD_DIR=.next/release-check npm run start -- --hostname 127.0.0.1 --port 3196
```

Against that local production server:

```bash
node scripts/check-release.mjs http://127.0.0.1:3196
node scripts/check-content-tracing.mjs
HELP_REVIEW_URL=http://127.0.0.1:3196 node scripts/test-help-browser.mjs
```

Install the Playwright Chromium browser with `npx playwright install chromium`, or set `CHROME_PATH` to an existing Chrome binary. `TAGRIDES_BUILD_DIR` takes precedence over the older `TAGRIDES_HELP_REVIEW` shortcut so concurrent reviews do not overwrite each other's builds.

## Deploy once per reviewed batch

Netlify's configured build command is `npm run build:netlify`, publishing `.next`. Review and test the complete batch locally before pushing `main`; do not trigger extra manual deployments while the Git-triggered deployment is running. Cloudflare static-export commands remain available for the alternate hosting target.

Raw media projects, generated review screenshots, local caches and unrelated client captures are excluded from Git. Production images belong under `public/assets/` with source notes where applicable. No credentials belong in source control.
