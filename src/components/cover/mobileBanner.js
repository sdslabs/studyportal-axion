import React, { useEffect, useState } from 'react';

const MobileBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 1024) setShowBanner(true);
    else setShowBanner(false);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!showBanner) return null;

  return (
    <div className="mob-banner--main">
      <h1 className="mob-banner--title">Unsupported Screen size!</h1>
      <span className="mob-banner--decor" />
      <p className="mob-banner--subtext">Please switch to a larger screen</p>
    </div>
  );
};

export default MobileBanner;
