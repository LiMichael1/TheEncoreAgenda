import React, { useState } from 'react';

const CommentForm = ({ audioId, addComment }) => {
  const [message, setMessage] = useState('');

  const handleChange = (event) => setMessage(event.target.value);

  // Need to Call API
  const handleSubmit = (event) => {
    event.preventDefault();

    const comment = {
      User: {
        Email: 'jeffBezos@amazon.com',
      },
      Message: message,
    };

    addComment(comment);
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
