import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { Reveal, RevealStagger, RevealItem } from '@/components/sections/Reveal';
import clientPromise from '@/lib/mongodb';

export const metadata = {
  title: 'Field notes — Tag Rides',
  description:
    'Lagos mobility, route-share economics, and the work of building Tag Rides — in plain language.',
};

export const revalidate = 300;

async function getPosts() {
  try {
    const client = await clientPromise;
    return await client
      .db('myBlog')
      .collection('posts')
      .find({ status: 'published' }, { projection: { content: 0 } })
      .sort({ publishedAt: -1 })
      .limit(50)
      .toArray();
  } catch (err) {
    console.error('blog index Mongo read failed', err);
    return [];
  }
}

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground-muted">
      <Header />
      <section className="relative isolate overflow-hidden">
        <div className="hero-light absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto max-w-5xl px-6 pt-28 pb-12 md:pt-36 md:pb-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Field notes
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              How Lagos moves — and how Tag Rides moves with it.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted md:text-lg">
              Short essays on the route-share thesis, the city, and the build. Plain language. No filler.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <RevealStagger className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <RevealItem
                  key={post.slug}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-surface transition hover:border-primary/40 hover:bg-elevated"
                >
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    {post.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.coverImage}
                        alt=""
                        className="aspect-[16/9] w-full object-cover"
                      />
                    ) : (
                      <div className="aspect-[16/9] w-full bg-gradient-to-br from-primary/10 via-elevated to-accent/10" />
                    )}
                    <div className="p-6 md:p-7">
                      {Array.isArray(post.tags) && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground transition group-hover:text-primary md:text-2xl">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                        {post.excerpt}
                      </p>
                      <div className="mt-5 flex items-center gap-4 text-xs text-foreground-muted">
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
                        <span className="ml-auto inline-flex items-center gap-1 text-primary opacity-0 transition group-hover:opacity-100">
                          Read
                          <ArrowRight className="size-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealStagger>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function EmptyState() {
  return (
    <Reveal>
      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-surface p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Shipping soon</p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          First essays land this quarter.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
          We&rsquo;re writing about the marginal-zero economics thesis, the Lagos pilot, and what we
          learned from 210 rider responses. Drop your email on the home page to be the first to read
          them.
        </p>
        <Link
          href="/#join"
          className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
        >
          Join the waitlist
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </Reveal>
  );
}
