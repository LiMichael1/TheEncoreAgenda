import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './profile.styles.css';
import authService from '../api-authorization/AuthorizeService';
import LeaderBoardItem from '../Leaderboard/LeaderBoardItem';
import ChangeUserNameForm from './ChangeUserNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import Modal from '../global/Modal/Modal';
import Spinner from '../global/Spinner/Spinner.component'

const defaultUserInfo = {
    id: '',
    userName: '',
    email: '',
    audios: [],
};

const Profile = () => {
    const [userInfo, setUserInfo] = useState(defaultUserInfo);
    const [modalVisible, setModalVisible] = useState(false);
    const [form, setForm] = useState(1);

    useEffect(() => {
        const getUserInfo = async () => {
            const token = await authService.getAccessToken();
            const res = await fetch('/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            setUserInfo(data);
        };

        getUserInfo();
    }, []);

    const setUserName = (userName) => {
        setUserInfo({ ...userInfo, userName: userName });
        setModalVisible(false);
    };

    const setEmail = (email) => {
        setUserInfo({ ...userInfo, email: email });
        setModalVisible(false);
    }

    const showModal = (i) => {
        switch (i) {
            case 1:
            default:
                setForm(1);
                setModalVisible(true);
                break;
            case 2:
                setForm(2);
                setModalVisible(true);
                break;

        }
    }

    const whichForm = () => {
        switch (form) {
            default:
            case 1:
                return <ChangeUserNameForm set={setUserName} />;
                break;
            case 2:
                return <ChangeEmailForm set={setEmail} />;
                break;
        }
    }

    const { id, userName, email, audios } = userInfo;

    return (
        <div>
            {id !== '' ?
                <div>
                    <h5>UserName: <span className='userText profile-fields' onDoubleClick={() => showModal(1)}>{userName}</span></h5>


                    <h5>Email: <span className='userText profile-fields' onDoubleClick={() => showModal(2)}>{email}</span></h5>

                    {audios.length > 0
                        ? audios.map((audio, index) => {
                            return (
                                <div key={index}>
                                    <LeaderBoardItem item={audio} />
                                    <Link
                                        to={`/leaderboard/${audio.calendarEventId}`}
                                        className='backBtn'
                                    >
                                        Go to Event
                                    </Link>
                                </div>
                            );
                        })
                        : 'Nothing Here so Far'}
                    <Modal title={form === 1 ? 'Change UserName' : 'Change Email'} show={modalVisible} setShow={setModalVisible}>
                        {
                            whichForm()
                        }
                    </Modal>
                </div>
                : <Spinner />
            }
        </div>
    );
};

export default Profile;
