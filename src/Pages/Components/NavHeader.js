import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { FaUser, FaRegBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavHeader = () => {
  const navigate = useNavigate();

  const goBackward = () => {
    const UserId = localStorage.getItem('UserId');
    navigate(`/user/${UserId}`);
  };

  return (
    <>
      <div className="navOutContainer">
        <div className="navHeader">
          <div className="navSlider">
            <span className="leftIcon" onClick={goBackward}>
              <FaAngleLeft
                style={{ height: '30px', width: '15px', fontWeight: '100' }}
              />
            </span>
            <span className="rightIcon">
              <FaAngleRight
                style={{ height: '30px', width: '15px', fontWeight: '100' }}
              />
            </span>
          </div>

          <div className="userProfileIcons">
            <span className="notificationBell">
              <FaRegBell style={{ height: '21px', width: '15px' }} />
            </span>
            <span className="userProfile">
              <FaUser style={{ height: '21px', width: '15px' }} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavHeader;
