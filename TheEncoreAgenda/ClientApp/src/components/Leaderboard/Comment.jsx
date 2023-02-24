import React from 'react';

const Comment = ({ item }) => {
  return (
    <div className='row'>
      <div className='col'>
        <p>{item.user ? item.user.email : 'Anonymous'}</p>
      </div>
      <div className='col-8'>
        <p>{item.message}</p>
      </div>
    </div>
  );
};

export default Comment;
