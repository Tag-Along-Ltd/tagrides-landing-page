"use client";
import Link from "next/link";

const SoftwareVideo = () => {
  return (
    <div className="software-video overflow-hidden">
      <div className="row">
        <div className="col-lg-12">
          <div className="software-video-preview bg-cover">
            <div
              className="video-bg-live"
              style={{ backgroundImage: `url(/assets/img/banner/20.jpg)` }}
            >
              <div className="shadow-overlay"></div>
              <div className="player"></div>
              <Link
                className="popup-youtube video-play-button"
                href="#"
                scroll={false}
              >
                <i className="fas fa-play"></i>
                <div className="effect"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareVideo;
