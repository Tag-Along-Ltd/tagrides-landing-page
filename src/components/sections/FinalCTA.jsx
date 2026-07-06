'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { ArrowRight } from 'lucide-react';

import { Reveal } from './Reveal';
import brand from '@/data/brand.json';
import { landingApiPath } from '@/lib/landingApi';

// Pre-launch CTA — two-bucket conversion split:
//   1. RIDERS: email-collect for waitlist. Activated when the Lagos pilot
//      goes live, by which time we'll have driver supply on the platform.
//   2. DRIVERS: direct link to the web app's phone-OTP sign-up at
//      app.tagrider.com/signin. Drivers can sign up + complete
//      verification today; they'll be ready when launch traffic arrives.
// One app, role-switch after sign-in, but the conversion intent is split
// at this surface.
//
export function FinalCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      const fd = new FormData(event.currentTarget);
      const res = await fetch(landingApiPath('/api/waitlist'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website: fd.get('website') || '' }),
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.success(
          data?.alreadySubscribed
            ? "You're already on the list — see you at launch."
            : "On the list. We'll email when Tag Rides opens the first pilot corridor.",
          { theme: 'dark' },
        );
        setEmail('');
        setStatus('done');
        setTimeout(() => setStatus('idle'), 1500);
        return;
      }
      const data = await res.json().catch(() => ({}));
      toast.error(data?.error || "Couldn't add you right now. Try again?", { theme: 'dark' });
      setStatus('idle');
    } catch {
      toast.error('Network hiccup. Try again?', { theme: 'dark' });
      setStatus('idle');
    }
  }

  return (
    <section id="join" className="relative overflow-hidden bg-primary text-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 0% 100%, rgba(245,158,11,0.25) 0, transparent 45%), radial-gradient(circle at 100% 0%, rgba(255,255,255,0.18) 0, transparent 50%)',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <Reveal>
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Start before the first corridor opens.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Onboard now, complete verification, and be ready when riders start booking along the
            first live routes.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={brand.app.signinDriver}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-primary transition hover:bg-accent hover:text-accent-foreground"
            >
              Start driving
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <p className="mt-12 text-sm font-semibold text-white/85">
            Riding instead? Join the first riders we notify when your corridor opens.
          </p>

          {/* Inline waitlist email — secondary conversion for rider demand */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-4 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center"
          >
            <label htmlFor="final-waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="final-waitlist-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@city.example"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'submitting'}
              className="h-12 flex-1 rounded-full border border-white/25 bg-white/10 px-5 text-sm text-white placeholder:text-white/60 backdrop-blur-md transition focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-60"
            />
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-primary transition hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
            >
              {status === 'submitting' ? 'Adding…' : 'Join the waitlist'}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          <p className="mt-8 text-xs uppercase tracking-[0.18em] text-white/65">
            Partners, press, investors:{' '}
            <Link
              href="mailto:hello@tagrider.com"
              className="text-white underline-offset-4 hover:underline"
            >
              talk to us
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
