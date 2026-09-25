import { getEditorialMedia } from '@/lib/editorialPreview';

export async function GET(_request, { params }) {
  if (process.env.NODE_ENV !== 'development') return new Response(null, { status: 404 });
  const { name } = await params;
  const media = await getEditorialMedia(name);
  if (!media) return new Response(null, { status: 404 });
  const type = name.endsWith('.svg')
    ? 'image/svg+xml'
    : name.endsWith('.png')
      ? 'image/png'
      : 'image/webp';
  return new Response(media, {
    headers: {
      'Content-Type': type,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
