import ArticleCollection from '@/components/articles/ArticleCollection';
import { getArticles } from '@/lib/articles';

export const metadata = {
  title: 'Articles & field notes — TagRides',
  description:
    'The people, ideas and practical work behind shared journeys. Read the TagRides founder story and field notes.',
  alternates: { canonical: '/blog' },
  ...(process.env.NODE_ENV === 'development' ? { robots: { index: false, follow: false } } : {}),
};

export default async function BlogIndexPage() {
  return <ArticleCollection articles={await getArticles()} />;
}
