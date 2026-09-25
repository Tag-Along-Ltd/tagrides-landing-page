import ArticleLayout from '@/components/articles/ArticleLayout';

export default function BlogLayout({ children }) {
  return <ArticleLayout review={process.env.NODE_ENV === 'development'}>{children}</ArticleLayout>;
}
