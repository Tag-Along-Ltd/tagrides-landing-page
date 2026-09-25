import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, ArrowRight, Check, Clock, ChevronRight } from 'lucide-react';
import { helpReview, getHelpArticle, readingMinutes } from '@/data/help/articles.mjs';
import { helpScreenshots } from '@/data/help/screenshots.mjs';

function Copy({ children }) {
  return (
    <div className="help-copy space-y-3 text-[15px] leading-7 text-foreground-muted [&_strong]:font-semibold [&_strong]:text-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_p+p]:mt-3">
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}

function Screenshot({ id }) {
  const image = helpScreenshots[id];
  if (!image) return null;
  return (
    <figure className="my-7 overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="relative mx-auto max-w-sm bg-background px-4 pt-5">
        <a
          href={image.src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open full-size screenshot: ${image.caption}`}
          className="relative block rounded-xl focus-visible:outline-2 focus-visible:outline-primary"
        >
          {/* Deliberate panel crops are recorded in image metadata; never object-cover. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            className="mx-auto h-auto w-full rounded-xl"
          />
          {image.callouts.map(
            (callout, index) =>
              typeof callout === 'object' && (
                <span
                  key={callout.text}
                  aria-hidden="true"
                  style={{ left: `${callout.x}%`, top: `${callout.y}%` }}
                  className="pointer-events-none absolute flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-xs font-extrabold text-black shadow-sm"
                >
                  {index + 1}
                </span>
              ),
          )}
        </a>
      </div>
      <figcaption className="border-t border-border p-5 text-sm leading-6 text-foreground-muted">
        <p className="font-medium text-foreground">{image.caption}</p>
        <p className="mt-1 text-xs">
          {image.platform} · Captured {image.capturedAt}
        </p>
        {image.callouts?.length > 0 && (
          <ol className="mt-3 space-y-2">
            {image.callouts.map((callout, index) => (
              <li key={typeof callout === 'string' ? callout : callout.text} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <span>{typeof callout === 'string' ? callout : callout.text}</span>
              </li>
            ))}
          </ol>
        )}
      </figcaption>
    </figure>
  );
}

export function HelpArticle({ article, category }) {
  const related = article.related.map(getHelpArticle).filter(Boolean);
  return (
    <>
      <header className="mx-auto max-w-6xl px-5 pt-10 pb-10 sm:px-8 md:pt-14">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-foreground-muted"
        >
          <Link href="/help" className="hover:text-primary">
            Help centre
          </Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <Link href={`/help/${category.id}`} className="hover:text-primary">
            {category.title}
          </Link>
        </nav>
        <p className="mt-9 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {category.title}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.12] font-extrabold tracking-tight text-foreground sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          {article.summary}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-foreground-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            {readingMinutes(article)} min read
          </span>
          <span>{article.steps.length} clear steps</span>
          <span>Source reviewed {helpReview.date}</span>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
        <aside
          aria-label="On this page"
          className="self-start rounded-2xl border border-border bg-surface/40 p-5 lg:sticky lg:top-24"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-foreground">
            On this page
          </p>
          <ol className="mt-4 space-y-3">
            {article.steps.map((step, index) => (
              <li key={step.title}>
                <a
                  href={`#step-${index + 1}`}
                  className="flex gap-2 text-sm leading-5 text-foreground-muted hover:text-primary"
                >
                  <span className="text-primary">{String(index + 1).padStart(2, '0')}</span>
                  <span>{step.title}</span>
                </a>
              </li>
            ))}
          </ol>
          <a
            href="#troubleshooting"
            className="mt-5 block border-t border-border pt-4 text-sm text-primary"
          >
            If something goes wrong
          </a>
        </aside>
        <article className="min-w-0 max-w-3xl">
          {article.before.length > 0 && (
            <section className="mb-9 rounded-2xl border border-border bg-surface/60 p-6">
              <h2 className="font-display text-lg font-bold text-foreground">Before you begin</h2>
              <ul className="mt-4 space-y-3">
                {article.before.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-foreground-muted">
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {article.note && (
            <div className="mb-9 rounded-r-2xl border-l-2 border-amber-400 bg-amber-400/5 px-5 py-4 text-sm leading-6 text-foreground-muted">
              <span className="mb-1 block font-semibold text-foreground">Good to know</span>
              {article.note}
            </div>
          )}
          <div className="space-y-9">
            {article.steps.map((step, index) => (
              <section
                id={`step-${index + 1}`}
                key={step.title}
                className="scroll-mt-28 border-b border-border pb-9 last:border-0"
              >
                <div className="mb-4 flex items-start gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 font-mono text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <h2 className="pt-1 font-display text-2xl leading-tight font-bold text-foreground">
                    {step.title}
                  </h2>
                </div>
                <Copy>{step.body}</Copy>
                {step.shots.map((id) => (
                  <Screenshot key={id} id={id} />
                ))}
              </section>
            ))}
          </div>
          <section className="mt-7 rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
              <Check aria-hidden="true" className="size-5 text-primary" />
              How you know it worked
            </h2>
            <p className="mt-3 text-sm leading-7 text-foreground-muted">{article.outcome}</p>
          </section>
          <section id="troubleshooting" className="mt-12 scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              A useful next step
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-foreground">
              If something goes wrong
            </h2>
            <div className="mt-5 divide-y divide-border border-y border-border">
              {article.troubleshooting.map((item) => (
                <details key={item.question} className="group py-1">
                  <summary className="cursor-pointer py-4 pr-2 text-base font-semibold text-foreground marker:text-primary">
                    {item.question}
                  </summary>
                  <div className="pb-5">
                    <Copy>{item.answer}</Copy>
                  </div>
                </details>
              ))}
            </div>
          </section>
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold text-foreground">
              Continue your walkthrough
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/help/${item.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-border p-4 text-sm font-medium text-foreground hover:border-primary/60"
                >
                  <span>{item.title}</span>
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-primary" />
                </Link>
              ))}
            </div>
          </section>
          <Link
            href="/help"
            className="mt-9 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All walkthroughs
          </Link>
        </article>
      </div>
    </>
  );
}
