import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../../MusicContext';

const UserIconActions = () => {
  const navigate = useNavigate();
  const { userId } = useContext(MusicContext);

  const UserAction = () => {
    const userConfirmed = window.confirm('Are you sure you want to Logout');

    if (userConfirmed) {
      localStorage.setItem('UserId', '');
      navigate('/');
    }
  };

  const handleNavigation = () => {
    navigate(`/user/${userId}/setting`, {
      state: {
        customStyle,
      },
    });
  };

  return (
    <>
      <div className="UserActionContainer">
        <div className="userContaineSection">
          <span onClick={UserAction}>LogOut</span>
          <span onClick={handleNavigation}>Settings</span>
        </div>
      </div>
    </>
  );
};

export default UserIconActions;

const customStyle = {
  Width: '100%',
  Display: 'flex',
  Padding: '10px',
  Color: '#fff',
  Margin: '0px !important',
};
