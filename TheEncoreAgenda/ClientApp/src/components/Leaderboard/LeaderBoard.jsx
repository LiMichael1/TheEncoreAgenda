import './leaderboard.styles.css';
import React, { useState, useEffect } from 'react';
import LeaderBoardItem from './LeaderBoardItem';
import Modal from '../global/Modal/Modal';
import AudioPlayer from './AudioPlayer';
import AudioForm from './AudioForm';
import Spinner from '../global/Spinner/Spinner.component';
import { boardData } from '../../utils/sampleData';

const LeaderBoard = () => {
  const [items, setItems] = useState(boardData);
  const [music, setMusic] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {}, []);

  const playMusic = (URL) => setMusic(URL);

  const showModal = () => setModalVisible(true);

  return (
    <div className='leaderBoard'>
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
            className=''
          >
            Create New
          </button>
        </div>
      </div>

      {items.length > 0 ? (
        items.map((item, index) => (
          <LeaderBoardItem key={index} item={item} playMusic={playMusic} />
        ))
      ) : (
        <Spinner />
      )}

      <Modal title='Create New' show={modalVisible} setShow={setModalVisible}>
        <AudioForm />
      </Modal>
    </div>
  );
};

export default LeaderBoard;
