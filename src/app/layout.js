import './globals.css';
import 'swiper/css';
import 'swiper/css/bundle';
import 'react-toastify/dist/ReactToastify.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'react-circular-progressbar/dist/styles.css';

import { ToastContainer } from 'react-toastify';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

// metadataBase tells Next.js what host to resolve relative URLs against
// when generating Open Graph / Twitter card image URLs. Without it,
// production builds emit `http://localhost:3000/...` for og:image —
// which silently breaks every Twitter / Slack / LinkedIn share preview.
// Reads NEXT_PUBLIC_SITE_URL so preview-branch deploys resolve to their
// own URL; falls back to the production domain.
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tagrider.com'),
  title: 'TagRides — Their route. Your ride. | TAG-ALONG LTD',
  description:
    'Their route. Your ride. Lagos-first route-share for dense cities — drivers already heading your way pick you up, you agree the fare directly, and you pay only for your leg.',
  openGraph: {
    title: 'TagRides — Their route. Your ride.',
    description:
      'Lagos-first route-share for cities where daily ride-hail is too expensive and shared routes already exist.',
    images: [{ url: '/assets/brand/og-image.png', width: 1200, height: 630, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TagRides — Their route. Your ride.',
    description:
      'Lagos-first route-share for cities where daily ride-hail is too expensive and shared routes already exist.',
    images: ['/assets/brand/og-image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tag Rides',
  legalName: 'TAG-ALONG LTD',
  url: 'https://tagrider.com',
  logo: 'https://tagrider.com/assets/brand/mark.svg',
  description:
    'Lagos-first route-share for dense cities. Drivers heading your way pick you up, agree the fare directly, and only charge for your leg of the trip.',
  sameAs: [
    'https://www.instagram.com/tagrides/',
    'https://x.com/tagrides_',
    'https://www.linkedin.com/company/104305162/',
    'https://www.facebook.com/61566568220406/about',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Owode-Ogombo',
    addressRegion: 'Lagos State',
    addressCountry: 'NG',
  },
  areaServed: { '@type': 'City', name: 'Lagos' },
  founder: { '@type': 'Person', name: 'Olaiya Odili-Chuks' },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ToastContainer />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
