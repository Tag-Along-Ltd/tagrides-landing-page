# Landing Page Deploy Hosts

The landing site can build for more than one host.

## Netlify / Node-compatible host

Use this when the host runs Next.js route handlers, including the Mongo-backed
`/api/waitlist`, `/api/trip-fare`, and `/api/posts` routes.

```sh
npm run build:netlify
```

Required environment variables live on the host:

- `MONGODB_URI`
- `ADMIN_TOKEN`
- `NEXT_PUBLIC_SITE_URL=https://tagrider.com`
- `NEXT_PUBLIC_ALLOWED_ORIGIN=https://tagrider.com`

## Cloudflare Pages

Cloudflare Pages is used as a static frontend host. The current MongoDB Node
driver API routes do not run in the Cloudflare Workers runtime, so form/API
calls must point to a Node-compatible API base.

The Cloudflare build temporarily excludes `src/app/api` during static export,
then restores it. Blog detail routes are now included: `generateStaticParams`
builds the same published catalog used by the index and sitemap. Release-managed
articles in `src/data/blog-posts.js` are always available; additional published
Mongo articles are included when the database is available at build time.

Both hosts publish the blog pages as build-time snapshots. New database-only
slugs require a build before their HTML pages are available. Release-managed
articles take precedence over database copies of the same slug; edit those in
the repository, not through the posts API.

```sh
NEXT_PUBLIC_LANDING_API_BASE_URL=https://<node-api-host> npm run build:cloudflare
npx wrangler pages deploy out --project-name=tagrides-landing-page
```

If `NEXT_PUBLIC_LANDING_API_BASE_URL` is empty, forms call same-origin
`/api/...`; that only works on a Node-compatible host, not static Cloudflare
Pages.

## Domain Cutover

Keep `tagrider.com` on the current host until the Cloudflare Pages deployment
has a working preview URL. Then add `tagrider.com` as a custom domain in
Cloudflare Pages and point DNS to the Pages target Cloudflare provides.
