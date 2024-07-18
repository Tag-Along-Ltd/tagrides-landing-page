import Image from 'next/image';
import React from 'react';
import shape17 from '@/assets/img/shape/17.png'

const ChooseStyle1 = () => {
    return (
        <>
            <div className="choose-us-style-one-area default-padding text-light">
                <div className="cover-bg" style={{ backgroundImage: `url(/assets/img/banner/7.jpg)` }}></div>
                <div className="shape-left-top">
                    <Image src={shape17} alt="Shape" />
                </div>
                <div className="text-invisible">Tag-Rides</div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 pr-80 pr-md-15 pr-xs-15">
                            <div className="choose-us-style-one">
                                <h2 className="title mb-35">Be at the forefront of the new innovation</h2>
                                <ul className="list-item">
                                    <li className="wow fadeInUp">
                                        <h4>Join Tag-Rides to Revolutionize Urban Mobility </h4>
                                        <p>
                                            Soon, you'll enjoy seamless, efficient, and affordable rides designed for your convenience. Join us on our journey to redefine ride-sharing and be among the first to benefit from this innovative solution.
                                        </p>
                                    </li>
                                    <li className="wow fadeInUp" data-wow-delay="300ms">
                                        <h4>We Listen</h4>
                                        <p>
                                            At Tag-Along, we value your feedback and ideas. Our mission is to create a ride-sharing experience tailored to your needs. By listening to our community, we ensure our service is always improving and evolving.
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