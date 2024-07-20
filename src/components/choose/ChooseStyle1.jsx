"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import shape17 from "@/assets/img/shape/17.png";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const ChooseStyle1 = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="choose-us-style-one-area default-padding text-light">
        <div
          className="cover-bg"
          style={{ backgroundImage: `url(/assets/img/banner/7.jpg)` }}
        ></div>
        <div className="shape-left-top">
          <Image src={shape17} alt="Shape" />
        </div>
        <div className="text-invisible">Tag-Rides</div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pr-80 pr-md-15 pr-xs-15">
              <div className="choose-us-style-one">
                <h2 className="title mb-35">
                  Be at the forefront of the new innovation
                </h2>

                {/* Countdown timer */}
                {isClient && (
                  <FlipClockCountdown
                    to={new Date("2024-11-30T12:00:00").getTime()}
                  />
                )}

                <ul className="list-item">
                  <li className="wow fadeInUp">
                    <h4>Join Tag-Rides to Revolutionize Urban Mobility </h4>
                    <p>
                      Take control with Tag-Along. Decide your wait times,
                      pickup and drop-off locations, drivers, and even the
                      prices you pay. With Tag-Along, enjoy a smooth, efficient,
                      and affordable ride-sharing experience designed for you.
                    </p>
                  </li>
                  <li className="wow fadeInUp" data-wow-delay="300ms">
                    <h4>We Listen</h4>
                    <p>
                      At Tag-Along, we value your feedback and ideas. Our
                      mission is to create a ride-sharing experience tailored to
                      your needs. By listening to our community, we ensure our
                      service is always improving and evolving.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseStyle1;
