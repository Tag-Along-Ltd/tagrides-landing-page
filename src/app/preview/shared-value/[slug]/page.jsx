import { notFound, redirect } from 'next/navigation';
import { getEditorialPreview } from '@/lib/editorialPreview';

export const dynamicParams = false;

export async function generateStaticParams() {
  const pack = await getEditorialPreview();
  return pack?.articles.map(({ slug }) => ({ slug })) || [];
}

export default async function LegacyEditorialArticle({ params }) {
  const { slug } = await params;
  const pack = await getEditorialPreview();
  if (!pack?.articles.some((article) => article.slug === slug)) notFound();
  redirect(`/blog/${slug}`);
}
