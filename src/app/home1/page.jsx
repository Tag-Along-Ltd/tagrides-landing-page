'use client';

import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog';
import { Globe } from '@/components/magicui/globe';
import { RiderDemandChart } from '@/components/sections/RiderDemandChart';

// Bootstrap-era template sections — re-enable after each is replaced
// with a Tailwind drop-in component.
// import LayoutStyle1 from "@/components/Layouts/LayoutStyle1";
// import AboutStyle1 from "@/components/about/AboutStyle1";
// import BannerStyle1 from "@/components/banner/BannerStyle1";
// ... etc.

const Home1 = () => {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-32">
        <div className="relative flex h-[28rem] items-center justify-center md:h-[34rem]">
          <Globe className="opacity-60" />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(10,10,10,0.85)_70%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 text-center">
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              Lagos, meet your next ride.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-neutral-300 md:text-xl">
              Tag Rides is the ride-hailing platform built for how Lagos actually moves —
              faster pickups, fairer fares, drivers who own the road.
            </p>
          </div>
        </div>

        <HeroVideoDialog
          className="mx-auto mt-8 block max-w-4xl"
          animationStyle="from-center"
          // TODO: swap for the real TagRides demo video
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I"
          thumbnailSrc="/assets/img/banner/1.jpg"
          thumbnailAlt="Tag Rides demo video"
        />
      </section>

      <RiderDemandChart />
    </main>
  );
};

export default Home1;
