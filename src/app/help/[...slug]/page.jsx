import { notFound } from 'next/navigation';
import { HelpArticle } from '@/components/help/HelpArticle';
import { HelpHero } from '@/components/help/HelpHero';
import { HelpLibrary } from '@/components/help/HelpLibrary';
import {
  getHelpArticle,
  getHelpCategory,
  helpArticles,
  helpCategories,
} from '@/data/help/articles.mjs';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...helpCategories.map(({ id }) => ({ slug: [id] })),
    ...helpArticles.map(({ slug }) => ({ slug: slug.split('/') })),
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const path = slug.join('/');
  const entry = getHelpArticle(path) || (slug.length === 1 && getHelpCategory(path));
  if (!entry) return { title: 'Guide not found — TagRides' };
  return {
    title: `${entry.title} — TagRides Help`,
    description: entry.summary || entry.description,
    alternates: { canonical: `/help/${path}` },
  };
}

export default async function HelpDetailPage({ params }) {
  const { slug } = await params;
  if (slug.length === 1) {
    const category = getHelpCategory(slug[0]);
    if (!category) notFound();
    return (
      <>
        <HelpHero category={category} />
        <HelpLibrary
          key={category.id}
          articles={helpArticles}
          categories={helpCategories}
          initialCategory={category.id}
        />
      </>
    );
  }
  const article = getHelpArticle(slug.join('/'));
  if (!article) notFound();
  return <HelpArticle article={article} category={getHelpCategory(article.category)} />;
}
