import React, { useState, useEffect, useRef } from 'react';

const Recorder = ({ setFile }) => {
  let [stream, setStream] = useState(null);
  let [recorder, setRecorder] = useState(null);
  const audioRef = useRef();

  const [btnStates, setBtnStates] = useState({
    capture: false,
    start: true,
    stop: true,
  });

  useEffect(() => {
    if (stream !== null || recorder !== null) {
      console.log(stream, recorder);
    }
  }, [stream, recorder]);

  const handleCaptureBtnClick = async (event) => {
    const obj = await getStreamAndRecorder();
    setRecorder(obj.rec);
    setStream(obj.stream);

    setBtnStates({ ...btnStates, capture: true, start: false });
  };

  const handleStartBtnClick = (event) => {
    console.log('good morning');
    recorder.start();
    setBtnStates({ ...btnStates, start: true, stop: false });
  };

  const handleStopBtnClick = (event) => {
      recorder.stop();
      try {
          stream.getTracks().forEach((track) => {
              track.stop();
              track.enabled = false;
          });
      } catch (ex) {
          console.log(ex);
      }
    
    stream = null;
    setBtnStates({ ...btnStates, stop: true, capture: false });
  };

  const getStreamAndRecorder = async () => {
    const desktopStream = await navigator.mediaDevices.getDisplayMedia(
      {
        preferCurrentTab: true,
        video: true,
        audio: true,
      },
      {
        videoBitsPerSecond: 0,
        mimeType: 'audio/webm',
      }
    );

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

    const audioStream = new MediaStream();
    for (const track of stream.getAudioTracks()) {
      audioStream.addTrack(track);
      }

      for (const track of stream.getVideoTracks()) {
          track.stop();
      }


    const rec = new MediaRecorder(audioStream, {
      mimeType: 'audio/webm; codecs=opus',
    });

    let blobs = [];

    rec.ondataavailable = (e) => blobs.push(e.data);

    rec.onstop = async () => {
      const blob = new Blob(blobs, { type: 'audio/mpeg; codecs=opus' });
      const blobURL = window.URL.createObjectURL(blob);

      console.log(blobURL);

      const fileName = blobURL.split('/').slice(-1)[0] + '.mp3';

      const file = new File([blob], fileName);

      console.log(file);

      let fileURL = window.URL.createObjectURL(file);

      // Export Karaoke File
      audioRef.current.src = fileURL;

      setFile(file);
    };

    return { audioStream, rec };
  };

  return (
    <div>
      <button
        id='captureBtn'
        className='btn btn-light'
        onClick={handleCaptureBtnClick}
        // ref={captureBtnRef}
        disabled={btnStates.capture}
      >
        Capture
      </button>
      <button
        id='startBtn'
        className='btn btn-primary'
        onClick={handleStartBtnClick}
        // ref={startBtnRef}
        disabled={btnStates.start}
      >
        Start Recording
      </button>
      <button
        id='stopBtn'
        className='btn btn-danger'
        onClick={handleStopBtnClick}
        // ref={stopBtnRef}
        disabled={btnStates.stop}
      >
        Stop Recording
      </button>
      <audio controls ref={audioRef}></audio>
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
    voiceGain.gain.value = 0.9;
    source2.connect(voiceGain).connect(destination);
    hasVoice = true;
  }

  return hasDesktop || hasVoice ? destination.stream.getAudioTracks() : [];
};
