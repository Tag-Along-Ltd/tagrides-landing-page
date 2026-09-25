import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';

const root = path.join(process.cwd(), 'content/articles/shared-value');

export const getSharedValuePosts = cache(async () => {
  const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'));
  return Promise.all(
    manifest.articles.map(async (article, index) => {
      const markdown = await readFile(path.join(root, article.directory, 'article.md'), 'utf8');
      const content = markdown.split('\n').slice(6).join('\n').trim();
      const linkedin =
        process.env.NODE_ENV === 'development'
          ? await readFile(path.join(root, article.directory, 'linkedin.md'), 'utf8')
          : undefined;
      return {
        ...article,
        excerpt: article.description,
        author: manifest.author,
        authorRole: manifest.authorRole,
        status: manifest.status,
        publishedAt: manifest.publishedAt,
        updatedAt: manifest.publishedAt,
        coverImage: `/assets/articles/shared-value/${article.cover}`,
        tags: [manifest.series, article.audience],
        series: manifest.series,
        number: index + 1,
        media: manifest.media,
        videos: manifest.videos,
        newsReviewedAt: manifest.newsReviewedAt,
        content,
        linkedin,
        readTimeMinutes: Math.max(
          1,
          Math.ceil(content.split('## Sources')[0].trim().split(/\s+/).length / 210),
        ),
      };
    }),
  );
});
