import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import AudioForm from '../../Leaderboard/AudioForm';
import Recorder from './../../Leaderboard/Recorder';
import KaraokeVideo from '../../Leaderboard/KaraokeVideo';

const defaultState = {
    song: '',
    artist: '',
};

const LeaderBoardCreate = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(defaultState);

  return (
      <div className='d-flex align-items-center'>
          <AudioForm file={file} data={formData} leaderboardId={id} />
      <div>
        <Recorder setFile={setFile} />
        <KaraokeVideo setFormData={setFormData} />
      </div>
    </div>
  );
};

export default LeaderBoardCreate;
