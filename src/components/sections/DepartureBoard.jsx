'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Users, Clock } from 'lucide-react';

import { cn } from '@/lib/utils';

const DRIVERS = [
  { name: 'Tunde A.',   from: 'Yaba',     to: 'V.I.',     eta: 12, fare: 600,  rating: 4.8, seats: 2, car: 'Corolla', avatar: 'https://i.pravatar.cc/100?img=12' },
  { name: 'Aisha O.',   from: 'Surulere', to: 'Lekki',    eta: 28, fare: 900,  rating: 4.7, seats: 1, car: 'Sonata',  avatar: 'https://i.pravatar.cc/100?img=44' },
  { name: 'Chinedu E.', from: 'Ikeja',    to: 'Ajah',     eta: 45, fare: 1200, rating: 4.9, seats: 3, car: 'Pilot',   avatar: 'https://i.pravatar.cc/100?img=33' },
  { name: 'Funmi B.',   from: 'Festac',   to: 'CMS',      eta: 22, fare: 550,  rating: 4.6, seats: 2, car: 'Picanto', avatar: 'https://i.pravatar.cc/100?img=47' },
  { name: 'Bola S.',    from: 'Magodo',   to: 'Yaba',     eta: 18, fare: 450,  rating: 4.8, seats: 3, car: 'Camry',   avatar: 'https://i.pravatar.cc/100?img=15' },
  { name: 'Kemi A.',    from: 'Ojo',      to: 'Marina',   eta: 38, fare: 800,  rating: 4.7, seats: 2, car: 'Accord',  avatar: 'https://i.pravatar.cc/100?img=23' },
  { name: 'Ifeanyi U.', from: 'Gbagada',  to: 'Ikoyi',    eta: 24, fare: 700,  rating: 4.9, seats: 1, car: 'Picanto', avatar: 'https://i.pravatar.cc/100?img=8'  },
  { name: 'Sade O.',    from: 'Apapa',    to: 'Maryland', eta: 32, fare: 850,  rating: 4.6, seats: 2, car: 'Avensis', avatar: 'https://i.pravatar.cc/100?img=49' },
];

const VISIBLE = 4;
const INTERVAL_MS = 2200;

export function DepartureBoard({ className }) {
  const [head, setHead] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHead((h) => (h + 1) % DRIVERS.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const cards = Array.from({ length: VISIBLE }, (_, i) => DRIVERS[(head + i) % DRIVERS.length]);

  return (
    <div
      className={cn(
        'relative isolate rounded-3xl bg-white p-3 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)] ring-1 ring-slate-200',
        className,
      )}
    >
      {/* board header */}
      <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-3 ring-1 ring-slate-100">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            Departing now · Lagos
          </p>
        </div>
        <p className="font-mono text-xs text-slate-500">Live</p>
      </div>

      {/* cards */}
      <div className="relative mt-3 h-[420px] overflow-hidden rounded-2xl">
        {/* soft fade masks */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-t from-white to-transparent" />

        <AnimatePresence initial={false}>
          <div className="flex h-full flex-col justify-start gap-3 p-2">
            {cards.map((driver, idx) => (
              <motion.div
                key={`${driver.name}-${head}-${idx}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.04 }}
                className="rounded-xl bg-white p-4 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-primary/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={driver.avatar}
                      alt={driver.name}
                      className="size-9 shrink-0 rounded-full object-cover ring-1 ring-border"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">{driver.name}</p>
                      <p className="text-sm font-medium text-slate-700">
                        {driver.from} <span className="text-slate-400">→</span> {driver.to}
                      </p>
                    </div>
                  </div>
                  <p className="font-mono text-base font-semibold text-primary">
                    ₦{driver.fare.toLocaleString()}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {driver.eta} min
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="size-3.5" />
                      {driver.seats} left
                    </span>
                    <span className="truncate">{driver.car}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-slate-700">
                    <Star className="size-3.5 fill-accent text-accent" />
                    <span className="font-medium">{driver.rating}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      {/* footer */}
      <div className="mt-2 flex items-center justify-between px-2 py-2 text-xs text-slate-400">
        <span>8 drivers along your route</span>
        <span className="font-mono">↑ scrub · auto-refresh 2s</span>
      </div>
    </div>
  );
}
