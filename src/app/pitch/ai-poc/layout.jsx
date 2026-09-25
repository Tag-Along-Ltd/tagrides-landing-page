import { notFound } from 'next/navigation';

export const metadata = {
  title: 'TagRides × SnapSoft | AI PoC',
  description: 'TagRides mobility intelligence proof-of-concept presentation for SnapSoft and AWS.',
  robots: { index: false, follow: false },
};

export default function AiPocLayout({ children }) {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.ENABLE_PRIVATE_PRESENTATIONS !== 'true'
  ) {
    notFound();
  }
  return children;
}
