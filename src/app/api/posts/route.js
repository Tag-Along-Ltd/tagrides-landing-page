import { NextResponse } from 'next/server';

import clientPromise from '@/lib/mongodb';
import { checkRateLimit } from '@/lib/rateLimit';

const DB_NAME = 'myBlog';
const COLLECTION = 'posts';

const allowedOrigin = process.env.NEXT_PUBLIC_ALLOWED_ORIGIN;
const adminToken = process.env.ADMIN_TOKEN || '';

function withCors(response) {
  if (allowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  }
  return response;
}

function slugify(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

function isAdmin(request) {
  if (!adminToken) return false;
  const header = request.headers.get('authorization') || '';
  const token = header.replace(/^Bearer\s+/i, '');
  return token === adminToken;
}

function readTimeMinutes(content) {
  const words = String(content || '').trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return withCors(response);
}

/**
 * GET /api/posts
 *   Public: published posts, sorted desc by publishedAt, list-view fields only.
 *   Admin (Bearer ADMIN_TOKEN): can pass ?status=draft to see drafts.
 *
 *   ?tag=thesis    → filter
 *   ?limit=N       → default 50, max 100
 */
export async function GET(request) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status') || 'published';
  const tag = url.searchParams.get('tag');
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '50', 10)));

  if (status !== 'published' && !isAdmin(request)) {
    return withCors(NextResponse.json({ error: 'Unauthorized.' }, { status: 401 }));
  }

  try {
    const client = await clientPromise;
    const collection = client.db(DB_NAME).collection(COLLECTION);
    const query = { status };
    if (tag) query.tags = tag;
    const docs = await collection
      .find(query, { projection: { content: 0 } })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .toArray();
    return withCors(NextResponse.json({ posts: docs }));
  } catch (err) {
    console.error('posts list failed', err);
    return withCors(NextResponse.json({ error: 'Could not load posts.' }, { status: 502 }));
  }
}

/**
 * POST /api/posts   (admin only — requires Bearer ADMIN_TOKEN env var)
 * Body: { title, excerpt, content (markdown), author, tags?, coverImage?, status? }
 */
export async function POST(request) {
  const rl = checkRateLimit(request);
  if (!rl.ok) {
    return withCors(NextResponse.json({ error: 'Too many requests.' }, { status: 429 }));
  }
  if (!isAdmin(request)) {
    return withCors(NextResponse.json({ error: 'Unauthorized.' }, { status: 401 }));
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return withCors(NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 }));
  }

  const title = String(body?.title || '').trim().slice(0, 200);
  const excerpt = String(body?.excerpt || '').trim().slice(0, 280);
  const content = String(body?.content || '').trim().slice(0, 200_000);
  const author = String(body?.author || 'Tag Rides').trim().slice(0, 120);
  const slug = body?.slug ? slugify(body.slug) : slugify(title);
  const tags = Array.isArray(body?.tags)
    ? body.tags.slice(0, 10).map(String).map((s) => s.slice(0, 32))
    : [];
  const coverImage = body?.coverImage ? String(body.coverImage).slice(0, 500) : null;
  const status = body?.status === 'draft' ? 'draft' : 'published';

  if (!title || !excerpt || !content || !slug) {
    return withCors(
      NextResponse.json({ error: 'title, excerpt, content, slug are required.' }, { status: 400 }),
    );
  }

  try {
    const client = await clientPromise;
    const collection = client.db(DB_NAME).collection(COLLECTION);
    await collection.createIndex({ slug: 1 }, { unique: true });
    await collection.createIndex({ status: 1, publishedAt: -1 });
    await collection.createIndex({ tags: 1 });

    const now = new Date();
    const doc = {
      slug,
      title,
      excerpt,
      content,
      author,
      tags,
      coverImage,
      status,
      readTimeMinutes: readTimeMinutes(content),
      publishedAt: now,
      updatedAt: now,
    };
    await collection.insertOne(doc);
    return withCors(NextResponse.json({ ok: true, slug }));
  } catch (err) {
    if (err?.code === 11000) {
      return withCors(
        NextResponse.json({ error: 'A post with that slug already exists.' }, { status: 409 }),
      );
    }
    console.error('post insert failed', err);
    return withCors(NextResponse.json({ error: 'Could not save the post.' }, { status: 502 }));
  }
}
