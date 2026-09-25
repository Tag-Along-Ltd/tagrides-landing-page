import { BrandKitDeck } from '@/components/brand-kit/BrandKitDeck';

export const metadata = {
  title: 'Operational Brand Kit | TagRides',
  description: 'TagRides identity, field applications and production-ready operational documents.',
  robots: { index: false, follow: false },
};

export default function BrandKitPage() {
  return <BrandKitDeck />;
}
