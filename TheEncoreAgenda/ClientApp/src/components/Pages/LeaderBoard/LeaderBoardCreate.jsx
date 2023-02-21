import React, { useState, useEffect } from 'react';
import AudioForm from '../../Leaderboard/AudioForm';
import Recorder from './../../Leaderboard/Recorder';
import KaraokeVideo from '../../Leaderboard/KaraokeVideo';

const LeaderBoardCreate = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});

  return (
    <div className='d-flex align-items-center'>
      <AudioForm file={file} data={formData} />
      <div>
        <Recorder setFile={setFile} />
        <KaraokeVideo setFormData={setFormData} />
      </div>
    </div>
  );
};

export default LeaderBoardCreate;
