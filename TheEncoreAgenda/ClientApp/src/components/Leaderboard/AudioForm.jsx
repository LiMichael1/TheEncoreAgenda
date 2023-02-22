import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const defaultState = {
  song: '',
  artist: '',
};

const AudioForm = ({ data = defaultState, file = null }) => {
  const [formData, setFormData] = useState(defaultState);
  const fileInputRef = useRef();

  useEffect(() => {
    setFormData(data);
  }, [data]);

  useEffect(() => {
    if (file !== null) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [file]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();

    const res = await fetch('audios', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='Song'>Song</label>
        <input
          type='text'
          name='song'
          className='form-control'
          value={formData.song}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='artist'>Original Artist</label>
        <input
          type='text'
          name='artist'
          className='form-control'
          value={formData.artist}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <input
          type='file'
          name='upload'
          id=''
          className='form-control'
          ref={fileInputRef}
        />
      </div>
      <div>
        <button type='submit' className='btn btn-success'>
          Create
        </button>
      </div>

      <div className='mt-3 text-center'>
        <Link to='/leaderboard/create'>Create Your Own</Link>
      </div>
    </form>
  );
};

export default AudioForm;
