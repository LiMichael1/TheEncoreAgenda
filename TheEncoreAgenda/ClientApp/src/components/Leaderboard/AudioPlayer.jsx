import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ src = '' }) => {
  // play it
  const playerRef = useRef();

  useEffect(() => {
    const playMusic = () => {
      if (src !== '') {
        playerRef.current.load();
        playerRef.current.play();
      }
    };
    playMusic();
  }, [src]);

  return (
    <audio id='player' controls preload='none' ref={playerRef}>
      <source src={src} type='audio/mp3' />
    </audio>
  );
};

export default AudioPlayer;
