'use client';

import { Star, MapPin, Users, Clock } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { cn } from '@/lib/utils';

// Avatar URLs use https://pravatar.cc — free, deterministic by `img` ID,
// no API key required. Swap each `avatar` field for a real driver photo
// once you've got them.
const DRIVERS = [
  { id: 1, name: 'Tunde A.',   from: 'Yaba',     to: 'V.I.',    eta: 12, fare: 600,  rating: 4.8, seats: 2, car: 'Corolla',  avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 2, name: 'Aisha O.',   from: 'Surulere', to: 'Lekki',   eta: 28, fare: 900,  rating: 4.7, seats: 1, car: 'Sonata',   avatar: 'https://i.pravatar.cc/150?img=44' },
  { id: 3, name: 'Chinedu E.', from: 'Ikeja',    to: 'Ajah',    eta: 45, fare: 1200, rating: 4.9, seats: 3, car: 'Pilot',    avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: 4, name: 'Funmi B.',   from: 'Festac',   to: 'CMS',     eta: 22, fare: 550,  rating: 4.6, seats: 2, car: 'Picanto',  avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: 5, name: 'Bola S.',    from: 'Magodo',   to: 'Yaba',    eta: 18, fare: 450,  rating: 4.8, seats: 3, car: 'Camry',    avatar: 'https://i.pravatar.cc/150?img=15' },
  { id: 6, name: 'Kemi A.',    from: 'Ojo',      to: 'Marina',  eta: 38, fare: 800,  rating: 4.7, seats: 2, car: 'Accord',   avatar: 'https://i.pravatar.cc/150?img=23' },
  { id: 7, name: 'Ifeanyi U.', from: 'Gbagada',  to: 'Ikoyi',   eta: 24, fare: 700,  rating: 4.9, seats: 1, car: 'Picanto',  avatar: 'https://i.pravatar.cc/150?img=8'  },
];

function DriverCard({ driver, isActive }) {
  return (
    <div
      className={cn(
        'w-[260px] rounded-3xl border bg-elevated p-6 transition-all duration-500',
        isActive
          ? 'border-primary/50 shadow-[0_30px_90px_-30px_rgba(0,128,128,0.6)]'
          : 'border-border bg-surface/70 opacity-60',
      )}
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={driver.avatar}
            alt={driver.name}
            className="size-14 rounded-full object-cover ring-2 ring-primary/40"
          />
          <div className="absolute -bottom-1 -right-1 flex items-center gap-0.5 rounded-full bg-background px-1.5 py-0.5 text-[10px] font-medium text-foreground ring-1 ring-border">
            <Star className="size-2.5 fill-accent-star text-accent-star" />
            {driver.rating}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-foreground">{driver.name}</p>
          <p className="text-[10px] uppercase tracking-[0.14em] text-foreground-muted">Tag-Along</p>
          <p className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-foreground">
            <MapPin className="size-3.5 text-primary" />
            {driver.from} <span className="text-foreground-muted">→</span> {driver.to}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl border border-border bg-background/50 p-3 text-center">
        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-foreground-muted">ETA</p>
          <p className="mt-1 font-mono text-sm font-medium text-foreground">{driver.eta}m</p>
        </div>
        <div className="border-x border-border">
          <p className="text-[10px] uppercase tracking-[0.12em] text-foreground-muted">Seats</p>
          <p className="mt-1 font-mono text-sm font-medium text-foreground">{driver.seats}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-foreground-muted">Fare</p>
          <p className="mt-1 font-mono text-sm font-semibold text-primary">
            ₦{driver.fare.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-foreground-muted">
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5" />
          Pickup in {driver.eta} min
        </span>
        <span className="inline-flex items-center gap-1">
          <Users className="size-3.5" />
          {driver.seats} · {driver.car}
        </span>
      </div>
    </div>
  );
}

export function DriverDiscoveryCarousel({ className }) {
  return (
    <div className={cn('relative w-full', className)}>
      {/* Ambient teal glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-[380px] max-w-[560px] rounded-full bg-primary/10 blur-3xl" />

      <Swiper
        modules={[EffectCoverflow, Autoplay, Pagination]}
        effect="coverflow"
        centeredSlides
        slidesPerView="auto"
        loop
        grabCursor
        speed={650}
        autoplay={{ delay: 3200, disableOnInteraction: false }}
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
        {DRIVERS.map((driver, i) => (
          <SwiperSlide key={driver.id} className="!relative !w-[260px]">
            {({ isActive }) => <DriverCard driver={driver} isActive={isActive} />}
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="mt-6 text-center text-xs uppercase tracking-[0.18em] text-foreground-muted">
        Live preview · illustrative drivers
      </p>
    </div>
  );
}
