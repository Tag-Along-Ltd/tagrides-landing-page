'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { ArrowRight, Sparkles } from 'lucide-react';

import { Reveal } from './Reveal';

const TIMES = [
  { value: 'morning-rush', label: 'Morning rush (6–10am)' },
  { value: 'midday',       label: 'Midday (10am–3pm)'    },
  { value: 'evening-rush', label: 'Evening rush (3–8pm)' },
  { value: 'late-night',   label: 'Late night (8pm–6am)' },
  { value: 'variable',     label: 'It varies'            },
];
const DURATIONS = [
  { value: 'under-15', label: 'Under 15 min' },
  { value: '15-30',    label: '15–30 min'    },
  { value: '30-60',    label: '30–60 min'    },
  { value: '60-plus',  label: '1 hour+'      },
];
const MODES = [
  { value: 'along',  label: 'Tag-Along (shared)'    },
  { value: 'direct', label: 'Direct (whole car)'    },
  { value: 'either', label: 'Either / depends'      },
];

const INITIAL = {
  start: '',
  end: '',
  minFare: '',
  maxFare: '',
  timeOfDay: 'morning-rush',
  duration: '15-30',
  mode: 'along',
  notes: '',
};

const baseInput =
  'h-11 w-full rounded-xl border border-border bg-elevated px-4 text-sm text-foreground placeholder:text-foreground-muted/70 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60';

export function TripFareForm() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'done'

  function update(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');

    try {
      const res = await fetch('/api/trip-fare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success('Route saved. The AI just got smarter.', { theme: 'dark' });
        setForm(INITIAL);
        setStatus('done');
        // Allow another submission immediately
        setTimeout(() => setStatus('idle'), 1500);
        return;
      }
      toast.error(data?.error || 'Couldn\'t save that. Try again?', { theme: 'dark' });
      setStatus('idle');
    } catch {
      toast.error('Network hiccup. Try again?', { theme: 'dark' });
      setStatus('idle');
    }
  }

  return (
    <section id="train" className="relative">
      <div className="mx-auto max-w-5xl px-6 py-14 md:py-28">
        <Reveal className="text-center md:max-w-3xl md:mx-auto">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <Sparkles className="size-3" />
            Training Tag Rides
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            Help us price Lagos.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-muted md:text-lg">
            We&rsquo;re teaching the app to suggest fair fares and route patterns for every corner
            of the city. Drop in a trip you actually take — the more we get from real riders, the
            smarter the suggestions for someone who just landed in Lagos.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <form
            onSubmit={handleSubmit}
            className="mx-auto grid max-w-3xl gap-5 rounded-3xl border border-border bg-surface/70 p-6 backdrop-blur-sm md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                  From
                </span>
                <input
                  type="text"
                  required
                  placeholder="Yaba, Lagos"
                  value={form.start}
                  onChange={update('start')}
                  disabled={status === 'submitting'}
                  className={baseInput}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                  To
                </span>
                <input
                  type="text"
                  required
                  placeholder="Victoria Island"
                  value={form.end}
                  onChange={update('end')}
                  disabled={status === 'submitting'}
                  className={baseInput}
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                  Lowest fare you'd pay (₦)
                </span>
                <input
                  type="number"
                  required
                  min={0}
                  max={1000000}
                  placeholder="400"
                  value={form.minFare}
                  onChange={update('minFare')}
                  disabled={status === 'submitting'}
                  className={baseInput + ' font-mono'}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                  Highest fare you'd pay (₦)
                </span>
                <input
                  type="number"
                  required
                  min={0}
                  max={1000000}
                  placeholder="800"
                  value={form.maxFare}
                  onChange={update('maxFare')}
                  disabled={status === 'submitting'}
                  className={baseInput + ' font-mono'}
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                  Typical time of day
                </span>
                <select
                  value={form.timeOfDay}
                  onChange={update('timeOfDay')}
                  disabled={status === 'submitting'}
                  className={baseInput}
                >
                  {TIMES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                  Typical duration
                </span>
                <select
                  value={form.duration}
                  onChange={update('duration')}
                  disabled={status === 'submitting'}
                  className={baseInput}
                >
                  {DURATIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                Preferred ride mode
              </span>
              <select
                value={form.mode}
                onChange={update('mode')}
                disabled={status === 'submitting'}
                className={baseInput}
              >
                {MODES.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-foreground-muted">
                Anything else worth knowing? <span className="text-foreground-disabled">(optional)</span>
              </span>
              <textarea
                rows={3}
                maxLength={500}
                placeholder="Landmarks, common stops, why prices spike on this route…"
                value={form.notes}
                onChange={update('notes')}
                disabled={status === 'submitting'}
                className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted/70 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
              />
            </label>

            <div className="mt-2 flex flex-col items-center justify-between gap-4 border-t border-border pt-5 sm:flex-row">
              <p className="max-w-md text-xs text-foreground-muted">
                Submit as many routes as you can. We keep submissions anonymous.
              </p>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:opacity-60"
              >
                {status === 'submitting' ? 'Saving…' : 'Train the AI'}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
