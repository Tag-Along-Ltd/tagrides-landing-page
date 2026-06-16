'use client';

import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog';

// Bootstrap-era template sections — re-enable after each is replaced
// with a Tailwind drop-in component.
// import LayoutStyle1 from "@/components/Layouts/LayoutStyle1";
// import AboutStyle1 from "@/components/about/AboutStyle1";
// import BannerStyle1 from "@/components/banner/BannerStyle1";
// import BlogStyle1 from "@/components/blog/BlogStyle1";
// import ChooseStyle1 from "@/components/choose/ChooseStyle1";
// import PartnerStyle1 from "@/components/partner/PartnerStyle1";
// import ProcessStyle1 from "@/components/process/ProcessStyle1";
// import ProjectStyle1 from "@/components/project/ProjectStyle1";
// import RequestCallStyle1 from "@/components/request/RequestCallStyle1";
// import ServicesStyle1 from "@/components/services/ServicesStyle1";
// import TeamStyle1 from "@/components/team/TeamStyle1";
// import TestimonialStyle1 from "@/components/testimonial/TestimonialStyle1";

const Home1 = () => {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-32">
        <div className="mb-12 text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Lagos, meet your next ride.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-neutral-300 md:text-xl">
            Tag Rides is the ride-hailing platform built for how Lagos actually moves —
            faster pickups, fairer fares, drivers who own the road.
          </p>
        </div>

        <HeroVideoDialog
          className="mx-auto block max-w-4xl"
          animationStyle="from-center"
          // TODO: swap for the real TagRides demo video
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I"
          thumbnailSrc="/assets/img/banner/1.jpg"
          thumbnailAlt="Tag Rides demo video"
        />
      </section>
    </main>
  );
};

export default Home1;
