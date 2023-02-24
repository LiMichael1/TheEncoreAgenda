import './leaderboard.styles.css';
import React, { useState, useEffect } from 'react';
import LeaderBoardItem from './LeaderBoardItem';
import Modal from '../global/Modal/Modal';
import AudioPlayer from './AudioPlayer';
import AudioForm from './AudioForm';
import Spinner from '../global/Spinner/Spinner.component';
import { boardData } from '../../utils/sampleData';
import authService from '../api-authorization/AuthorizeService';
import axios from 'axios';

const LeaderBoard = () => {
    const [items, setItems] = useState([]);
    const [music, setMusic] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        const fetchBoardData = async () => {
            const res = await fetch('/api/audios');
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
                    if (votes.find(x => x.audioId === item.audioId && x.voteType === 1)) {
                        liked = true;
                    }
                    return <LeaderBoardItem key={index} item={item} playMusic={playMusic} liked={liked} />

                })
            ) : (
                <Spinner />
            )}

            <Modal title='Create New' show={modalVisible} setShow={setModalVisible}>
                <AudioForm addItem={addItem} />
            </Modal>
        </div>
    );
};

export default LeaderBoard;
