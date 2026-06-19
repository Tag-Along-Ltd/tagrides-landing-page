import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { TripFareForm } from '@/components/sections/TripFareForm';

export const metadata = {
  title: 'Help train Tag Rides — Tag Rides',
  description:
    'Drop in a trip you actually take. We use it to train fair fare and route-pattern suggestions for the app.',
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
