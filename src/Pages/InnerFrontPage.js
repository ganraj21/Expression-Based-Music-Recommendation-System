import React from 'react';
// import { useNavigate } from 'react-router-dom';
import './InnerFrontPage.css';
import NavHeader from './Components/NavHeader';
import CardLayout from './Components/CardLayout';
import PlaylistLayout from './Components/Playlist/PlaylistLayout';
import SideBarSection from './Components/SideBarSection';

const InnerFrontPage = () => {
  return (
    <>
      <div className="InnerPageSection">
        <div className="pageContainer">
          <SideBarSection />
          <div className="rightMainContainer">
            <NavHeader />
            <CardLayout />
            {/* <PlaylistLayout /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default InnerFrontPage;
