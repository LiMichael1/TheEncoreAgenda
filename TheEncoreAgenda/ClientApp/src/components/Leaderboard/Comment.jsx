import React from 'react';

const Comment = ({ item }) => {
  return (
    <div className='row'>
      <div className='col'>
        <p>{item.User.Email}</p>
      </div>
      <div className='col-8'>
        <p>{item.Message}</p>
      </div>
    </div>
  );
};

export default Comment;
