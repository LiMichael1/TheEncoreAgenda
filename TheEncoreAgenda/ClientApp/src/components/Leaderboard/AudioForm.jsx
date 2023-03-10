import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../api-authorization/AuthorizeService';
import axios from 'axios';
import Spinner from '../global/Spinner/Spinner.component';

const defaultState = {
    song: '',
    artist: '',
};

const AudioForm = ({ data = defaultState, file = null, addItem = () => { }, leaderboardId = 0, page='leaderboard' }) => {
    const [audio, setAudio] = useState(defaultState);
    const [sending, setSending] = useState(false);
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

        if (leaderboardId === 0) alert(`Can't post on General Leaderboard`);

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
            setSending(true);
            const res = await axios.post('/api/audios', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = res.data;

            if (res.status === 201) {
                alert('posted');
                if (leaderboardId !== 0) {
                    addItem(data);

                    if (page === 'leaderboard') {
                        console.log(data);
                    } else {
                        navigate('/leaderboard/' + leaderboardId);

                    }
                }
            }
        } catch (ex) {
            console.log(ex);
            alert(ex);
        }
        setSending(false);
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
                    {sending ? <Spinner /> : 'Create' }
                </button>
            </div>

            <div className='mt-3 text-center'>
                {page !== 'create' ?
                    <Link to={`/leaderboard/${leaderboardId}/Create`} className='mt-3 text-create'>Create your own</Link> :
                    <Link to={`/leaderboard/${leaderboardId}`} className='backBtn'>LeaderBoard</Link>
                }
            </div>
        </form>
    );
};

export default AudioForm;
