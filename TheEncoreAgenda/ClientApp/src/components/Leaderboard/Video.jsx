import React, { useEffect, useRef } from 'react';

const Video = ({ url }) => {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current?.load();
  }, [url]);

  return (
    <video width='640' height='360' controls ref={videoRef}>
      <source src={url} />
    </video>
  );
};

export default Video;
