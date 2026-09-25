// One-time import of the reviewed operator edition into this release repository.
import { readFile, writeFile, mkdir, copyFile, access } from 'node:fs/promises';
import path from 'node:path';

const source = path.resolve('../tagrides-operator/docs/content/2026-09-25-shared-value');
const destination = path.resolve('content/articles/shared-value');
const assets = path.resolve('public/assets/articles/shared-value');
try {
  await access(path.join(destination, 'manifest.json'));
  throw new Error('Already imported. Edit the website copy directly; do not overwrite it.');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
const original = JSON.parse(await readFile(path.join(source, 'manifest.json'), 'utf8'));
await mkdir(destination, { recursive: true });
await mkdir(assets, { recursive: true });
const manifest = {
  series: original.series,
  author: original.author,
  authorRole: original.authorRole,
  newsReviewedAt: original.newsReviewedAt,
  publishedAt: new Date().toISOString(),
  status: 'published',
  articles: original.articles,
  videos: original.videos,
  media: Object.fromEntries(
    Object.entries(original.media).map(([name, media]) => [
      name,
      {
        kind: media.kind,
        label: media.label,
        title: media.title,
        caption: media.caption,
        src: `/assets/articles/shared-value/${name}`,
      },
    ]),
  ),
};
for (const article of manifest.articles) {
  await mkdir(path.join(destination, article.directory), { recursive: true });
  for (const file of ['article.md', 'linkedin.md']) {
    await copyFile(
      path.join(source, article.directory, file),
      path.join(destination, article.directory, file),
    );
  }
}
const files = new Set([
  ...Object.keys(manifest.media),
  ...manifest.articles.flatMap(({ cover }) => [cover, cover.replace('.svg', '.png')]),
]);
for (const file of files)
  await copyFile(path.join(source, 'assets', file), path.join(assets, file));
await writeFile(path.join(destination, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Imported ${manifest.articles.length} articles and ${files.size} public assets.`);
