'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';

export function HelpLibrary({ articles, categories, initialCategory = 'all' }) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');
  const visible = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return articles.filter((article) => {
      if (category !== 'all' && article.category !== category) return false;
      const text = [
        article.title,
        article.summary,
        ...article.before,
        ...article.steps.map((step) => `${step.title} ${step.body}`),
        ...article.troubleshooting.map((item) => `${item.question} ${item.answer}`),
      ]
        .join(' ')
        .toLowerCase();
      return words.every((word) => text.includes(word));
    });
  }, [articles, category, query]);

  return (
    <section aria-label="Find a walkthrough" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
      <div className="relative max-w-2xl">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-4 left-4 size-5 text-primary"
        />
        <label htmlFor="help-search" className="sr-only">
          Search all walkthroughs
        </label>
        <input
          id="help-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try ‘driver documents’, ‘pickup’ or ‘wallet’"
          className="min-h-14 w-full rounded-2xl border border-border bg-surface py-3 pr-14 pl-12 text-base text-foreground outline-none placeholder:text-foreground-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery('')}
            className="absolute top-1 right-1 flex size-12 items-center justify-center rounded-xl text-foreground-muted hover:bg-elevated focus-visible:outline-2 focus-visible:outline-primary"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <div aria-label="Filter by topic" className="mt-6 flex flex-wrap gap-2">
        {[{ id: 'all', title: 'All guides' }, ...categories].map((item) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={category === item.id}
            onClick={() => setCategory(item.id)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${category === item.id ? 'border-primary bg-primary text-white' : 'border-border bg-background text-foreground-muted hover:border-primary/60 hover:text-foreground'}`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <p role="status" aria-live="polite" className="mt-7 mb-5 text-sm text-foreground-muted">
        {visible.length} {visible.length === 1 ? 'guide' : 'guides'}
        {query ? ` matching “${query}”` : ' to help you move with confidence'}
      </p>
      {visible.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((article) => (
            <Link
              key={article.slug}
              href={`/help/${article.slug}`}
              className="group flex min-h-56 flex-col rounded-2xl border border-border bg-surface/50 p-6 transition hover:border-primary/60 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                {categories.find((item) => item.id === article.category)?.title}
              </p>
              <h2 className="mt-4 font-display text-xl leading-snug font-bold text-foreground">
                {article.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {article.summary}
              </p>
              <span className="mt-auto flex items-center justify-between pt-6 text-xs font-medium text-foreground-muted">
                <span>{article.steps.length} steps</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-8">
          <h2 className="font-display text-xl font-bold text-foreground">
            No guide found for that search
          </h2>
          <p className="mt-2 text-sm text-foreground-muted">
            Try a shorter phrase, such as “bank” or “location”, or browse all guides.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
            className="mt-5 min-h-11 rounded-full border border-primary px-5 text-sm font-semibold text-primary"
          >
            Show all guides
          </button>
        </div>
      )}
    </section>
  );
}
