import { NextResponse } from 'next/server';

import clientPromise from '@/lib/mongodb';

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

function isAdmin(request) {
  if (!adminToken) return false;
  const header = request.headers.get('authorization') || '';
  return header.replace(/^Bearer\s+/i, '') === adminToken;
}

export async function GET(request, { params }) {
  const { slug } = await params;
  try {
    const client = await clientPromise;
    const collection = client.db(DB_NAME).collection(COLLECTION);
    const doc = await collection.findOne({ slug });
    if (!doc) {
      return withCors(NextResponse.json({ error: 'Post not found.' }, { status: 404 }));
    }
    if (doc.status !== 'published' && !isAdmin(request)) {
      return withCors(NextResponse.json({ error: 'Post not found.' }, { status: 404 }));
    }
    return withCors(NextResponse.json({ post: doc }));
  } catch (err) {
    console.error('post get failed', err);
    return withCors(NextResponse.json({ error: 'Could not load post.' }, { status: 502 }));
  }
}

export async function PUT(request, { params }) {
  if (!isAdmin(request)) {
    return withCors(NextResponse.json({ error: 'Unauthorized.' }, { status: 401 }));
  }
  const { slug } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return withCors(NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 }));
  }

  const update = {};
  if (typeof body.title === 'string') update.title = body.title.trim().slice(0, 200);
  if (typeof body.excerpt === 'string') update.excerpt = body.excerpt.trim().slice(0, 280);
  if (typeof body.content === 'string') update.content = body.content.trim().slice(0, 200_000);
  if (typeof body.author === 'string') update.author = body.author.trim().slice(0, 120);
  if (Array.isArray(body.tags)) update.tags = body.tags.slice(0, 10).map(String).map((s) => s.slice(0, 32));
  if (typeof body.coverImage === 'string') update.coverImage = body.coverImage.slice(0, 500);
  if (body.status === 'published' || body.status === 'draft' || body.status === 'archived') {
    update.status = body.status;
  }
  update.updatedAt = new Date();

  if (Object.keys(update).length === 1) {
    return withCors(NextResponse.json({ error: 'No fields to update.' }, { status: 400 }));
  }

  try {
    const client = await clientPromise;
    const collection = client.db(DB_NAME).collection(COLLECTION);
    const result = await collection.updateOne({ slug }, { $set: update });
    if (result.matchedCount === 0) {
      return withCors(NextResponse.json({ error: 'Post not found.' }, { status: 404 }));
    }
    return withCors(NextResponse.json({ ok: true }));
  } catch (err) {
    console.error('post update failed', err);
    return withCors(NextResponse.json({ error: 'Could not update post.' }, { status: 502 }));
  }
}

export async function DELETE(request, { params }) {
  if (!isAdmin(request)) {
    return withCors(NextResponse.json({ error: 'Unauthorized.' }, { status: 401 }));
  }
  const { slug } = await params;
  try {
    const client = await clientPromise;
    const collection = client.db(DB_NAME).collection(COLLECTION);
    // Soft delete — flip to archived so we keep history
    const result = await collection.updateOne(
      { slug },
      { $set: { status: 'archived', updatedAt: new Date() } },
    );
    if (result.matchedCount === 0) {
      return withCors(NextResponse.json({ error: 'Post not found.' }, { status: 404 }));
    }
    return withCors(NextResponse.json({ ok: true, archived: slug }));
  } catch (err) {
    console.error('post archive failed', err);
    return withCors(NextResponse.json({ error: 'Could not archive post.' }, { status: 502 }));
  }
}
