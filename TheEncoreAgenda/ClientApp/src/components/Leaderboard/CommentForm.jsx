import React, { useState } from 'react';
import authService from '../api-authorization/AuthorizeService';
import axios from 'axios';

const CommentForm = ({ audioId, addComment }) => {
    const [message, setMessage] = useState('');

    const handleChange = (event) => setMessage(event.target.value);

    // Need to Call API
    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = await authService.getAccessToken();

        const formData = new FormData();
        formData.append('Message', message);
        formData.append('AudioId', audioId);

        const res = await axios.post('/api/comments', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        const data = res.data;

        addComment(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <input
                    type='hidden'
                    className='form-control'
                    id='AudioId'
                    name='AudioId'
                    value={audioId}
                />
                <input
                    type='text'
                    className='form-control'
                    id='Message'
                    name='Message'
                    vaiue={message}
                    onChange={handleChange}
                />
                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CommentForm;
