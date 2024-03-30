import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { FaUser, FaRegBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserIconActions from './UserIconActions';
import toast, { Toaster } from 'react-hot-toast';

const NavHeader = () => {
  const navigate = useNavigate();
  const [userActions, setUserAction] = useState(0);

  const goBackward = () => {
    const UserId = localStorage.getItem('UserId');
    navigate(`/user/${UserId}`);
  };

  const goForward = () => {
    const CardInfo = JSON.parse(localStorage.getItem('FPath'));

    try {
      console.log(CardInfo.title);
      navigate(`/user/playlist/${CardInfo.title}`, {
        state: {
          CardInfo,
        },
      });
    } catch (e) {
      if (!CardInfo) {
        toast.error('No Content Available');
      }
    }
  };

  const showUserActions = () => {
    console.log('Clicked on User Profile');
    setUserAction(!userActions);
  };

  return (
    <>
      <div className="navOutContainer">
        <Toaster toastOptions={{ duration: 3000 }} />
        <div className="navHeader">
          <div className="navSlider">
            <span className="leftIcon" onClick={goBackward}>
              <FaAngleLeft
                style={{ height: '30px', width: '15px', fontWeight: '100' }}
              />
            </span>
            <span className="rightIcon" onClick={goForward}>
              <FaAngleRight
                style={{ height: '30px', width: '15px', fontWeight: '100' }}
              />
            </span>
          </div>

          <div className="userProfileIcons">
            <span className="notificationBell">
              <FaRegBell style={{ height: '21px', width: '15px' }} />
            </span>
            <span className="userProfile" onClick={showUserActions}>
              <FaUser style={{ height: '21px', width: '15px' }} />
            </span>
          </div>
        </div>
        {userActions ? <UserIconActions /> : ''}
      </div>
    </>
  );
};

export default NavHeader;
