import React, { useState, useEffect } from 'react';
import CommentForm from '../../Leaderboard/CommentForm';
import Comment from '../../Leaderboard/Comment';
import LeaderBoardItem from '../../Leaderboard/LeaderBoardItem';
import { commentData, boardData } from '../../../utils/sampleData';
import { useParams, Link } from 'react-router-dom';

const LeaderBoardDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [itemReady, setItemReady] = useState(false);
    const [comments, setComments] = useState([]);

    // Get Audio Details
    useEffect(() => {
        const getInfo = async() => {
            const res = await fetch('/api/audios/' + id);
            const data = await res.json();
            setItem(data);
            setItemReady(true);
        };

        getInfo();
    }, [id]);

    // Get Comments
    useEffect(() => {
        const getComments = async () => {
            const res = await fetch('/api/comments/audio/' + id);
            const data = await res.json();

            setComments(data);
        }

        getComments();
    }, [id]);

    const addComment = (comment) => {
        setComments([...comments, comment]);
        // need to add ID
    };

    return (
        <div>
            {itemReady ? <LeaderBoardItem item={item} /> : ''}
            <Link to={`/leaderboard/${item.calendarEventId ? item.calendarEventId : ''}`} className='backBtn'>Back to the LeaderBoard</Link>

            <CommentForm addComment={addComment} audioId={id} />
            {comments.map((comment, index) => (
                <Comment key={index} item={comment} />
            ))}
        </div>
    );
};

export default LeaderBoardDetails;
