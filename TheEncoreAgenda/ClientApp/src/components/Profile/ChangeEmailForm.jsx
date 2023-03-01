import React, { useState } from 'react';
import authService from '../api-authorization/AuthorizeService';
import Spinner from '../global/Spinner/Spinner.component';

const ChangeEmailForm = ({ set }) => {
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);

    const handleChange = (event) => setEmail(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSending(true);

        try {
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
        } catch (ex) {
            console.log(ex);
        }

        setSending(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='email'
                className='form-control'
                value={email}
                onChange={handleChange}
            />
            <button className='btn btn-success mt-4' type='submit'>
                { sending ? <Spinner /> : 'Submit' }
            </button>
        </form>
    );
};

export default ChangeEmailForm;