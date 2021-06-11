import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

const LottiePlayer = ({ url, style = {}, loop = false }) => {
  return <Lottie options={{ loop: loop, autoplay: true, path: url }} style={{ ...style }} />;
};

export default memo(LottiePlayer);

LottiePlayer.propTypes = {
  /* custom styles */
  style: PropTypes.object,
  /* URL to fetch Lottie JSON */
  url: PropTypes.string,
  loop: PropTypes.bool,
};
