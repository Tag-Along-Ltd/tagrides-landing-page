import { notFound } from 'next/navigation';
import ArticleReader from '@/components/articles/ArticleReader';
import { getArticle, getArticles } from '@/lib/articles';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getArticles()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: 'Article not found — TagRides', robots: { index: false } };
  if (article.status === 'draft') {
    return {
      title: `${article.title} — TagRides review`,
      description: article.description,
      robots: { index: false, follow: false },
    };
  }
  const images =
    article.series && article.cover
      ? [{ url: article.cover.replace('.svg', '.png'), width: 1600, height: 900 }]
      : article.cover && !article.cover.endsWith('.svg')
        ? [{ url: article.cover }]
        : [{ url: '/assets/brand/og-image.png', width: 1200, height: 630 }];
  return {
    title: `${article.title} — TagRides`,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: `/blog/${article.slug}`,
      publishedTime: new Date(article.publishedAt).toISOString(),
      modifiedTime: new Date(article.updatedAt || article.publishedAt).toISOString(),
      authors: [article.author],
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: images.map(({ url }) => url),
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const articles = await getArticles();
  const index = articles.findIndex((article) => article.slug === slug);
  if (index < 0) notFound();
  const next = articles.length > 1 ? articles[(index + 1) % articles.length] : null;
  return <ArticleReader article={articles[index]} next={next} />;
}
