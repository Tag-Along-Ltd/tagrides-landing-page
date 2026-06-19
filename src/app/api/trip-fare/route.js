import { NextResponse } from 'next/server';

import clientPromise from '@/lib/mongodb';
import { checkRateLimit } from '@/lib/rateLimit';

const DB_NAME = 'myBlog'; // matches existing collections; we'll rename together in the eventual cleanup
const COLLECTION = 'tripFares';

const allowedOrigin = process.env.NEXT_PUBLIC_ALLOWED_ORIGIN;

const TIMES = ['morning-rush', 'midday', 'evening-rush', 'late-night', 'variable'];
const DURATIONS = ['under-15', '15-30', '30-60', '60-plus'];
const MODES = ['along', 'direct', 'either'];

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

function clampStr(v, max) {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
}

function clampInt(v, max) {
  const n = Number.parseInt(v, 10);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.min(n, max);
}

export async function POST(request) {
  const rl = checkRateLimit(request);
  if (!rl.ok) {
    return withCors(
      NextResponse.json({ error: 'Too many submissions. Try again in a minute.' }, { status: 429 }),
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return withCors(NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 }));
  }

  // Honeypot
  if (typeof body?.website === 'string' && body.website.trim() !== '') {
    return withCors(NextResponse.json({ ok: true }));
  }

  const start = clampStr(body?.start, 200);
  const end = clampStr(body?.end, 200);
  const minFare = clampInt(body?.minFare, 1_000_000);
  const maxFare = clampInt(body?.maxFare, 1_000_000);
  const timeOfDay = TIMES.includes(body?.timeOfDay) ? body.timeOfDay : null;
  const duration = DURATIONS.includes(body?.duration) ? body.duration : null;
  const mode = MODES.includes(body?.mode) ? body.mode : null;
  const notes = clampStr(body?.notes, 500);

  if (!start || !end) {
    return withCors(
      NextResponse.json({ error: 'Start and destination are required.' }, { status: 400 }),
    );
  }
  if (minFare === null || maxFare === null) {
    return withCors(NextResponse.json({ error: 'Fares are required.' }, { status: 400 }));
  }
  if (minFare > maxFare) {
    return withCors(
      NextResponse.json({ error: 'Min fare can\'t be higher than max fare.' }, { status: 400 }),
    );
  }
  if (!timeOfDay || !duration || !mode) {
    return withCors(
      NextResponse.json(
        { error: 'Time of day, duration, and mode are all required.' },
        { status: 400 },
      ),
    );
  }

  try {
    const client = await clientPromise;
    const collection = client.db(DB_NAME).collection(COLLECTION);
    await collection.insertOne({
      start,
      end,
      minFare,
      maxFare,
      timeOfDay,
      duration,
      mode,
      notes: notes || null,
      source: 'landing-page',
      createdAt: new Date(),
    });
    return withCors(NextResponse.json({ ok: true }));
  } catch (err) {
    console.error('tripFare insert failed', err);
    return withCors(
      NextResponse.json({ error: 'Could not save your route right now.' }, { status: 502 }),
    );
  }
}
