import { notFound } from 'next/navigation';

import { OperationalTemplate } from '@/components/brand-kit/OperationalTemplate';
import { TemplateToolbar } from '@/components/brand-kit/TemplateToolbar';
import { brandDocuments } from '@/data/brandKit';

export function generateStaticParams() {
  return brandDocuments.map(({ slug }) => ({ template: slug }));
}

export async function generateMetadata({ params }) {
  const { template } = await params;
  const document = brandDocuments.find(({ slug }) => slug === template);
  return {
    title: document ? `${document.title} | TagRides Brand Kit` : 'Brand template | TagRides',
    robots: { index: false, follow: false },
  };
}

export default async function BrandTemplatePage({ params }) {
  const { template } = await params;
  const document = brandDocuments.find(({ slug }) => slug === template);
  if (!document) notFound();

  return (
    <main className={`brand-template-page brand-template-${template}`}>
      <style>{`@page { size: ${template === 'receipt' ? 'A5 portrait' : template === 'compliment-slip' ? '210mm 99mm' : template === 'envelope' ? '220mm 110mm' : template === 'stamp' ? 'A5 portrait' : template === 'business-card' || template === 'staff-id' ? '85.6mm 55mm' : ['email-signature', 'social-media-kit', 'site-board', 'vehicle-livery'].includes(template) ? 'A4 landscape' : 'A4 portrait'}; margin: 0; }`}</style>
      <TemplateToolbar group={document.group} size={document.size} />
      <OperationalTemplate type={template} />
    </main>
  );
}
