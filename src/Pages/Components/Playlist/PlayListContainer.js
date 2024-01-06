import React from 'react';
import SideBarSection from '../SideBarSection';
import NavHeader from '../NavHeader';
import PlaylistLayout from './PlaylistLayout';
import { useLocation } from 'react-router-dom';

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
      </div>
    </>
  );
};

export default PlayListContainer;
