import React from 'react';
import Lottie from 'lottie-react';

const LottieAnimation = ({
  animationData,
  loop = true,
  autoplay = true,
  style = { width: 300, height: 300 }
}) => (
  <Lottie
    animationData={animationData}
    loop={loop}
    autoplay={autoplay}
    style={style}
  />
);

export default LottieAnimation;
