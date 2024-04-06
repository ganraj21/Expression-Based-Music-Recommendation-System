import React, { useContext } from 'react';
import PlaylistLayout from './PlaylistLayout';
import { useLocation } from 'react-router-dom';
import NewPlayer from '../../PlayerInterface/NewPlayer';
import SideBarSection from '../../SidebarInterface/SideBarSection';
import NavHeader from '../../HeaderNavigation/NavHeader';
import { PlayerContext } from '../../../PlayerContext';

const PlayListContainer = () => {
  const location = useLocation();
  const { playerRef, currentTrack, timeUpdateHandler } =
    useContext(PlayerContext);
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
          <audio
            onTimeUpdate={timeUpdateHandler}
            onLoadedMetadata={timeUpdateHandler}
            ref={playerRef}
            src={currentTrack?.audio}
          />
        </div>
      </div>
    </>
  );
};

export default PlayListContainer;
