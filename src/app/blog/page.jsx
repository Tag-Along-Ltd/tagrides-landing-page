"use client";

import LayoutStyle7 from "@/components/Layouts/LayoutStyle7";
import LottieAnimation from "@/components/LottieAnimation";
import circleLoading from "@/lotties/loading-circles.json";
import Blog3ColumnContent from "@/components/blog/Blog3ColumnContent";
import { fetchPosts } from "@/utils/api";
import React, { useEffect, useState } from "react";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
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
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100 mt-5 mb-5">
          <LottieAnimation
            animationData={circleLoading}
            style={{ width: 150, height: 150 }}
          />
        </div>
      ) : (
        <LayoutStyle7 breadCrumb="blogs" title="Blogs">
          <Blog3ColumnContent posts={posts} error={error} />
        </LayoutStyle7>
      )}
    </>
  );
};

export default Blog;
