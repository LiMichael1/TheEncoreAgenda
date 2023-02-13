import React, { useState, useEffect, useRef } from 'react';

const AudioPlayer = ({ src = '' }) => {
  // play it
  const [source, setSource] = useState(src);
  const playerRef = useRef();

  useEffect(() => {
    if (src != '') {
      playerRef.load();
      playerRef.play();
    }
  }, [source]);

  return (
    <audio id='player' controls preload='none' ref={playerRef}>
      <source src={source} type='audio/mp3' />
    </audio>
  );
};

export default AudioPlayer;
