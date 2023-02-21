import React, { useState, useEffect } from 'react';
import Video from './Video';

const KaraokeVideo = ({ setFormData }) => {
  const [links, setLinks] = useState([]);
  const [videoLink, setVideoLink] = useState('');

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('data.json');
      const data = await res.json();

      const links = data.videos;
      setLinks(links);
    };
    getData();
  }, []);

  const handleChange = (event) => {
    const [videoLink, title] = event.target.value.split('|');
    setVideoLink(videoLink);

    const titleSplit = title.split('-');
    const song = titleSplit[1];
    const artist = titleSplit[0];

    setFormData({ song: song.trim(), artist: artist.trim() });
  };

  return (
    <div>
      <select onChange={handleChange}>
        <option value=''>Choose Song</option>
        {links.map((link, index) => (
          <option
            key={index}
            value={link.videoLink.stringValue + '|' + link.title.stringValue}
          >
            {link.title.stringValue}
          </option>
        ))}
      </select>
      {videoLink !== '' ? <Video url={videoLink} /> : ''}
    </div>
  );
};

export default KaraokeVideo;
