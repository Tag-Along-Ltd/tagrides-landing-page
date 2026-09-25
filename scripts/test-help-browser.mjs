import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { helpArticles, helpCategories } from '../src/data/help/articles.mjs';
import { helpScreenshots } from '../src/data/help/screenshots.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.HELP_REVIEW_URL || 'http://127.0.0.1:4380';
assert(['127.0.0.1', 'localhost'].includes(new URL(base).hostname));
const browser = await chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  headless: true,
  args: ['--no-sandbox'],
});
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const overflow = async () =>
    assert(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      `Horizontal overflow at ${page.url()}`,
    );
  await page.goto(`${base}/help`);
  await page.getByRole('heading', { level: 1 }).waitFor();
  await overflow();
  assert(!(await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'));
  const search = page.getByRole('searchbox', { name: 'Search all walkthroughs' });
  await search.fill('bank');
  await page
    .getByRole('heading', { name: 'Fill in bank and personal details correctly' })
    .waitFor();
  await search.fill('zznotawordzz');
  await page.getByRole('heading', { name: 'No guide found for that search' }).waitFor();
  await page.getByRole('button', { name: 'Show all guides' }).click();
  await page.getByRole('button', { name: 'Payments & earnings', exact: true }).click();
  assert.equal(
    await page
      .getByRole('button', { name: 'Payments & earnings', exact: true })
      .getAttribute('aria-pressed'),
    'true',
  );
  await page.getByRole('heading', { name: 'Choose cash or wallet for a ride' }).waitFor();
  for (const category of helpCategories) {
    await page.goto(`${base}/help/${category.id}`);
    assert.equal(await page.getByRole('heading', { level: 1 }).innerText(), category.title);
  }
  for (const article of helpArticles) {
    const response = await page.goto(`${base}/help/${article.slug}`);
    assert.equal(response.status(), 200, article.slug);
    assert.equal(await page.getByRole('heading', { level: 1 }).innerText(), article.title);
    assert((await page.locator('article figure img').count()) > 0, article.slug);
    await overflow();
  }
  for (const source of new Set(Object.values(helpScreenshots).map((image) => image.src))) {
    assert.equal((await context.request.get(`${base}${source}`)).status(), 200, source);
  }
  await page.goto(`${base}/help/drivers/get-verified`);
  await page.getByText('A section is Incomplete', { exact: true }).click();
  assert.equal(await page.locator('details[open]').count(), 1);
  const image = page.locator('article figure img').first();
  await image.scrollIntoViewIfNeeded();
  await image.evaluate((element) => element.decode());
  if (process.env.HELP_REVIEW_SCREENSHOTS)
    await page.screenshot({ path: '/tmp/opencode/help-article-desktop-review.png' });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${base}/help`);
  await overflow();
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Help', exact: true })
    .waitFor();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  if (process.env.HELP_REVIEW_SCREENSHOTS)
    await page.screenshot({ path: '/tmp/opencode/help-mobile-review.png' });
  await page.goto(`${base}/help/drivers/get-verified`);
  await overflow();
  await page.locator('article figure').first().scrollIntoViewIfNeeded();
  await page
    .locator('article figure img')
    .first()
    .evaluate((element) => element.decode());
  if (process.env.HELP_REVIEW_SCREENSHOTS)
    await page.screenshot({ path: '/tmp/opencode/help-article-mobile-review.png' });
  const missing = await page.goto(`${base}/help/not-a-real-guide`);
  assert.equal(missing.status(), 404);
  assert.deepEqual(errors, []);
  console.log(
    `Browser review passed: ${helpArticles.length} articles, ${helpCategories.length} categories, search/filter/empty state, FAQs, images, indexing, 404, and desktop/mobile overflow.`,
  );
  await context.close();
} finally {
  await browser.close();
}
