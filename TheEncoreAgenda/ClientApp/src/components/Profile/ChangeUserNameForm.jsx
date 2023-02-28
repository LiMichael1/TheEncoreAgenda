import React, { useState } from 'react';
import authService from '../api-authorization/AuthorizeService';

const ChangeUserNameForm = ({ set }) => {
  const [userName, setUserName] = useState('');

  const handleChange = (event) => setUserName(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await authService.getAccessToken();

    const res = await fetch('/api/profile/username', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userName),
    });

      const data = await res.text();

      set(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='form-control'
        value={userName}
        onChange={handleChange}
          />
      <button className='btn btn-success' type='submit'>Submit</button>
    </form>
  );
};

export default ChangeUserNameForm;
