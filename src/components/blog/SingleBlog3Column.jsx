import { timeSince } from "@/utils/dateFunction";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleBlog3Column = ({ blog }) => {
  const { _id, title, thumbnail, image, createdAt } = blog;

  return (
    <>
      <div className="blog-style-one">
        <div className="thumb">
          <Link href={`${process.env.NEXT_PUBLIC_PUT_LINK}/blog/${_id}`}>
            <Image
              src={thumbnail}
              width={800}
              height={600}
              alt="Thumb"
            />
          </Link>
        </div>
        <div className="info">
          <div className="blog-meta">
            <ul>
              <li>
                <i class="far fa-user-circle"></i>
                <Link href={`${process.env.NEXT_PUBLIC_PUT_LINK}/blog/${_id}`}>
                  {"TagRides"}
                </Link>
              </li>
              <li>{timeSince(createdAt)} ago</li>
            </ul>
          </div>
          <h4>
            <Link href={`${process.env.NEXT_PUBLIC_PUT_LINK}/blog/${_id}`}>
              {title}
            </Link>
          </h4>
          <Link
            href={`${process.env.NEXT_PUBLIC_PUT_LINK}/blog/${_id}`}
            className="btn-simple"
          >
            <i className="fas fa-angle-right"></i>
            {"Read More"}
          </Link>
        </div>
      </div>
    </>
  );
};

export default SingleBlog3Column;
