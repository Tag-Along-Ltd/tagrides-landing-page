"use client"

import LayoutStyle1 from "@/components/Layouts/LayoutStyle1";
import AboutStyle1 from "@/components/about/AboutStyle1";
import BannerStyle1 from "@/components/banner/BannerStyle1";
import BlogStyle1 from "@/components/blog/BlogStyle1";
import ChooseStyle1 from "@/components/choose/ChooseStyle1";
import PartnerStyle1 from "@/components/partner/PartnerStyle1";
import ProcessStyle1 from "@/components/process/ProcessStyle1";
import ProjectStyle1 from "@/components/project/ProjectStyle1";
import RequestCallStyle1 from "@/components/request/RequestCallStyle1";
import ServicesStyle1 from "@/components/services/ServicesStyle1";
import SoftwareVideo from "@/components/software/SoftwareVideo";
import TeamStyle1 from "@/components/team/TeamStyle1";
import TestimonialStyle1 from "@/components/testimonial/TestimonialStyle1";
import { fetchPosts } from "@/utils/api";
import React, { useEffect, useState } from "react";

const Home1 = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  useEffect(() => {
    async function loadPosts() {
      try {
        const fetchedPosts = await fetchPosts();
        // Use slice to get only the first 3 posts
        const firstThreePosts = fetchedPosts.slice(0, 3);
        setPosts(firstThreePosts);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts. Please try again later.");
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <>
      <LayoutStyle1>
        <BannerStyle1 />
        <AboutStyle1 />
        <ServicesStyle1 />
        <ProcessStyle1 />
        <ChooseStyle1 />
        {/* <PartnerStyle1 sectionClass="default-padding" /> */}
        {/* <SoftwareVideo /> */}
        <TeamStyle1 sectionClass="bg-gray" teamTitle={true} />
        <ProjectStyle1 />
        <RequestCallStyle1 />
        <TestimonialStyle1 />
        <BlogStyle1 posts={posts} loading={loading} error={error} sectionClass="bg-gray" />
      </LayoutStyle1>
    </>
  );
};

export default Home1;
