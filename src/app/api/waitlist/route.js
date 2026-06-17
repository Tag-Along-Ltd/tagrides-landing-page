import { NextResponse } from 'next/server';

import clientPromise from '@/lib/mongodb';

const DB_NAME = 'myBlog'; // matches the existing posts DB; rename together when we redo the blog
const COLLECTION = 'waitlist';

const allowedOrigin = process.env.NEXT_PUBLIC_ALLOWED_ORIGIN;

function withCors(response) {
  if (allowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  }
  return response;
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return withCors(response);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return withCors(NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 }));
  }

  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return withCors(NextResponse.json({ error: 'A valid email is required.' }, { status: 400 }));
  }

  const source = typeof body?.source === 'string' ? body.source.slice(0, 80) : 'landing-page-hero';

  try {
    const client = await clientPromise;
    const collection = client.db(DB_NAME).collection(COLLECTION);

    // Idempotent — Mongo no-ops if the index already matches.
    await collection.createIndex({ email: 1 }, { unique: true });

    await collection.insertOne({
      email,
      source,
      createdAt: new Date(),
    });

    return withCors(NextResponse.json({ ok: true }));
  } catch (err) {
    // Duplicate key: someone's already on the list under this email.
    if (err?.code === 11000) {
      return withCors(NextResponse.json({ ok: true, alreadySubscribed: true }));
    }
    console.error('waitlist insert failed', err);
    return withCors(
      NextResponse.json({ error: 'Could not add you to the list right now.' }, { status: 502 }),
    );
  }
}
