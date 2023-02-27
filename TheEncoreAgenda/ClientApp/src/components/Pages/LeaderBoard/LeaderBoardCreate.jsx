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
    <div className='d-flex justify-content-between'>
      <div className='col-4'>
        <AudioForm file={file} data={formData} leaderboardId={id} page={'create'} />
      </div>
      <div className='col-7 d-flex flex-column'>
          <Recorder setFile={setFile} />
          <KaraokeVideo setFormData={setFormData} />
        
      </div>
    </div>
  );
};

export default LeaderBoardCreate;
