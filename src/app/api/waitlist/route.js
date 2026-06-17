import { NextResponse } from 'next/server';

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/contacts';

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
  const apiKey = process.env.BREVO_API_KEY || process.env.NEXT_PUBLIC_BREVO_API_KEY;
  const listIdRaw = process.env.BREVO_LIST_ID || process.env.NEXT_PUBLIC_BREVO_LIST_ID;

  if (!apiKey || !listIdRaw) {
    return withCors(
      NextResponse.json(
        { error: 'Waitlist is not configured. Missing BREVO_API_KEY or BREVO_LIST_ID.' },
        { status: 500 },
      ),
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return withCors(NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 }));
  }

  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return withCors(NextResponse.json({ error: 'A valid email is required.' }, { status: 400 }));
  }

  try {
    const upstream = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [parseInt(listIdRaw, 10)],
        updateEnabled: false,
      }),
    });

    if (upstream.ok) {
      return withCors(NextResponse.json({ ok: true }));
    }

    const payload = await upstream.json().catch(() => null);
    if (upstream.status === 400 && payload?.code === 'duplicate_parameter') {
      return withCors(NextResponse.json({ ok: true, alreadySubscribed: true }));
    }

    // Surface upstream error to server logs so dev can debug; don't leak it to the client.
    console.error('brevo error', upstream.status, payload);
    return withCors(
      NextResponse.json({ error: 'Could not add you to the list right now.' }, { status: 502 }),
    );
  } catch (err) {
    console.error('waitlist proxy failed', err);
    return withCors(NextResponse.json({ error: 'Network error.' }, { status: 502 }));
  }
}
