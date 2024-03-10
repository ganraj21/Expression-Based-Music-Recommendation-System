import React from 'react';
import PlaylistLayout from './PlaylistLayout';
import { useLocation } from 'react-router-dom';
import NewPlayer from '../../Player/NewPlayer';
import NavHeader from '../HeaderNavigation/NavHeader';
import SideBarSection from '../SidebarInterface/SideBarSection';

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
          <NewPlayer />
        </div>
      </div>
    </>
  );
};

export default PlayListContainer;
