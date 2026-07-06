import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { TripFareForm } from '@/components/sections/TripFareForm';

export const metadata = {
  title: 'Help train TagRides fares — TagRides',
  description:
    'Drop in a route you actually take. We use it to tune danfo-level fare logic and route-pattern suggestions for TagRides.',
};

export default function ContributePage() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground-muted">
      <Header />
      <TripFareForm />
      <Footer />
    </main>
  );
}
