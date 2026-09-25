import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
  title: 'Help centre — TagRides',
  description:
    'Step-by-step guides to registration, shared rides, payments and your TagRides account.',
  robots: { index: true, follow: true },
};

export default function HelpLayout({ children }) {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="border-b border-border bg-surface/60 px-5 py-2.5 text-center text-xs leading-5 text-foreground-muted">
        Pre-launch app guides · Screens use sample data · Availability depends on your account and
        location
      </div>
      {children}
      <Footer />
    </main>
  );
}
