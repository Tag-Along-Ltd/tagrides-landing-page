import { HelpHero } from '@/components/help/HelpHero';
import { HelpLibrary } from '@/components/help/HelpLibrary';
import { helpArticles, helpCategories } from '@/data/help/articles.mjs';

export const metadata = { alternates: { canonical: '/help' } };

export default function HelpPage() {
  return (
    <>
      <HelpHero />
      <HelpLibrary articles={helpArticles} categories={helpCategories} />
    </>
  );
}
