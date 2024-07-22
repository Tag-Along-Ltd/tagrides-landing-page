import { timeSince } from "@/utils/dateFunction";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleBlog1 = ({ blog }) => {
  const { _id, title, image, createdAt } = blog;

  return (
    <>
      <div
        className="col-xl-4 col-md-6 mb-30 wow fadeInUp"
        data-wow-delay={["300ms"]}
      >
        <div className="blog-style-one">
          <div className="thumb">
            <Link href={`${process.env.NEXT_PUBLIC_PUT_LINK}/blog/${_id}`}>
              <Image
                src={image}
                alt="Thumb"
                width={800}
                height={600}
              />
            </Link>
          </div>
          <div className="info">
            <div className="blog-meta">
              <ul>
                <li>
                  <span>By </span>
                  <Link href={`${process.env.NEXT_PUBLIC_PUT_LINK}/blog/${_id}`} scroll={false}>
                    TagRide
                  </Link>
                </li>
                <li>{timeSince(createdAt)} ago</li>
              </ul>
            </div>
            <h4>
              <Link href={`${process.env.NEXT_PUBLIC_PUT_LINK}/blog/${_id}`}>{title}</Link>
            </h4>
            <Link
              href={`${process.env.NEXT_PUBLIC_PUT_LINK}/blog/${_id}`}
              className="btn-simple"
            >
              <i className="fas fa-angle-right"></i>
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog1;
