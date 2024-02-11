import React, { useEffect } from 'react';
import './InnerFrontPage.css';
import NavHeader from '../HeaderNavigation/NavHeader';
import CardLayout from '../MainCardLayout/CardLayout';
import SideBarSection from '../SidebarInterface/SideBarSection';
import { useNavigate } from 'react-router-dom';
import NewPlayer from '../Player/NewPlayer';

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
        <div className="pageContainer">
          <SideBarSection />
          <div className="rightMainContainer">
            <NavHeader />
            <CardLayout />
          </div>
          <NewPlayer />
        </div>
      </div>
    </>
  );
};

export default InnerFrontPage;