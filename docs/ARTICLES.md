# One Articles collection

The main header and footer link to **Articles** at `/blog`. Existing article URLs are preserved. `/article` redirects to `/blog`; the former standalone `/preview/shared-value` review URLs redirect into the same collection on the development server.

## Content and status

- Published sources: `src/data/blog-posts.js` and `content/articles/shared-value/`, plus published database entries through `src/lib/posts.js`.
- `src/lib/releasePosts.js` supplies the same release catalog to pages and API. The website no longer depends on a sibling checkout for its content.
- Reader presentation: `src/lib/articles.js`. Release-managed slugs win database collisions.
- Shared collection, reader and cream/teal theme: `src/components/articles/`.
- Main routes: `src/app/blog/`.

The collection contains **five published pieces**: the three Shared Value articles approved for release on 25 September and the two existing articles. Public images are under `public/assets/articles/shared-value/`. The API and sitemap include all five. LinkedIn preparation text is visible only in development and is excluded from public API output.

The two earlier pieces are:

1. `/blog/the-car-is-going-there-anyway`
2. `/blog/marginal-zero-economics`

The rider article is titled **Getting around should leave room for a life**. Its opening and examples cover school, work, business meetings, places of business, health/public services, family and other everyday journeys. Its URL remains `/blog/everyday-mobility-rider-budget-and-choice`.

## Review

```bash
npm run dev -- --hostname 127.0.0.1 --port 3195
```

Open `http://localhost:3195/blog` after forwarding port 3195 if the development server is on EC2.

## Verification

```bash
TAGRIDES_BUILD_DIR=.next/editorial-build npm run build
npx eslint src/components/articles src/app/blog src/app/article src/app/preview/shared-value src/lib/articles.js
```

The isolated build directory avoids replacing the output used by another running local site. `npm run test:articles` validates titles, citation numbering, heading uniqueness and public assets. Production smoke checks cover article/API parity, public images, social metadata and sitemap entries.

The operator's earlier edition remains an editorial archive. Edit the canonical website Markdown for future releases. `scripts/import-shared-value.mjs` records the original one-time import and refuses to overwrite an existing website edition.
