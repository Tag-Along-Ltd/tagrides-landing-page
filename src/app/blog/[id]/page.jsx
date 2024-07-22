"use client";

import LayoutStyle7 from "@/components/Layouts/LayoutStyle7";
import BlogSingleContent from "@/components/blog/BlogSingleContent";
import React, { useEffect, useState } from "react";
import { fetchSinglePost } from "@/utils/api";
import LottieAnimation from "@/components/LottieAnimation";
import circleLoading from "@/lotties/loading-circles.json";

const BlogSingle = ({ params }) => {
  const { id } = params;

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPost() {
      try {
        const fetchedPost = await fetchSinglePost(id);
        setPost(fetchedPost);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts. Please try again later.");
        setLoading(false);
      }
    }

    loadPost();
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
        <LayoutStyle7 breadCrumb="Blog" title={post.title}>
          <BlogSingleContent post={post} />
        </LayoutStyle7>
      )}
    </>
  );
};

export default BlogSingle;
