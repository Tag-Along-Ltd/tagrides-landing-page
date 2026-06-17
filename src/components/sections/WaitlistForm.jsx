'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

export function WaitlistForm({ className }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'done'

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.success(
          data?.alreadySubscribed ? "You're already on the list — see you soon." : 'On the list. Welcome aboard.',
          { theme: 'dark' },
        );
        setEmail('');
        setStatus('done');
        return;
      }

      const data = await res.json().catch(() => ({}));
      toast.error(data?.error || 'Something went wrong. Try again?', { theme: 'dark' });
      setStatus('idle');
    } catch {
      toast.error('Network hiccup. Try again?', { theme: 'dark' });
      setStatus('idle');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'mx-auto flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-center',
        className,
      )}
    >
      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <input
        id="waitlist-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@lagos.example"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'submitting'}
        className="h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-sm text-white placeholder:text-neutral-400 backdrop-blur-md transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Adding…' : 'Join the waitlist'}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
