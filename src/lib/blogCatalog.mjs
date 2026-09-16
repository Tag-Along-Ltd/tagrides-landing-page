// The versioned release copy wins a slug collision with the database. Published
// pages, APIs and static paths all use the same selection rules.
export function mergePublishedPosts(releasePosts, databasePosts = []) {
  const bySlug = new Map();
  for (const post of [...databasePosts, ...releasePosts]) {
    if (post.status === 'published' && typeof post.slug === 'string' && post.slug) {
      bySlug.set(post.slug, post);
    }
  }
  return [...bySlug.values()].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
