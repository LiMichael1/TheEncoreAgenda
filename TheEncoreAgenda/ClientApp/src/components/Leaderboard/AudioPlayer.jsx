import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ src = '' }) => {
  // play it
  const playerRef = useRef();

  useEffect(() => {
    const playMusic = () => {
      if (src !== null) {
        playerRef.current.load();
        playerRef.current.play();
      }
    };
    playMusic();
  }, [src]);

  // const toggleAudio = () => {
  //   if (play) {
  //     setPlay(false);
  //     playerRef.current.pause();
  //   } else {
  //     if (src !== null) {
  //       setPlay(true);
  //       playerRef.current.play();
  //     }
  //   }
  // };

  return (
    <audio id='player' controls preload='none' ref={playerRef}>
      <source src={src} type='audio/mp3' />
    </audio>
  );
};

export default AudioPlayer;
