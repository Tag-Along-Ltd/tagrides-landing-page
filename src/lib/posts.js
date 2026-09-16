import { cache } from 'react';
import { blogPosts } from '@/data/blog-posts';
import { mergePublishedPosts } from './blogCatalog.mjs';

// Resolve the same catalog for the index, detail pages, metadata and sitemap.
// Release articles remain available without a database. Existing published
// database articles are still included when Mongo is configured.
export const getPublishedPosts = cache(async () => {
  if (!process.env.MONGODB_URI) return mergePublishedPosts(blogPosts);
  try {
    const { default: clientPromise } = await import('./mongodb');
    const client = await clientPromise;
    const posts = await client
      .db('myBlog')
      .collection('posts')
      .find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .toArray();
    return mergePublishedPosts(blogPosts, posts);
  } catch {
    console.warn('Blog database unavailable; using release-managed articles.');
    return mergePublishedPosts(blogPosts);
  }
});

export async function getPublishedPost(slug) {
  return (await getPublishedPosts()).find((post) => post.slug === slug) || null;
}
