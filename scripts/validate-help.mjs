import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { helpArticles, helpCategories } from '../src/data/help/articles.mjs';
import { helpScreenshots } from '../src/data/help/screenshots.mjs';

const categories = new Set(helpCategories.map((item) => item.id));
const slugs = new Set(helpArticles.map((item) => item.slug));
assert.equal(slugs.size, helpArticles.length, 'Duplicate article slug');
assert.equal(helpArticles.length, 31);
const rows = (await readFile('docs/help/SCREEN_CAPTURE_MANIFEST.csv', 'utf8'))
  .trim()
  .split('\n')
  .slice(1);
const screenIds = new Set(rows.map((row) => row.split(',')[0]));
screenIds.add('M09');
for (const article of helpArticles) {
  assert(categories.has(article.category), `Unknown category: ${article.slug}`);
  assert(article.slug.startsWith(`${article.category}/`));
  assert(!article.slug.includes('admin'));
  assert(
    article.summary &&
      article.outcome &&
      article.steps.length >= 3 &&
      article.troubleshooting.length,
  );
  assert.equal(new Set(article.steps.map((step) => step.title)).size, article.steps.length);
  for (const related of article.related)
    assert(slugs.has(related), `${article.slug}: missing related guide ${related}`);
  let illustrated = false;
  for (const step of article.steps) {
    for (const id of step.shots) {
      assert(screenIds.has(id), `${article.slug}: unknown screen ${id}`);
      if (helpScreenshots[id]) illustrated = true;
    }
  }
  assert(illustrated, `No verified illustration in ${article.slug}`);
}
const checked = new Set();
for (const image of Object.values(helpScreenshots)) {
  assert(
    image.alt && image.caption && image.sourceCommit && image.platform.includes('sample data'),
  );
  for (const callout of image.callouts) {
    if (typeof callout === 'object') {
      assert(
        callout.text && callout.x >= 0 && callout.x <= 100 && callout.y >= 0 && callout.y <= 100,
      );
    }
  }
  if (checked.has(image.src)) continue;
  checked.add(image.src);
  const path = `public${image.src}`;
  await access(path);
  const metadata = await sharp(path).metadata();
  assert.equal(metadata.width, image.width, `${path}: width`);
  assert.equal(metadata.height, image.height, `${path}: height`);
}
console.log(
  `Validated ${helpArticles.length} illustrated articles, ${categories.size} categories and ${checked.size} image files. Related links and image dimensions are valid; admin is excluded.`,
);
