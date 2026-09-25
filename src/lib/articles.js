import { cache } from 'react';
import { getPublishedPosts } from './posts';

// One release-managed catalog powers article views, the public API and sitemap.
export const getArticles = cache(async () => {
  const published = (await getPublishedPosts()).map((post) => ({
    ...post,
    description: post.excerpt,
    audience: post.tags?.[0] || 'Field notes',
    cover: post.coverImage,
    headings: [...(post.content || '').matchAll(/^## (.+)$/gm)].map((match) => match[1]),
    minutes:
      post.readTimeMinutes ||
      Math.max(1, Math.ceil((post.content || '').split(/\s+/).length / 210)),
    authorRole: post.authorRole || '',
    media: post.media || {},
  }));
  return published;
});

export async function getArticle(slug) {
  return (await getArticles()).find((article) => article.slug === slug) || null;
}
