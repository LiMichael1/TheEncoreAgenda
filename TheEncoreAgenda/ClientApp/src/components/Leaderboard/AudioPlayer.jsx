import React, { useState, useEffect, useRef } from 'react';

const AudioPlayer = ({ src = '' }) => {
    // play it
    const [play, setPlay] = useState(false);
    const playerRef = useRef();

    useEffect(() => {
        const playMusic = () => {
            if (src !== null) {
                setPlay(true);
                playerRef.current.pause();
                playerRef.current.load();
                playerRef.current.play();
            }
        };
        playMusic();
    }, [src]);

    const toggleAudio = () => {
        if (play) {
            setPlay(false);
            playerRef.current.pause();
        } else {
            if (src !== null) {
                setPlay(true);
                playerRef.current.play();
            }
        }
    };

    return (
        <>
            <button type='button' className={`audioBtn ${play ? 'highlight' : ''} `}  onClick={() => toggleAudio()}>
                {play ?
                    <i className="bi bi-pause-circle"></i> :
                    <i className="bi bi-play-circle"></i>
                }
            </button>

            <audio id='player' controls preload='none' ref={playerRef} style={{ display: 'none' }}>
                <source src={src} type='audio/mp3' />
            </audio>
        </>

    );
};

export default AudioPlayer;
