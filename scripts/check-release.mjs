import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { helpArticles, helpCategories } from '../src/data/help/articles.mjs';

const series = JSON.parse(await readFile('content/articles/shared-value/manifest.json', 'utf8'));
const newArticleRoutes = series.articles.map(({ slug }) => `/blog/${slug}`);
const helpRoutes = [
  '/help',
  ...helpCategories.map(({ id }) => `/help/${id}`),
  ...helpArticles.map(({ slug }) => `/help/${slug}`),
];

// Read-only smoke checks against a running local production build.
// Usage: node scripts/check-release.mjs http://127.0.0.1:3190
const base = process.argv[2] || 'http://127.0.0.1:3190';
const canonical = 'https://tagrider.com';
const routes = [
  '/',
  '/about-us',
  '/support',
  '/blog',
  '/blog/the-car-is-going-there-anyway',
  '/blog/marginal-zero-economics',
  ...newArticleRoutes,
  ...helpRoutes,
  '/pitch',
  '/pitch?audience=judge',
  '/pitch?audience=customer',
  '/pitch/print?audience=investor',
  '/pitch/print?audience=judge',
  '/pitch/print?audience=customer',
  '/assets/blog/shared-journey.svg',
  '/assets/video/founder-pitch-poster.jpg',
  ...Array.from({ length: 5 }, (_, index) => `/assets/commuters/commuter-0${index + 1}.webp`),
];
const html = new Map();
for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  html.set(route, await response.text());
  console.log(`PASS 200 ${route}`);
}
for (const route of ['/blog/not-a-real-article', '/brand-kit', '/pitch/ai-poc']) {
  assert.equal((await fetch(base + route)).status, 404, route);
  console.log(`PASS 404 ${route}`);
}

const support = html.get('/support');
for (const value of [
  '1026504831',
  'TAG-ALONG LTD',
  'United Bank for Africa (UBA)',
  'oniya.olaiya@tagrider.com',
]) {
  assert.ok(support.includes(value), `Support page missing: ${value}`);
}
for (const route of [
  '/support',
  '/blog',
  ...newArticleRoutes,
  ...helpRoutes,
  '/blog/the-car-is-going-there-anyway',
  '/blog/marginal-zero-economics',
]) {
  assert.ok(
    html.get(route).includes(`rel="canonical" href="${canonical}${route}"`),
    `Wrong canonical: ${route}`,
  );
}
assert.ok(
  html
    .get('/blog/the-car-is-going-there-anyway')
    .includes('name="twitter:title" content="The car is going there anyway.'),
  'Missing article social title',
);
assert.ok(
  html.get('/blog/the-car-is-going-there-anyway').includes('href="/support"'),
  'Missing article support link',
);
assert.ok(
  html.get('/blog').includes('href="/blog/the-car-is-going-there-anyway"'),
  'New article absent from index',
);
assert.ok(html.get('/').includes('href="/support"'), 'Homepage support link missing');
for (const route of ['/about-us', '/support']) {
  assert.ok(
    html.get(route).includes('https://youtu.be/EvR_qmWTxQg'),
    `Founder video link missing: ${route}`,
  );
  assert.ok(
    html.get(route).includes('/assets/video/founder-pitch-poster.jpg'),
    `Founder poster missing: ${route}`,
  );
  assert.ok(
    !html.get(route).includes('qh3NGpYRG3I'),
    `Old placeholder video still present: ${route}`,
  );
}
assert.ok(
  html.get('/blog/the-car-is-going-there-anyway').includes('href="/support#founder-film"'),
  'Article video-funnel link missing',
);
assert.ok(html.get('/pitch').includes('/support'), 'Pitch support link missing');
// The print page renders its audience-specific deck after hydration. Check its
// contact link in the browser review, rather than asserting on the HTML shell.

const xmlResponse = await fetch(base + '/sitemap.xml');
assert.equal(xmlResponse.status, 200);
const xml = await xmlResponse.text();
assert.ok(!xml.includes('localhost'), 'Sitemap contains a local development URL');
for (const route of [
  '/support',
  ...newArticleRoutes,
  ...helpRoutes,
  '/blog/the-car-is-going-there-anyway',
  '/blog/marginal-zero-economics',
]) {
  assert.ok(xml.includes(`<loc>${canonical}${route}</loc>`), `Missing sitemap URL: ${route}`);
}
const index = await (await fetch(base + '/api/posts')).json();
for (const article of series.articles) {
  const post = index.posts.find(({ slug }) => slug === article.slug);
  assert.ok(post, `API index missing ${article.slug}`);
  assert.ok(!('content' in post) && !('linkedin' in post), 'List API leaked full/editorial copy');
  const detail = await (await fetch(`${base}/api/posts/${article.slug}`)).json();
  assert.equal(detail.post.title, article.title);
  assert.ok(!('linkedin' in detail.post), 'LinkedIn preparation must remain internal');
  assert.ok(!html.get(`/blog/${article.slug}`).includes('Review the shorter LinkedIn version'));
  assert.equal(
    (await fetch(base + `/assets/articles/shared-value/${article.cover.replace('.svg', '.png')}`))
      .status,
    200,
  );
}
for (const slug of ['the-car-is-going-there-anyway', 'marginal-zero-economics']) {
  const post = index.posts.find((item) => item.slug === slug);
  assert.ok(post, `API index missing ${slug}`);
  assert.ok(!('content' in post), 'List API must not include full article bodies');
  const response = await fetch(`${base}/api/posts/${slug}`);
  assert.equal(response.status, 200);
  const detail = await response.json();
  assert.equal(detail.post.title, post.title, 'API detail/index disagree');
  assert.ok(detail.post.content.includes('/support'), 'API content missing support link');
}
const invalidLimit = await fetch(base + '/api/posts?limit=invalid');
assert.equal(invalidLimit.status, 200, 'Invalid limit should use default');
const privateResponse = await fetch(base + '/api/posts?status=draft');
assert.equal(privateResponse.status, 401, 'Private draft list must require authentication');
console.log(
  'PASS bank details, article/API parity, support links, canonical/social metadata, sitemap and draft protection',
);
