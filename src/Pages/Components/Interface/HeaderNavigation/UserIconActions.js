import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserIconActions = () => {
  const navigate = useNavigate();
  const UserAction = () => {
    localStorage.setItem('UserId', '');
    navigate('/');
  };

  return (
    <>
      <div className="UserActionContainer">
        <div className="userContaineSection">
          <span onClick={UserAction}>LogOut</span>
          <span>Settings</span>
        </div>
      </div>
    </>
  );
};

export default UserIconActions;
