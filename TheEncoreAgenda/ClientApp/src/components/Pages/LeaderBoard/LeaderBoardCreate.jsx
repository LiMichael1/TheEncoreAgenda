import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import AudioForm from '../../Leaderboard/AudioForm';
import Recorder from './../../Leaderboard/Recorder';
import KaraokeVideo from '../../Leaderboard/KaraokeVideo';

const defaultState = {
    song: '',
    artist: '',
};

const LeaderBoardCreate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState(defaultState);

    useEffect(() => {
        if (!id || id < 1) {
            navigate('/Calendar');
        }
    }, [id]);


    return (
        <div className='d-flex justify-content-between res-flex-column'>
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
