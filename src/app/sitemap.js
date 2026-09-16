import { getPublishedPosts } from '@/lib/posts';

const BASE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://tagrider.com';

export const dynamic = 'force-static';

export default async function sitemap() {
  const now = new Date();
  const posts = await getPublishedPosts();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/about-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/brand`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contribute`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/support`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...posts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
