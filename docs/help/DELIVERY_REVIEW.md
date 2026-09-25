# Help centre — local review edition

Reviewed 2026-09-25. **Approved by the user for the combined website release.**

## What is complete

- 31 complete walkthroughs in six categories: getting started, riders, drivers,
  money, account and support. Admin is excluded.
- Searchable/filterable `/help` hub, six category pages and 31 article pages.
- Each guide includes prerequisites where needed, ordered instructions, a clear
  expected result, troubleshooting and related guides.
- 36 actual-UI WebP images, approximately 13–79 KB each, illustrating every guide.
  Some images are reused for adjacent steps. Captioned/numbered guidance is
  separate from the pixels, and images can be opened at full resolution.
- Deterministic sample personas and controlled realtime-panel fixtures in the
  frontend's `tools/help_capture/`. No manual screenshot work is required.
- App issues kept separately in [APP_ISSUES.md](APP_ISSUES.md).

## Capture provenance and limits

These are the real Flutter app screens/components from the reviewed EC2 worktree
(`94d74be85d05815de524559750332313aa7a5a06` plus local changes), rendered with
fictional profiles and financial data. Static panel scenes are explicitly
sample-data illustrations, not successful backend transactions. They do not
establish live OTP delivery, GPS accuracy, payment settlement or real approval.

The Mac checkout was newer at inspection (`920bbcef`). Reconcile its driver-card
and receipt changes into a selected app release before treating images as exact
release-specific screenshots. This edition describes the source-reviewed pre-launch
product, labels sample-data images, and publishes the guides in the public sitemap.

The initial 71-checkpoint image plan includes additional variants; not every
variant has a separate image yet. `src/data/help/screenshots.mjs` is the actual
illustration inventory, including the additional M09 payment-choice panel.
The public guides never render a broken placeholder for a missing optional image.

## Checks performed

- Flutter fixture analysis: passed.
- Five fixture contract/isolation tests: passed, including real rider/driver
  history parsers and rejection of payment/admin mutations.
- Flutter capture build: passed.
- Article/image validator: all 31 guides illustrated; all related links resolve;
  all image dimensions match; no admin article.
- Focused ESLint and formatting: passed.
- Isolated Next build (`.next-help-review`): passed.
- Browser review: all 31 article URLs and six category URLs return the expected
  pages; search/filter/no-results, FAQ expansion, image delivery, noindex and a
  real 404 were checked. No page errors or horizontal overflow at desktop and
  375px mobile widths.
- Mobile/desktop guide screenshots visually inspected, including numbered
  bank-step annotations and the help index.

## Next review order

History follow-up: the one-leg image was refreshed and expanded rider/driver
history images were added. The history guide now explains legs, between-leg
gaps, gross passenger fares and the remaining completion-screen data gaps.

1. Read the driver-registration and payments guides first.
2. Confirm which app release the first practical test will use.
3. Address the separately logged app blockers, then refresh only affected guides
   and images from that accepted release.
4. Complete connected acceptance separately from documentation fixtures.
5. Publication was explicitly authorised on 25 September as part of the combined
   website release. Connected app acceptance remains separate from publishing these
   source-reviewed, sample-illustrated guides.
