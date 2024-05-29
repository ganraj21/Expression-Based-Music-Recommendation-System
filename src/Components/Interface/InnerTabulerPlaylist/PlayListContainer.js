import React, { useContext, useEffect } from 'react';
import PlaylistLayout from './PlaylistLayout';
import NewPlayer from '../../PlayerInterface/NewPlayer';
import SideBarSection from '../../SidebarInterface/SideBarSection';
import NavHeader from '../../HeaderNavigation/NavHeader';
import { PlayerContext } from '../../../PlayerContext';
import { SpotifyMusicContext } from '../../../SpotifyMusicContext';

const PlayListContainer = () => {
  const {
    tracks,
    playerRef,
    currentTrack,
    setTracks,
    timeUpdateHandler,
    skipTrackHandler,
  } = useContext(PlayerContext);

  const { playListTracks } = useContext(SpotifyMusicContext);

  useEffect(() => {
    skipTrackHandler('next');
  }, [tracks]);

  useEffect(() => {
    setTracks(playListTracks);
  }, [playListTracks]);

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
            src={currentTrack?.track?.preview_url}
          />
        </div>
      </div>
    </>
  );
};

export default PlayListContainer;
