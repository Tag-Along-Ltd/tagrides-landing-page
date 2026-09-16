'use client';

import Link from 'next/link';
import { ArrowRight, Users, Route, ClipboardCheck } from 'lucide-react';
import { PitchSection, SectionHeading } from '../motion/Section';
import { support } from '@/data/support';

export function Support() {
  return (
    <PitchSection id="support" tone="surface">
      <SectionHeading
        eyebrow="HELP BUILD THE FIRST ROUTE"
        title="The app is built. Help put it to work."
        subtitle="A global ambition. A focused Lagos pilot. A practical way to take part."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          {
            icon: Users,
            title: 'Bring the people',
            text: 'Introduce route-aligned drivers or a commuter community around Yaba.',
          },
          {
            icon: Route,
            title: 'Support the work',
            text: 'Help with driver onboarding, field coordination or a defined pilot expense.',
          },
          {
            icon: ClipboardCheck,
            title: 'Build the evidence',
            text: 'Help us learn from completed rides, repeat use and driver net earnings.',
          },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-border bg-background/60 p-6">
            <Icon className="size-6 text-accent" aria-hidden="true" />
            <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{text}</p>
          </div>
        ))}
      </div>
      <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <Link
          href={support.path}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Support the Lagos pilot <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <Link
          href={support.articlePath}
          className="text-sm font-semibold text-primary-soft underline underline-offset-4"
        >
          Read the founder’s story
        </Link>
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-foreground-muted">
        MVP in internal testing. Pilot route, dates and partners are being agreed. Business
        contributions and sponsorship are separate from an investment in the company.
      </p>
    </PitchSection>
  );
}
