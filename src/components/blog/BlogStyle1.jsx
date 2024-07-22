import React from "react";
import SingleBlog1 from "./SingleBlog1";

const BlogStyle1 = ({ posts, loading, error, sectionClass }) => {

  return (
    <>
      <div
        className={`home-blog-area default-padding bottom-less ${
          sectionClass ? sectionClass : ""
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-heading">Latest Blog</h4>
                <h2 className="title">News & Update</h2>
                <div className="devider"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {posts.map((blog) => (
              <SingleBlog1 blog={blog} key={blog._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogStyle1;
