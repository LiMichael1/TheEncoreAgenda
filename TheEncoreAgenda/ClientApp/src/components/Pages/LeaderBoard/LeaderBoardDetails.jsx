import React, { useState, useEffect } from 'react';
import CommentForm from '../../Leaderboard/CommentForm';
import Comment from '../../Leaderboard/Comment';
import LeaderBoardItem from '../../Leaderboard/LeaderBoardItem';
import { commentData, boardData } from '../../../utils/sampleData';
import { useParams } from 'react-router-dom';

const LeaderBoardDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [itemReady, setItemReady] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getInfo = () => {
      // needs to be async in the future
      setComments(commentData); // Sample Data
      setItem(boardData.find((x) => x.audioId == id));
      setItemReady(true);
    };

    getInfo();
  }, []);

  const addComment = (comment) => {
    setComments([...comments, comment]);
    // need to add ID
  };

  return (
    <div>
      {itemReady ? <LeaderBoardItem item={item} /> : ''}

      <CommentForm addComment={addComment} />
      {comments.map((comment) => (
        <Comment item={comment} />
      ))}
    </div>
  );
};

export default LeaderBoardDetails;
