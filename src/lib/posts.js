import { cache } from 'react';
import { mergePublishedPosts } from './blogCatalog.mjs';
import { getReleasePosts } from './releasePosts';

// Resolve the same catalog for the index, detail pages, metadata and sitemap.
// Release articles remain available without a database. Existing published
// database articles are still included when Mongo is configured.
export const getPublishedPosts = cache(async () => {
  const releasePosts = await getReleasePosts();
  if (!process.env.MONGODB_URI) return mergePublishedPosts(releasePosts);
  try {
    const { default: clientPromise } = await import('./mongodb');
    const client = await clientPromise;
    const posts = await client
      .db('myBlog')
      .collection('posts')
      .find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .toArray();
    return mergePublishedPosts(releasePosts, posts);
  } catch {
    console.warn('Blog database unavailable; using release-managed articles.');
    return mergePublishedPosts(releasePosts);
  }
});

export async function getPublishedPost(slug) {
  return (await getPublishedPosts()).find((post) => post.slug === slug) || null;
}
