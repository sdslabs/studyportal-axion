import React from 'react';
import LottiePlayer from 'components/common/lottiePlayer';

const NoOptionsSelected = () => {
  return (
    <div>
      <LottiePlayer
        url="https://assets7.lottiefiles.com/datafiles/gezxqOUv6hx5KEK/data.json"
        style={{ height: '250px', width: '250px', margin: '3rem auto' }}
      />
      <h1 className="error-page-text">Select an option to proceed</h1>
    </div>
  );
};

export default NoOptionsSelected;
