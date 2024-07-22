import Image from "next/image";
import Link from "next/link";
import React from "react";
import SocialShare from "../utilities/SocialShare";
import BlogCommentForm from "../form/BlogCommentForm";
import BlogPostComments from "./BlogPostComments";
import team1Thumb from "@/assets/img/teams/1.jpg";
import { timeSince } from "@/utils/dateFunction";
import Markdown from "react-markdown";

const BlogSingleContent = ({ post }) => {
  const { title, content, image, createdAt } = post;

  return (
    <>
      <div className="blog-area single full-blog full-blog default-padding">
        <div className="container">
          <div className="blog-items">
            <div className="row">
              <div className="blog-content wow fadeInUp col-lg-10 offset-lg-1 col-md-12">
                <div className="blog-style-two item">
                  <div className="blog-item-box">
                    <div className="thumb">
                      <Link href="#">
                        <Image
                          src={`/assets/img/blog/post_1_image.jpg`}
                          width={1900}
                          height={995}
                          alt="Thumb"
                        />
                      </Link>
                    </div>
                    <div className="info">
                      <div className="meta">
                        <ul>
                          <li>
                            <Link href="#">
                              <i className="far fa-calendar-alt"></i>{" "}
                              {timeSince(createdAt)} ago
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="far fa-calendar-alt"></i> TagRide
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <Markdown>{content}</Markdown>
                    </div>
                  </div>
                </div>
                <div className="post-author">
                  <div className="thumb">
                    <Image
                      src={"/assets/img/blog/post_1_image.jpg"}
                      alt="Thumb"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="info">
                    <h4>
                      <Link href="#">Olaiya Oniya</Link>
                    </h4>
                    <p>
                      Grursus mal suada faci lisis Lorem ipsum dolarorit more
                      ametion consectetur elit. Vesti at bulum nec at odio aea
                      the dumm ipsumm ipsum that dolocons rsus mal suada and
                      fadolorit to the consectetur elit. All the Lorem Ipsum
                      generators on the Internet tend. Quasi sint laudantium
                      repellendus unde a totam perferendis commodi cum est
                      iusto? Minima, laborum.
                    </p>
                  </div>
                </div>

                <div className="post-tags share">
                  <div className="tags">
                    <h4>Tags: </h4>
                    <Link href="#">Ride</Link>
                    <Link href="#">Pick up</Link>
                  </div>
                  <div className="social">
                    <h4>Share:</h4>
                    <ul>
                      <SocialShare />
                    </ul>
                  </div>
                </div>

                {/* <div className="post-pagi-area">
                  <div className="post-previous">
                    <Link href="#">
                      <div className="icon">
                        <i className="fas fa-angle-double-left"></i>
                      </div>
                      <div className="nav-title">
                        {" "}
                        Previus Post <h5>Discovery incommode</h5>
                      </div>
                    </Link>
                  </div>
                  <div className="post-next">
                    <Link href="#">
                      <div className="nav-title">
                        Next Post <h5>Discovery incommode</h5>
                      </div>
                      <div className="icon">
                        <i className="fas fa-angle-double-right"></i>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="blog-comments">
                  <div className="comments-area">
                    <div className="comments-title">
                      <h3>
                        3 Comments On “Providing Top Quality Cleaning Related
                        Services Charms.”
                      </h3>
                      <BlogPostComments />
                    </div>
                    <div className="comments-form">
                      <div className="title">
                        <h3>Leave a comments</h3>
                      </div>
                      <BlogCommentForm />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSingleContent;
