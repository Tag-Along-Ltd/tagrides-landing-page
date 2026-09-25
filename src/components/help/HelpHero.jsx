import Link from 'next/link';
import { ArrowRight, Compass, CarFront, WalletCards } from 'lucide-react';

const STARTS = [
  {
    title: 'Take your first ride',
    text: 'From destination to drop-off.',
    href: '/help/riders/request-a-ride',
    Icon: Compass,
  },
  {
    title: 'Complete driver registration',
    text: 'All five sections, explained.',
    href: '/help/drivers/get-verified',
    Icon: CarFront,
  },
  {
    title: 'Understand your payments',
    text: 'Holds, charges and earnings.',
    href: '/help/money/payment-records',
    Icon: WalletCards,
  },
];

export function HelpHero({ category }) {
  return (
    <header className="mx-auto max-w-6xl px-5 pt-12 pb-10 sm:px-8 md:pt-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
        TagRides help centre
      </p>
      <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground sm:text-6xl">
        {category ? (
          category.title
        ) : (
          <>
            A clearer way
            <br />
            to get moving.
          </>
        )}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
        {category
          ? category.description
          : 'Practical walkthroughs for every part of your journey. Know what you’re looking at, what to do next, and how to tell it worked.'}
      </p>
      {!category && (
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {STARTS.map(({ title, text, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl border border-primary/25 bg-primary/5 p-5 transition hover:border-primary/70 hover:bg-primary/10"
            >
              <Icon aria-hidden="true" className="size-6 text-primary" />
              <h2 className="mt-5 flex items-center justify-between gap-3 font-display text-base font-bold text-foreground">
                {title}
                <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-primary" />
              </h2>
              <p className="mt-2 text-sm text-foreground-muted">{text}</p>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
