import { notFound } from 'next/navigation';

export default function BrandKitLayout({ children }) {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.ENABLE_PRIVATE_PRESENTATIONS !== 'true'
  ) {
    notFound();
  }
  return children;
}
