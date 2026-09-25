import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = 'content/articles/shared-value';
const manifest = JSON.parse(await readFile(`${root}/manifest.json`, 'utf8'));
assert.equal(manifest.status, 'published');
assert.equal(manifest.articles.length, 3);
assert(Number.isFinite(Date.parse(manifest.publishedAt)));
assert.equal(new Set(manifest.articles.map(({ slug }) => slug)).size, 3);
for (const article of manifest.articles) {
  const copy = await readFile(`${root}/${article.directory}/article.md`, 'utf8');
  assert(copy.startsWith(`# ${article.title}\n`), article.slug);
  const [story, notes] = copy.split('\n## Sources\n');
  const headings = [...copy.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
  assert.equal(headings.length, new Set(headings).size, `Duplicate heading: ${article.slug}`);
  const references = [
    ...new Set([...story.matchAll(/\[(\d+)\]/g)].map((match) => Number(match[1]))),
  ].sort((a, b) => a - b);
  const sources = [...notes.matchAll(/^(\d+)\./gm)].map((match) => Number(match[1]));
  assert.deepEqual(references, sources, `Citation mismatch: ${article.slug}`);
  for (const match of copy.matchAll(/!\[[^\]]+\]\(\.\.\/assets\/([^/)]+)\)/g)) {
    const image = manifest.media[match[1]];
    assert(image?.src.startsWith('/assets/articles/shared-value/'));
    await access(path.join('public', image.src));
  }
  for (const match of copy.matchAll(/\[Watch:[^\]]+\]\(([^)]+)\)/g))
    assert(manifest.videos[match[1]], match[1]);
  for (const file of [article.cover, article.cover.replace('.svg', '.png')])
    await access(`public/assets/articles/shared-value/${file}`);
  console.log(
    `Validated ${article.slug}: ${sources.length} sources, ${headings.length} unique headings.`,
  );
}
