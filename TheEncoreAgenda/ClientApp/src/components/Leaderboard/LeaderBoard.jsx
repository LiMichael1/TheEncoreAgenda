import './leaderboard.styles.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeaderBoardItem from './LeaderBoardItem';
import Modal from '../global/Modal/Modal';
import AudioPlayer from './AudioPlayer';
import AudioForm from './AudioForm';
import Spinner from '../global/Spinner/Spinner.component';
import { boardData } from '../../utils/sampleData';
import authService from '../api-authorization/AuthorizeService';
import axios from 'axios';

const LeaderBoard = ({ id = 0 }) => {
    const [items, setItems] = useState([]);
    const [music, setMusic] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [votes, setVotes] = useState([]);
    const [matchVotes, setMatchVotes] = useState({});

    useEffect(() => {
        const fetchBoardData = async () => {
            const res = id === 0 ? await fetch('/api/audios') : await fetch('/api/audios/leaderboard/' + id)
            const data = await res.json();

            setItems(data);
        };
        fetchBoardData();
    }, []);

    useEffect(() => {
        const getVotes = async () => {
            if (await authService.isAuthenticated()) {
                const token = await authService.getAccessToken();

                const res = await axios.get('/api/votes/uservotes', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = res.data;

                setVotes(data);

                const match = {};

                for (let i = 0; i < data.length; i++) {
                    match[data[i].audioId] = data[i].voteType;
                }
                setMatchVotes(match);
            }
        }
        getVotes();
    }, []);

    const addItem = (item) => {
        setItems({ ...items, item });
        setModalVisible(false);
    }

    const playMusic = (URL) => setMusic(URL);

    const showModal = () => setModalVisible(true);

    return (
        <div className='leaderBoard'>
            <h2 className='page-header-text'>Champion's LeaderBoard</h2>
            <div className='d-flex justify-content-between'>
                <div>
                    <AudioPlayer src={music} />
                </div>
                <div>
                    <button
                        type='button'
                        onClick={() => {
                            showModal();
                        }}
                        className='glow-button'
                    >
                        Create New
                    </button>
                </div>
            </div>

            {items.length > 0 ? (
                items.map((item, index) => {
                    let liked = false;
                    if (matchVotes[item.audioId] && matchVotes[item.audioId] === 1) {
                        liked = true;
                    }

                    return <LeaderBoardItem key={index} item={item} playMusic={playMusic} liked={liked} />

                })
            ) : (
                <Spinner />
            )}

            <Modal title='Create New' show={modalVisible} setShow={setModalVisible}>
                <AudioForm addItem={addItem} leaderboardId={id} />
            </Modal>
        </div>
    );
};

export default LeaderBoard;
