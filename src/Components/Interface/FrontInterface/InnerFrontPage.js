import React, { useContext, useEffect } from 'react';
import './InnerFrontPage.css';
import { useNavigate } from 'react-router-dom';
import NavHeader from '../../HeaderNavigation/NavHeader';
import CardLayout from '../../Interface/MainCardLayout/CardLayout';
import VideoCapture from '../../../Capture_Video/VideoCapture';
import SideBarSection from '../../SidebarInterface/SideBarSection';
import { SpotifyMusicContext } from '../../../SpotifyMusicContext';
import { MusicContext } from '../../../MusicContext';

const InnerFrontPage = () => {
  // const navigate = useNavigate();
  const { fetchToken } = useContext(SpotifyMusicContext);
  const { videoCh } = useContext(MusicContext);

  // useEffect(() => {
  //   const UserId = localStorage.getItem('UserId');
  //   if (!UserId) {
  //     navigate(`/`);
  //   }
  // }, [videoCh]);
  console.log(fetchToken);
  return (
    <>
      <div className="InnerPageSection">
        <div className="PCInnerContainer">
          <SideBarSection />
          <div className="rightMainContainer">
            <NavHeader />
            {videoCh ? <VideoCapture /> : <CardLayout />}
          </div>
        </div>
      </div>
    </>
  );
};

export default InnerFrontPage;
