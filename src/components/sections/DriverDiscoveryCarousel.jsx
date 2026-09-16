'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Pause, Play, MapPin, Users, Clock } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { cn } from '@/lib/utils';

const DEMO_REQUESTS = [
  { id: 1, name: 'Tunde A.', from: 'Yaba', to: 'Marina', eta: 12, fare: 600, seats: 2 },
  { id: 2, name: 'Aisha O.', from: 'Onike', to: 'Marina', eta: 18, fare: 650, seats: 1 },
  { id: 3, name: 'David O.', from: 'Sabo', to: 'V.I.', eta: 16, fare: 700, seats: 3 },
  { id: 4, name: 'Funmi B.', from: 'Adekunle', to: 'CMS', eta: 14, fare: 550, seats: 2 },
  { id: 5, name: 'Ada E.', from: 'UNILAG', to: 'Marina', eta: 20, fare: 700, seats: 3 },
];

function DriverCard({ driver, isActive }) {
  return (
    <div
      className={cn(
        'w-[260px] rounded-3xl border bg-elevated p-6 transition-all duration-500',
        isActive ? 'border-primary/60' : 'border-border bg-surface/70 opacity-60',
      )}
    >
      <div className="flex items-start gap-4">
        <Image
          src={`/assets/commuters/commuter-0${driver.id}.webp`}
          alt=""
          width={56}
          height={56}
          unoptimized
          className="size-14 shrink-0 rounded-full object-cover ring-2 ring-primary/40"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-foreground">{driver.name}</p>
          <p className="text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
            Example request
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-foreground">
            <MapPin className="size-3.5 text-primary" />
            {driver.from} <span className="text-foreground-muted">→</span> {driver.to}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl border border-border bg-background/50 p-3 text-center">
        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-foreground-muted">Pickup</p>
          <p className="mt-1 font-mono text-sm font-medium text-foreground">{driver.eta}m</p>
        </div>
        <div className="border-x border-border">
          <p className="text-[10px] uppercase tracking-[0.12em] text-foreground-muted">Seats</p>
          <p className="mt-1 font-mono text-sm font-medium text-foreground">{driver.seats}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-foreground-muted">Offer</p>
          <p className="mt-1 font-mono text-sm font-semibold text-primary">
            ₦{driver.fare.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-foreground-muted">
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5" />
          Along your route
        </span>
        <span className="inline-flex items-center gap-1">
          <Users className="size-3.5" />
          {driver.seats} seat{driver.seats > 1 ? 's' : ''} open
        </span>
      </div>
    </div>
  );
}

export function DriverDiscoveryCarousel({ className }) {
  const reduceMotion = useReducedMotion();
  const [swiper, setSwiper] = useState(null);
  const [paused, setPaused] = useState(false);

  function toggleAutoplay() {
    if (!swiper || reduceMotion) return;
    if (paused) swiper.autoplay.start();
    else swiper.autoplay.stop();
    setPaused(!paused);
  }

  return (
    <div className={cn('driver-carousel relative isolate w-full', className)}>
      {/* Keep the light OUTSIDE Swiper's clipping viewport. A radial fade,
          rather than a card shadow, avoids a rectangular cutoff at its edges. */}
      <div className="driver-carousel-aura pointer-events-none absolute -z-10" aria-hidden="true" />

      <Swiper
        modules={[A11y, EffectCoverflow, Autoplay, Pagination]}
        effect="coverflow"
        centeredSlides
        slidesPerView="auto"
        loop
        grabCursor
        speed={650}
        autoplay={reduceMotion ? false : { delay: 3200, disableOnInteraction: false }}
        onSwiper={setSwiper}
        a11y={{
          containerMessage: 'Illustrative rider requests',
          slideLabelMessage: 'Example {{index}} of {{slidesLength}}',
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: -30,
          depth: 220,
          modifier: 1.4,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (_, cls) => `<span class="${cls} !bg-primary"></span>`,
        }}
        className="overflow-hidden !px-2 [&_.swiper-pagination]:!relative [&_.swiper-pagination]:!mt-8"
      >
        {DEMO_REQUESTS.map((driver) => (
          <SwiperSlide key={driver.id} className="!relative !w-[260px]">
            {({ isActive }) => <DriverCard driver={driver} isActive={isActive} />}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-center text-[10px] uppercase tracking-[0.14em] text-foreground-muted">
        <span>Driver view · fictional requests · stock portraits</span>
        <button
          type="button"
          onClick={toggleAutoplay}
          className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-1 text-foreground-muted transition hover:text-foreground motion-reduce:hidden"
          aria-label={paused ? 'Play demo requests' : 'Pause demo requests'}
        >
          {paused ? (
            <Play aria-hidden="true" className="size-3" />
          ) : (
            <Pause aria-hidden="true" className="size-3" />
          )}
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>
    </div>
  );
}
