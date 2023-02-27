import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../api-authorization/AuthorizeService';
import axios from 'axios';

const defaultState = {
    song: '',
    artist: '',
};

const AudioForm = ({ data = defaultState, file = null, addItem = () => { }, leaderboardId = 0 }) => {
    const [audio, setAudio] = useState(defaultState);
    const fileInputRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        setAudio(data);
    //    console.log('Event: #' + leaderboardId);
    }, [data]);

    useEffect(() => {
        if (file !== null) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.current.files = dataTransfer.files;
        }
    }, [file]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setAudio({ ...audio, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const audioFile = fileInputRef.current.files[0];

        if (audioFile === null) {
            console.log('No Audio File');
            return;
        }

        const token = await authService.getAccessToken();

        const formData = new FormData();

        if (leaderboardId !== 0) formData.append('audio[CalendarEventId]', leaderboardId);
        formData.append('audio[Song]', audio.song);
        formData.append('audio[OriginalArtist]', audio.artist);

        formData.append('upload', audioFile);

        try {
            const res = await axios.post('/api/audios', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = res.data;
            addItem(data);

            if (res.status === 201 && leaderboardId !== 0) navigate('/leaderboard/' + leaderboardId);
        } catch (ex) {
            console.log(ex);
            alert(ex);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor='Song'>Song</label>
                <input
                    type='text'
                    name='song'
                    className='form-control'
                    value={audio.song}
                    onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='artist'>Original Artist</label>
                <input
                    type='text'
                    name='artist'
                    className='form-control'
                    value={audio.artist}
                    onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <input
                    type='file'
                    name='upload'
                    id=''
                    className='form-control'
                    ref={fileInputRef}
                />
            </div>
            <div>
                <button type='submit' className='btn btn-success'>
                    Create
                </button>
            </div>

            <div className='mt-3 text-center'>
                <Link to='/leaderboard/create'>Create Your Own</Link>
            </div>
        </form>
    );
};

export default AudioForm;
