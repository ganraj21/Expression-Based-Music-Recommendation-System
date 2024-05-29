import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserIconActions = () => {
  const navigate = useNavigate();
  const UserAction = () => {
    const userConfirmed = window.confirm('Are you sure you want to Logout');

    if (userConfirmed) {
      localStorage.setItem('UserId', '');
      navigate('/');
    }
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
