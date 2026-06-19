import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import clientPromise from '@/lib/mongodb';

export const revalidate = 300;

async function getPost(slug) {
  try {
    const client = await clientPromise;
    return await client.db('myBlog').collection('posts').findOne({ slug, status: 'published' });
  } catch (err) {
    console.error('post fetch failed', err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post not found — Tag Rides' };
  return {
    title: `${post.title} — Tag Rides`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString?.() || undefined,
      authors: [post.author],
      images: post.coverImage
        ? [{ url: post.coverImage }]
        : [{ url: '/assets/brand/og-image.png', width: 1200, height: 630 }],
    },
  };
}

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground-muted">
      <Header />

      <article className="relative">
        {/* Cover */}
        {post.coverImage && (
          <div className="relative isolate mx-auto mt-20 max-w-5xl px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt=""
              className="aspect-[16/9] w-full rounded-3xl border border-border object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className={`mx-auto max-w-3xl px-6 ${post.coverImage ? 'mt-12' : 'mt-28 md:mt-36'}`}>
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted transition hover:border-primary/40 hover:text-foreground"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
          <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-foreground-muted md:text-lg">
            {post.excerpt}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-border pt-5 text-xs text-foreground-muted">
            <span className="font-medium text-foreground">{post.author}</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            {post.readTimeMinutes ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {post.readTimeMinutes} min read
              </span>
            ) : null}
          </div>
        </header>

        {/* Body */}
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <div className="prose-tag">
            <ReactMarkdown>{post.content || ''}</ReactMarkdown>
          </div>
        </div>

        {/* Footer / back-to-index */}
        <div className="mx-auto max-w-3xl px-6 pb-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <ArrowLeft className="size-4" />
            All field notes
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
