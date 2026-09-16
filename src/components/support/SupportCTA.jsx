import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { support } from '@/data/support';

export function SupportCTA() {
  return (
    <section
      aria-labelledby="support-cta-heading"
      className="relative border-y border-border bg-surface/40"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1.4fr_1fr] md:items-center md:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Build the first route with us
          </p>
          <h2
            id="support-cta-heading"
            className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl"
          >
            The app is built. Help put the first route to work.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-foreground-muted">
            We’re preparing a focused Lagos pilot around Yaba. Support the practical work, bring
            route-aligned drivers, or connect us with a commuter community.
          </p>
        </div>
        <div className="flex flex-col items-start gap-5 md:items-end">
          <Link
            href={support.path}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            Support the Lagos pilot <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href={support.articlePath}
            className="text-sm font-semibold text-foreground underline decoration-primary underline-offset-4 hover:text-primary-soft"
          >
            Read the story behind TagRides
          </Link>
          <Link
            href="/support#founder-film"
            className="text-sm font-semibold text-primary-soft underline underline-offset-4"
          >
            Watch the founder’s 2½-minute pitch
          </Link>
        </div>
      </div>
    </section>
  );
}
