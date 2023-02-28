import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import authService from '../api-authorization/AuthorizeService';

const LeaderBoardItem = ({ item, playMusic, liked = false }) => {
    const [likes, setLikes] = useState(item.numberOfLikes);
    const [like, setLike] = useState(liked);

    useEffect(() => {
        setLike(liked);
    }, [liked])

    const likeClick = async() => {
        const audioId = item.audioId;
    
        const token = await authService.getAccessToken();

        try {
            const res = await fetch('/api/audios/upvote/' + audioId, {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await res.text();

            setLikes(parseInt(data));
            setLike(!like);
        } catch(ex) {
            console.log(ex);
        }
    };

  return (
    <div className='row board-card'>
      <div className='col-3'>
        {/* Votes Here*/}
        <div className={`score ${like? 'liked': ''}`}>
          <button className='like-btn' onClick={() => likeClick()}>
            <i className='bi bi-chevron-up'></i>
          </button>
            <h3 className='voteCount'>{likes}</h3>
        </div>
      </div>
      <div className='col-3'>
        {/* Play Button Here */}
        <button
          className='play-btn'
          onClick={() => {
            playMusic(item.audioPath);
          }}
        >
          <i className='bi bi-play-fill'></i>
        </button>
      </div>
      <div className='col-4 mt-3'>
        {/* Information Here */}
        <p>
          <span className='userText'>{item.userName ? item.userName : 'Anonymous'}</span>
        </p>
        <p>
          <span className='neonText'>{item.song}</span>
        </p>
        <p>
          <span className='neonText'>{item.originalArtist}</span>
        </p>
        <p>
          <span className='neonText'>{item.submittedOn.substring(0,10)}</span>
        </p>
      </div>
      <div className='col d-flex'>
        <div className='table-btn'>
          {/* Buttons Here */}
          <Link
            to={`/leaderboard/details/${item.audioId}`}
            className='details-btn'
          >
            <i className='bi bi-chat-fill'></i>
          </Link>
          <Link to='#' className='edit-btn'>
            <i className='bi bi-pen'></i>
          </Link>
          <Link to='#' className='delete-btn'>
            <i className='bi bi-x'></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardItem;
