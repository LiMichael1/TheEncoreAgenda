import React, { useState } from 'react';

const CommentForm = ({ audioId }) => {
  const [message, setMessage] = useState('');

  const handleChange = (event) => setMessage(event.target.value);

  // Need to Call API
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(audioId + ' ' + message);
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
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
};

export default CommentForm;
