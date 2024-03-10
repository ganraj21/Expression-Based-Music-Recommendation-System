import React, { useEffect } from 'react';
import './InnerFrontPage.css';
import { useNavigate } from 'react-router-dom';
import NavHeader from '../HeaderNavigation/NavHeader';
import CardLayout from '../../Interface/MainCardLayout/CardLayout';
import SideBarSection from '../SidebarInterface/SideBarSection';

const InnerFrontPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const UserId = localStorage.getItem('UserId');
    if (!UserId) {
      navigate(`/`);
    }
  }, []);
  return (
    <>
      <div className="InnerPageSection">
        <div className="PCInnerContainer">
          <SideBarSection />
          <div className="rightMainContainer">
            <NavHeader />
            <CardLayout />
          </div>
        </div>
      </div>
    </>
  );
};

export default InnerFrontPage;
