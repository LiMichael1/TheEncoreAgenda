import React from 'react';

const LeaderBoardItem = ({ item, playMusic }) => {
  return (
    <div className='row board-card'>
      <div className='col-3'>
        {/* Votes Here*/}
        <div className='score'>
          <button className='likeBtn'>
            <i className='bi bi-hand-thumbs-up-fill'></i>
          </button>
        </div>
      </div>
      <div className='col-3'>
        {/* Play Button Here */}
        <button
          className='playBtn'
          onClick={() => {
            playMusic(item.AudioPath);
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
          <span className='neonText'>{item.Song}</span>
        </p>
        <p>
          <span className='neonText'>{item.OriginalArtist}</span>
        </p>
        <p>
          <span className='neonText'>{item.SubmittedOn}</span>
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
