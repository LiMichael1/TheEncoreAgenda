import React, { useState, useEffect, useRef } from 'react';

const Recorder = () => {
  let [stream, setStream] = useState(null);
  let [recorder, setRecorder] = useState(null);
  const audioRef = useRef();

  useEffect(() => {
    console.log(stream, recorder);
  }, [stream, recorder]);

  const handleCaptureBtnClick = async (event) => {
    const obj = await getStreamAndRecorder();
    setRecorder(obj.rec);
    setStream(obj.stream);
  };

  const handleStartBtnClick = (event) => {
    recorder.start();
  };

  const handleStopBtnClick = (event) => {
    recorder.stop();
    stream.getTracks().forEach((track) => {
      track.stop();
      track.enabled = false;
    });
    stream = null;
  };

  const getStreamAndRecorder = async () => {
    const desktopStream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true,
      video: true,
      audio: true,
    });

    const voiceStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });

    const tracks = [
      ...desktopStream.getVideoTracks(),
      ...mergeAudioStreams(desktopStream, voiceStream),
    ];

    console.log('Tracks to add to stream', tracks);

    const stream = new MediaStream(tracks);

    console.log('Stream', stream);

    const rec = new MediaRecorder(stream, {
      mimeType: 'audio/webm; codecs=opus',
    });

    let blobs = [];

    rec.ondataavailable = (e) => blobs.push(e.data);

    rec.onstop = async () => {
      const blob = new Blob(blobs, { type: 'audio/meg; codecs=opus' });
      const blobURL = window.URL.createObjectURL(blob);

      console.log(blobURL);

      const fileName = blobURL.split('/').slice(-1)[0] + '.mp3';

      const file = new File([blob], fileName);

      console.log(file);

      const fileURL = window.URL.createObjectURL(file);

      // Export Karaoke File
      audioRef.current.src = fileURL;
    };

    return { stream, rec };
  };

  return (
    <div>
      <button
        id='captureBtn'
        className='btn btn-light'
        onClick={handleCaptureBtnClick}
      >
        Capture
      </button>
      <button
        id='startBtn'
        className='btn btn-primary'
        onClick={handleStartBtnClick}
      >
        Start Recording
      </button>
      <button
        id='stopBtn'
        className='btn btn-danger'
        onClick={handleStopBtnClick}
      >
        Stop Recording
      </button>
      <audio controls ref={audioRef}></audio>
      <audio
        controls
        src='https://encorestorage.blob.core.windows.net/audiocontainer/06f86c40-6c24-4151-88f0-0503939c82ec.mp3'
      ></audio>
    </div>
  );
};

export default Recorder;

const mergeAudioStreams = (desktopStream, voiceStream) => {
  const context = new AudioContext();
  const destination = context.createMediaStreamDestination();
  let hasDesktop = false;
  let hasVoice = false;

  if (desktopStream && desktopStream.getAudioTracks().length > 0) {
    const source1 = context.createMediaStreamSource(desktopStream);
    const desktopGain = context.createGain();
    desktopGain.gain.value = 0.7;
    source1.connect(desktopGain).connect(destination);
    hasDesktop = true;
  }

  if (voiceStream && voiceStream.getAudioTracks().length > 0) {
    const source2 = context.createMediaStreamSource(voiceStream);
    const voiceGain = context.createGain();
    voiceGain.gain.value = 0.7;
    source2.connect(voiceGain).connect(destination);
    hasVoice = true;
  }

  return hasDesktop || hasVoice ? destination.stream.getAudioTracks() : [];
};
