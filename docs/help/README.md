# TagRides help-centre preparation

Prepared 2026-09-25 for the first Igbogbo / Ikorodu practical test.
Status: 31 source-reviewed walkthroughs and a local help hub are implemented,
with 36 prepared actual-UI screenshots using synthetic data. Nothing deployed.
The images are documentation fixtures, not proof of connected acceptance.

Canonical copy: `src/data/help/articles.mjs`. Local routes: `/help`, category
pages, and article pages. Public scope is the whole user app, excluding admin.
The original capture plan contains 71 user-facing checkpoints, not admin captures.
`src/data/help/screenshots.mjs` is the current illustrated-coverage source; it also
includes the payment-choice panel M09. Additional variants remain planned.

## Review locally

```bash
node scripts/validate-help.mjs
TAGRIDES_HELP_REVIEW=1 MONGODB_URI= npm run build
TAGRIDES_HELP_REVIEW=1 MONGODB_URI= npx next start --hostname 127.0.0.1 --port 4380
# In another terminal, with Playwright installed in the tool environment:
node scripts/test-help-browser.mjs
```

The review build uses `.next-help-review`, leaving an existing `.next` build alone.
Open `/help` on this loopback server. The help routes are marked noindex while in
review and are intentionally not added to the public sitemap yet. No deployment
is part of these commands. See the frontend `tools/help_capture/README.md` for
the reproducible sample-data screenshot workflow.

## Deliverables

- [Article plan and screen inventory](ARTICLE_PLAN.md)
- [Exact screenshot checklist](SCREEN_CAPTURE_MANIFEST.csv)
- Frontend: `docs/ADMIN_DRIVER_ONBOARDING_ACCEPTANCE.md`
- Frontend: `docs/WEB_FIRST_RELEASE_PLAN.md`
- Frontend: `docs/SIMULATOR_CAPTURE_WORKFLOW.md`
- Backend: `docs/operations/IKORODU_FIELD_TEST_PLAN.md`
- Backend: `docs/operations/IKORODU_TERMINAL_INVENTORY.csv`

Priorities: driver onboarding/admin review before the onboarding session; rider
and driver quick starts before the practical test; remaining reference articles
after validating their actual screen states. Do not delay a critical in-app fix
to write around confusing or broken behaviour in an article.

## Hosting decision

Create a dedicated `/help` hub in this Next.js landing-page repository with
`/help/riders`, `/help/drivers`, `/help/getting-started` and stable article slugs.
Keep `/support` for contributions/partnerships; it already serves that purpose.
Keep `/blog` for field notes and broader stories. Add an ordinary Help link in
site navigation and the app's Help & Support screen when the pages are ready.

The current blog already has source-managed articles, ReactMarkdown, static
slug generation, metadata, and Mongo fallback. Reuse the design/rendering
patterns but give help its own versioned source catalog and navigation.
Use source-managed Markdown/content objects so help remains available without
MongoDB or the ride backend. Static hosts need generated article paths at build
time. Admin training stays in private operational docs; don't publish applicants'
documents or internal incident screenshots as a public help section.

## Content record

Each article needs `slug`, `title`, `audience`, `summary`, `appVersion`,
`validatedFrontendCommit`, `reviewedAt`, `status` (draft/reviewed/published),
`screenIds`, steps, expected result, recovery, related links and screenshot IDs.
Unknown app-version/commit means draft, not a made-up release number.

Short article format:

1. What you are trying to do and when this screen appears.
2. What each visible segment means (not every decorative icon).
3. One action per numbered step, with the literal current control label.
4. What changes after the server accepts it; how to know it worked.
5. Common states/errors and the next useful action.
6. Related help and the actual support channel/operating hours.

Target 250–500 words for task guides and 1–3 images; longer reference pages
should have anchored subsections. Short sentences, NGN amounts, concrete
examples, mobile-first layouts and readable alternative text. A screenshot
must illustrate the step; instructions must still make sense without the image.

## Capture rules

- Web is the primary release: capture Chrome Android / Safari iPhone web (and
  desktop admin) first. Simulator shots supplement native differences; don't
  illustrate a web-only step with native controls without labelling it.
- Capture actual UI from the frozen candidate and record its commit/version.
  No AI-generated product screens or painted-over errors posing as working UI.
- Use named synthetic accounts, sample plates/documents and a public pickup.
  Keep full applicant data, bank numbers, precise home origin and test credentials
  out of publishable images.
- Full-screen portrait for orientation, then a tightly framed panel for detail.
  Preserve the action and outcome; don't crop away capacity/payment warnings.
- Capture both themes for QA. Publish the clearer theme unless the article
  explains theme-specific behaviour. Keep teal/amber brand colours intact.
- Name assets `<screen-id>-<state>-<platform>-<version>.webp`; keep an original
  lossless PNG only when deliberately selected as a source asset. Suggested
  publication directory: `public/assets/help/<version>/`.
- Aim for <=200 KB per reading-size image where text remains legible. Supply
  intrinsic dimensions; no automatic aspect-ratio crop of phone screens.
- A manifest row moves from planned → captured → checked → approved. Reviewer
  checks exact text, route/fare continuity, anonymisation and article alignment.
- Temporary exploratory captures/logs are removed after use. Retain only
  approved article assets and deliberately retained test evidence.

## Completion standard

Every mounted user route has a help owner or an explicit out-of-scope entry;
every critical sheet/modal has an explanation and recovery path. The source
inventory below is the first baseline, not proof every transient screen was
visited. Walk the candidate end-to-end and add missing states to the manifest.
