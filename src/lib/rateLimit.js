// Simple in-memory IP rate limit. For a pre-launch landing page with light
// traffic this is fine. When traffic grows, swap to Upstash Redis or
// Vercel KV. The interface stays the same.

const buckets = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function getKey(request) {
  const xff = request.headers.get('x-forwarded-for') || '';
  const ip = xff.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

export function checkRateLimit(request) {
  const key = getKey(request);
  const now = Date.now();
  const bucket = buckets.get(key) || { count: 0, resetAt: now + WINDOW_MS };
  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + WINDOW_MS;
  }
  bucket.count += 1;
  buckets.set(key, bucket);
  // Periodic cleanup so the Map doesn't grow forever
  if (buckets.size > 1000) {
    for (const [k, v] of buckets) {
      if (now > v.resetAt) buckets.delete(k);
    }
  }
  return {
    ok: bucket.count <= MAX_PER_WINDOW,
    remaining: Math.max(0, MAX_PER_WINDOW - bucket.count),
    resetAt: bucket.resetAt,
  };
}
