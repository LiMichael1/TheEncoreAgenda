import React, { useState, useEffect } from 'react';
import CommentForm from '../../Leaderboard/CommentForm';
import Comment from '../../Leaderboard/Comment';
import LeaderBoardItem from '../../Leaderboard/LeaderBoardItem';
import { commentData, boardData } from '../../../utils/sampleData';

const LeaderBoardDetails = ({ id = 1 }) => {
  const [item, setItem] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getInfo = () => {
      // needs to be async in the future
      setComments(commentData); // Sample Data
      setItem(boardData[0]);
    };

    getInfo();
  }, []);

  const addComment = (comment) => {
    setComments([...comments, comment]);
    // need to add ID
  };

  return (
    <div>
      <LeaderBoardItem item={item} />
      <CommentForm addComment={addComment} />
      {comments.map((comment) => (
        <Comment item={comment} />
      ))}
    </div>
  );
};

export default LeaderBoardDetails;
