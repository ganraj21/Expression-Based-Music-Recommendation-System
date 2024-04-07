import React, { useContext, useEffect } from 'react';
import PlaylistLayout from './PlaylistLayout';
// import { useLocation } from 'react-router-dom';
import NewPlayer from '../../PlayerInterface/NewPlayer';
import SideBarSection from '../../SidebarInterface/SideBarSection';
import NavHeader from '../../HeaderNavigation/NavHeader';
import { PlayerContext } from '../../../PlayerContext';

const PlayListContainer = () => {
  // const location = useLocation();
  const { playerRef, currentTrack, timeUpdateHandler, skipTrackHandler } =
    useContext(PlayerContext);
  // const { state } = location;

  // const { e } = state;

  useEffect(() => {
    skipTrackHandler('next');
  }, []);

  return (
    <>
      <div className="InnerPageSection">
        <div className="pageContainer">
          <SideBarSection />
          <div className="rightMainContainer">
            <NavHeader />
            <PlaylistLayout />
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
