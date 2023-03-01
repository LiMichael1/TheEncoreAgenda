import React, { useState } from 'react';
import authService from '../api-authorization/AuthorizeService';

const ChangeEmailForm = ({ set }) => {
    const [email, setEmail] = useState('');

    const handleChange = (event) => setEmail(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = await authService.getAccessToken();

        const res = await fetch('/api/profile/email', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email),
        });

        const data = await res.text();

        set(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='email'
                className='form-control'
                value={email}
                onChange={handleChange}
            />
            <button className='btn btn-success' type='submit'>Submit</button>
        </form>
    );
};

export default ChangeEmailForm;