import React from 'react';
import LottiePlayer from 'components/common/lottiePlayer';

const EmptyTable = () => {
  return (
    <div>
      <LottiePlayer
        url="https://assets6.lottiefiles.com/packages/lf20_ijm8ys2h.json"
        style={{ height: '400px', width: '400px' }}
        loop
      />
      <h1 className="error-page-text">Wohooo! All requests reviewed</h1>
    </div>
  );
};

export default EmptyTable;
