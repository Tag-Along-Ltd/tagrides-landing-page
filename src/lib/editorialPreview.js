import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';

// Compatibility for earlier local review links; all source now ships in this repo.
const source = path.join(process.cwd(), 'content/articles/shared-value');

export const getEditorialPreview = cache(async () => {
  if (process.env.NODE_ENV !== 'development') return null;
  const manifest = JSON.parse(await readFile(path.join(source, 'manifest.json'), 'utf8'));
  const articles = await Promise.all(
    manifest.articles.map(async (article, index) => {
      const markdown = await readFile(path.join(source, article.directory, 'article.md'), 'utf8');
      const linkedin = await readFile(path.join(source, article.directory, 'linkedin.md'), 'utf8');
      const content = markdown.split('\n').slice(6).join('\n').trim();
      const headings = [...content.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
      const words = content.split('## Sources')[0].trim().split(/\s+/).length;
      return {
        ...article,
        content,
        linkedin,
        headings,
        number: index + 1,
        minutes: Math.ceil(words / 210),
      };
    }),
  );
  return { ...manifest, articles };
});

export function headingId(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function editorialMediaUrl(name) {
  return `/api/editorial-media/${encodeURIComponent(name)}`;
}

export async function getEditorialMedia(name) {
  const pack = await getEditorialPreview();
  if (!pack) return null;
  const allowed = new Set([
    ...Object.keys(pack.media),
    ...pack.articles.flatMap((article) => [article.cover, article.cover.replace('.svg', '.png')]),
  ]);
  if (!allowed.has(name)) return null;
  return readFile(path.join(process.cwd(), 'public/assets/articles/shared-value', name));
}
