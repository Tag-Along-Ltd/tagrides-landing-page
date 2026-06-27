// Pitch deck — overrides the root metadata so OG/Twitter cards for
// /pitch read as a deck, not the homepage. The og:image will swap to a
// pitch-specific render when the per-audience PDF pipeline lands (Phase 2).

export const metadata = {
  title: 'TagRides — Pitch Deck',
  description:
    'Lagos route-share. The full TagRides story for investors, judges, and customers — scroll-through deck, downloadable per audience.',
  openGraph: {
    title: 'TagRides — Pitch Deck',
    description:
      'Lagos route-share. Drivers heading where you are. Pay only for your leg. Read the full story.',
    images: [{ url: '/assets/brand/og-image.png', width: 1200, height: 630, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TagRides — Pitch Deck',
    images: ['/assets/brand/og-image.png'],
  },
};

export default function PitchLayout({ children }) {
  return children;
}
