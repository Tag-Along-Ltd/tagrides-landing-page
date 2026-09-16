# Support and field-notes release

Release approved by the founder on 16 September 2026. This document records the local validation and release procedure.

## Verification completed

- Final staged release was exported to a clean directory and passed `npm ci`, lint, catalog tests, the production build and the read-only release smoke checks. The clean release generates 47 pages; local-only presentation experiments and media workspaces are not included.

- Production build using `npm run build:netlify` with production public URL settings: passed; 69 static pages generated, including both blog articles and `/support`.
- `node scripts/check-release.mjs http://127.0.0.1:3190`: passed. Correct page/API statuses, bank details, canonical/social metadata, sitemap, article/API parity and unauthenticated draft protection.
- Blog catalog tests: 2 passed (release precedence, preserving other published content, draft filtering and database-free operation).
- Lint: 0 errors, 4 existing warnings in PostCSS config, legacy banner/video image usage and a progress-component effect cleanup. No new lint warnings from this release.
- Prettier check for release-touched files and `git diff --check`: passed.
- Browser layout checks at 320, 390, 768 and 1440 CSS pixels: support/blog/article passed; the detected 768px pitch-header overflow was fixed and rechecked across all audiences.
- Clipboard success copied exactly `1026504831`; denied-clipboard fallback passed. Follow-up email recipient and reconciliation fields checked without sending email.
- Home mobile menu → support → bank anchor, and blog index → article → support: passed.
- Investor, competition-judge and customer pitch tabs, support sections, presentation entry/exit and all three printable-deck contact links: passed. Print links fit within their closing slides.
- Browser checks reported no JavaScript page errors. Desktop/mobile screenshots were reviewed locally.
- Follow-up media pass: commuter portraits and smooth hero glow added; the supplied founder film replaces About’s placeholder and is included on Support, with homepage/article links. See `HERO_MEDIA.md` for sources and playback verification limits.

The production preview was left running at `http://127.0.0.1:3190`. Forward port 3190 in the remote editor to review it locally. Preview validation performed no production database writes or external support transactions.

## Public additions

- `/support`: business bank transfer, copy-account control, manual transfer follow-up, sponsorship and commuter/operator introductions.
- Account supplied by the founder: `1026504831`, `TAG-ALONG LTD`, United Bank for Africa (UBA). The page does not claim independent account verification.
- Homepage and mobile/desktop navigation links, a closing support section for all three `/pitch` audiences, and a support URL on each printable deck’s closing page.
- `/blog/the-car-is-going-there-anyway`: founder article with safety, shared-route pricing, global context, Lagos pilot work, support history and the support CTA.
- `/blog/marginal-zero-economics`: existing URL retained, with an explicitly labelled editorial revision replacing unproven zero-cost, guaranteed-fare and income claims.
- Shared article artwork, per-article canonical/social metadata and sitemap entries.

Support is presented as business support, not a ride purchase or investment. There is no invented funding target, progress total, automatic payment confirmation or promised launch date. Restricted sponsorship terms are agreed directly before transfer. No hosted payment provider has been configured.

## Content maintenance

Bank details: `src/data/support.js`.

Release-managed article copy: `src/data/blog-posts.js`. These articles override database copies with the same slug across the website and public read APIs. The posts API rejects edits to these managed slugs; edit and review the repository copy instead.

Other published Mongo articles remain in the catalog when the database is available at build time. Blog HTML and sitemap are build-time snapshots, and `generateStaticParams` now actually generates article routes. New database-only slugs still need a build. The new campaign and revised economics article remain available even without Mongo.

No production database write is required for this release. Existing Mongo documents are retained.

## Local verification (no Netlify deployment)

The local `.env` previously used a legacy API URL as `NEXT_PUBLIC_SITE_URL`. Build with the same production public URL settings now declared in `netlify.toml`:

```sh
npm run lint
node --test scripts/test-blog-catalog.mjs
NEXT_PUBLIC_SITE_URL=https://tagrider.com NEXT_PUBLIC_ALLOWED_ORIGIN=https://tagrider.com npm run build:netlify
npm run start -- --hostname 127.0.0.1 --port 3190
```

In another terminal:

```sh
node scripts/check-release.mjs http://127.0.0.1:3190
git diff --check
```

Then review `/support`, `/blog`, both articles, each `/pitch` audience, and `/pitch/print` on desktop and mobile. Check copy success and clipboard-denied fallback, mailto recipient/body, mobile navigation, support anchors, pitch tab/present controls and print links. The smoke script uses read-only requests and submits no payments, mail, waitlist entries or fare research.

Existing local development servers can remain separate from the production preview. Stop/restart only the release-preview process after rebuilding so it loads the new output.

## Before the one release push

The checkout already contained significant uncommitted site, pitch, media and brand changes before this work. Review the full intended release diff and assets together; do not blanket-stage unrelated generated output. This document is not an instruction to push.

Confirm Netlify’s connected repository/production branch and effective public URL variables in the dashboard. The repo declares the Netlify build command and publish directory, but a live Git integration and credit balance cannot be inferred from `netlify.toml` alone.

Use the support page and article preview for founder review. Once approved, stage the intended release and push once. Inspect the deployment result before publishing campaign links. Local builds and checks do not consume Netlify deployment credits.
