import './globals.css';
import 'swiper/css';
import 'swiper/css/bundle';
import 'react-toastify/dist/ReactToastify.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'react-circular-progressbar/dist/styles.css';

import { ToastContainer } from 'react-toastify';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';

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

export const metadata = {
  title: 'TagRides — Share the ride. Share the fare. | TAG-ALONG LTD',
  description:
    'Their route. Your ride. Lagos route-share — drivers heading your way pick you up, you agree the fare directly, pay only for your leg of the trip.',
  icons: {
    icon: [
      { url: '/assets/brand/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
  },
  openGraph: {
    title: 'TagRides — Their route. Your ride.',
    description:
      'Lagos route-share. Drivers heading where you are. Agree the fare directly. Pay only for your leg of the trip.',
    images: [{ url: '/assets/brand/og-image.svg', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body suppressHydrationWarning>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
