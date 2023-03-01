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
import { isExpired } from 'react-jwt'
import Cookies from 'js-cookie';

const defaultTitle = `Champion's LeaderBoard`;

const LeaderBoard = ({ id = 0 }) => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filterField, setFilteredField] = useState('');
    const [music, setMusic] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [votes, setVotes] = useState([]);
    const [matchVotes, setMatchVotes] = useState({});
    const [title, setTitle] = useState(defaultTitle);

    useEffect(() => {
        const fetchBoardData = async () => {
            const res = id === 0 ? await fetch('/api/audios') : await fetch('/api/audios/leaderboard/' + id)
            const data = await res.json();

            setItems(data);
        };
        fetchBoardData();
    }, [id]);

    useEffect(() => {
        const getVotes = async () => {
            if (await authService.isAuthenticated()) {
                const token = await authService.getAccessToken();

                console.log(token);

                // log out after jwt expired
                //if (isExpired(token)) {
                    
                //}

                let res;

                try {
                    res = await axios.get('/api/votes/uservotes', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                } catch (ex) {
                    alert(ex);
                }
                
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

    useEffect(() => {
        const getTitle = async () => {
            try {
                const res = await fetch('/api/calendarEvents/EventName/' + id);
                const data = await res.text();

                setTitle('Event: ' + data);
            } catch (ex) {
                setTitle(defaultTitle);
            }
        }

        if (id > 0) {
            getTitle();
        } else {
            setTitle(defaultTitle);
        }
        
    }, [id]);

    useEffect(() => {
        const search = filterField.toLowerCase();
        const filtered = items.filter((item) => item.song.toLocaleLowerCase().includes(search) ||
                                                item.originalArtist.toLocaleLowerCase().includes(search));
        setFilteredItems(filtered);
    }, [items, filterField]);

    const addItem = (item) => {
        setItems([...items, item]);
        setModalVisible(false);
    }

    const deleteItem = (audioId) => {
        setItems(items.filter(x => x.audioId !== audioId));
    }

    const playMusic = (URL) => setMusic(URL);

    const showModal = () => setModalVisible(true);

    const handleFilterChange = (event) => {
        setFilteredField(event.target.value);
    }

    return (
        <div className='leaderBoard'>
            <h2 className='page-header-text'>{title}</h2>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <AudioPlayer src={music} />
                </div>
                <div>
                    <input type='text' name='filter' className='filter-field' value={filterField} onChange={handleFilterChange} />
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
                filteredItems.map((item, index) => {
                    let liked = false;
                    if (matchVotes[item.audioId] && matchVotes[item.audioId] === 1) {
                        liked = true;
                    }

                    return <LeaderBoardItem key={index} item={item} playMusic={playMusic} liked={liked} del={deleteItem} />

                })
            ) : (
                <Spinner />
            )}

            <Modal title='Upload Rendition' show={modalVisible} setShow={setModalVisible}>
                <AudioForm addItem={addItem} leaderboardId={id} />
            </Modal>
        </div>
    );
};

export default LeaderBoard;
