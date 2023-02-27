import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeaderBoard from '../../Leaderboard/LeaderBoard';

const LeaderBoardPage = () => {
    const { id } = useParams();

  return (
    <div>
        <LeaderBoard id={id} />
    </div>
  );
};

export default LeaderBoardPage;
