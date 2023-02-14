import React, { useState, useRef } from 'react';

const Recorder = () => {
  let rec, stream;

  const captureBtn = useRef(),
    startBtn = useRef(),
    stopBtn = useRef();

  const mergeAudioStreams = (desktopStream, voiceStream) => {
    const context = new AudioContext();
    const destination = context.createMediaStreamDestination();

    const desktopSource = context.createMediaStreamSource(desktopStream);
    const voiceSource = context.createMediaStreamSource(voiceStream);

    const desktopGain = context.createGain();
    const voiceGain = context.createGain();

    desktopGain.gain.value = 0.7;
    voiceGain.gain.value = 0.7;

    desktopSource.connect(desktopGain).connect(destination);
    voiceSource.connect(voiceGain).connect(destination);

    return destination.stream.getAudioTracks();
  };

  const handleCaptureBtnClick = async () => {
    console.log('Clicked Capture Button');
    const desktopStream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true,
      video: true,
      audio: true,
    });

    const voiceStream = await navigator.mediaDevices.getuserMedia({
      video: false,
      audio: true,
    });

    const tracks = [
      ...desktopStream.getVideoTracks(),
      ...mergeAudioStreams(desktopStream, voiceStream),
    ];

    stream = new MediaStream(tracks);

    let blobs = [];

    rec = new MediaRecorder(stream, {
      mimeType: 'audio/webm; codecs=opus',
    });

    rec.ondataavailable = (e) => blobs.push(e.data);
    rec.onstop = async () => {
      const blob = new Blob(blobs, { type: 'audio/mpeg; codecs=opus' });
      let url = window.URL.createObjectURL(blob);

      const fileName = url.split('/').slice(-1)[0] + '.mp3';
      const blobFile = new File([blob], fileName);

      url = window.URL.createObjectURL(blobFile);

      // Insert into audio player
      // Insert into Input File
    };
  };

  const handleStartBtnClick = () => {
    console.log('Clicked Start Button');
  };

  const handleStopBtnClick = () => {
    console.log('Clicked Stop Button');
  };

  return (
    <>
      <div className='record-btns'>
        <button
          id='captureBtn'
          className='btn btn-light'
          onClick={handleCaptureBtnClick}
          ref={captureBtn}
        >
          Capture
        </button>
        <button
          id='startBtn'
          className='btn btn-danger'
          onClick={handleStartBtnClick}
          ref={startBtn}
          disabled
        >
          Start Recording
        </button>
        <button
          id='stopBtn'
          className='btn btn-success'
          onClick={handleStopBtnClick}
          ref={stopBtn}
          disabled
        >
          Stop Capture
        </button>
      </div>
    </>
  );
};

export default Recorder;
