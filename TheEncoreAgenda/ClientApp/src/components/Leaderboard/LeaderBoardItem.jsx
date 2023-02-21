import React from 'react';

const LeaderBoardItem = ({ item, playMusic }) => {
  const likeClick = (event) => {};

  return (
    <div className='row board-card'>
      <div className='col-3'>
        {/* Votes Here*/}
        <div className='score'>
          <button className='likeBtn' onClick={likeClick}>
            <i className='bi bi-chevron-up'></i>
          </button>
          <h3 className='voteCount'>{item.numberOfLikes}</h3>
        </div>
      </div>
      <div className='col-3'>
        {/* Play Button Here */}
        <button
          className='playBtn'
          onClick={() => {
            playMusic(item.audioPath);
          }}
        >
          <i className='bi bi-play-fill'></i>
        </button>
      </div>
      <div className='col-4 mt-3'>
        {/* Information Here */}
        {/* <p>
          <span className='userText'>{item.User.Email}</span>
        </p> */}
        <p>
          <span className='neonText'>{item.song}</span>
        </p>
        <p>
          <span className='neonText'>{item.originalArtist}</span>
        </p>
        <p>
          <span className='neonText'>{item.submittedOn}</span>
        </p>
      </div>
      <div className='col d-flex'>
        <div className='tableBtn'>
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
