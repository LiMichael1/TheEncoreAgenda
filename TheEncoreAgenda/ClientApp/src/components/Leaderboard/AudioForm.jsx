import React, { useState } from 'react';

const defaultState = {
  song: '',
  artist: '',
};

const AudioForm = () => {
  const [formData, setFormData] = useState(defaultState);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        <input type='file' name='upload' id='' className='form-control' />
      </div>
      <div className='form-control'>
        <button type='submit'>Create</button>
      </div>
    </form>
  );
};

export default AudioForm;
