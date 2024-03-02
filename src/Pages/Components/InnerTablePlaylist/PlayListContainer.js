import React from 'react';
import SideBarSection from '../SidebarInterface/SideBarSection';
import NavHeader from '../HeaderNavigation/NavHeader';
import PlaylistLayout from './PlaylistLayout';
import { useLocation } from 'react-router-dom';
import NewPlayer from '../Player/NewPlayer';
// import ReactJkMusicPlayer from 'react-jinke-music-player'
// import 'react-jinke-music-player/assets/index.css'
const PlayListContainer = () => {
  const location = useLocation();
  const { state } = location;

  const { e } = state;
  return (
    <>
      <div className="InnerPageSection">
        <div className="pageContainer">
          <SideBarSection />
          <div className="rightMainContainer">
            <NavHeader />
            <PlaylistLayout playlistData={e} />
          </div>
        </div>
        <NewPlayer />
      </div>
    </>
  );
};

export default PlayListContainer;
