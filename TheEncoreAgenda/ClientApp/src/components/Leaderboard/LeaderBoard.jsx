import React, { useState, useEffect } from 'react';
import LeaderBoardItem from './LeaderBoardItem';

const LeaderBoard = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('LeaderBoard Set up');
  }, []);

  return (
    <div className='leaderBoard'>
      {items.map((item) => (
        <LeaderBoardItem item={item} />
      ))}
    </div>
  );
};

export default LeaderBoard;
