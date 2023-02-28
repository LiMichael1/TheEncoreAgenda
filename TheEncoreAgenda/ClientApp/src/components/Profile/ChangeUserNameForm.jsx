import React, { useState } from 'react';
import authService from '../api-authorization/AuthorizeService';

const ChangeUserNameForm = () => {
  const [userName, setUserName] = useState('');

  const handleChange = (event) => setUserName(event.target.name);

  const handleSubmit = async () => {
    const token = await authService.getAccessToken();

    const res = await fetch('/api/profile/username', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
      body: userName,
    });

    const data = await res.text();

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='userName'
        className='form-control'
        value={userName}
        onChange={handleChange}
      />
    </form>
  );
};

export default ChangeUserNameForm;
