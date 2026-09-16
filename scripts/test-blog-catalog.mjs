import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mergePublishedPosts } from '../src/lib/blogCatalog.mjs';

test('release copy wins collisions, preserves other published articles and excludes drafts', () => {
  const release = [
    {
      slug: 'shared-route',
      status: 'published',
      publishedAt: '2026-09-15',
      title: 'Reviewed release',
    },
  ];
  const database = [
    {
      slug: 'shared-route',
      status: 'published',
      publishedAt: '2026-09-14',
      title: 'Older draft copy',
    },
    { slug: 'existing-article', status: 'published', publishedAt: '2026-06-19' },
    { slug: 'private-draft', status: 'draft', publishedAt: '2026-09-16' },
    { slug: 'archived', status: 'archived', publishedAt: '2026-09-16' },
  ];
  const posts = mergePublishedPosts(release, database);
  assert.deepEqual(
    posts.map(({ slug }) => slug),
    ['shared-route', 'existing-article'],
  );
  assert.equal(posts[0].title, 'Reviewed release');
  assert.equal(database[0].title, 'Older draft copy');
});

test('the release catalog remains usable without Mongo and excludes malformed entries', () => {
  const posts = mergePublishedPosts([
    { slug: 'valid', status: 'published', publishedAt: '2026-09-15' },
    { slug: '', status: 'published', publishedAt: '2026-09-15' },
    { status: 'published', publishedAt: '2026-09-15' },
    { slug: 'draft', status: 'draft', publishedAt: '2026-09-15' },
  ]);
  assert.equal(posts.length, 1);
  assert.equal(posts[0].slug, 'valid');
});
