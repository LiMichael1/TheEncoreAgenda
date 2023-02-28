import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './profile.styles.css';
import authService from '../api-authorization/AuthorizeService';
import LeaderBoardItem from '../Leaderboard/LeaderBoardItem';

const defaultUserInfo = {
  id: 0,
  userName: '',
  email: '',
  audios: [],
};

const Profile = () => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  useEffect(() => {
    const getUserInfo = async () => {
      const token = await authService.getAccessToken();
      const res = await fetch('/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log(data);
      setUserInfo(data);
    };

    getUserInfo();
  }, []);

  const { id, userName, email, audios } = userInfo;

    return (
      <div>
          <h5>UserName: <span className='userText'>{userName}</span></h5>
          <h5>Email: <span className='userText'>{email}</span></h5>

      {audios.length > 0
        ? audios.map((audio) => {
            return (
              <>
                <LeaderBoardItem item={audio} />
                <Link
                  to={`/leaderboard/${audio.calendarEventId}`}
                  className='backBtn'
                >
                  Go to Event
                </Link>
              </>
            );
          })
        : 'Nothing Here so Far'}
    </div>
  );
};

export default Profile;
