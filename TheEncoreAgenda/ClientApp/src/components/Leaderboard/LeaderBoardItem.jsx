import React from 'react';

const LeaderBoardItem = ({ item }) => {
  return (
    <div className='board-card'>
      <div className='col-2'>
        {/* Votes Here*/}
        <div className='score'>
          <button className='likeBtn'>
            <i className='bi bi-chevron-up'></i>
          </button>
        </div>
      </div>
      <div className='col-2'>
        {/* Play Button Here */}
        <button className='playBtn'>
          <i className='bi bi-play'></i>
        </button>
      </div>
      <div className='col-6 mt-3'>
        {/* Information Here */}
        <p>
          <span className='userText'>{item.User.Email}</span>
        </p>
        <p>
          <span className='neonText'>{item.Song}</span>
        </p>
        <p>
          <span className='neonText'>{item.OriginalArtist}</span>
        </p>
        <p>
          <span className='neonText'>
            {item.SubmittedOn.toLocaleDateString()}
          </span>
        </p>
      </div>
      <div className='col d-flex'>
        <div className='table-btn'>
          {/* Buttons Here */}
          <button>
            <i className='bi bi-chat-fill'></i>
          </button>
          <button>
            <i className='bi bi-pen'></i>
          </button>
          <button>
            <i className='bi bi-x-circle-fill'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardItem;
