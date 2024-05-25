import React, { useContext, useEffect } from 'react';
import PlaylistLayout from './PlaylistLayout';
import NewPlayer from '../../PlayerInterface/NewPlayer';
import SideBarSection from '../../SidebarInterface/SideBarSection';
import NavHeader from '../../HeaderNavigation/NavHeader';
import { PlayerContext } from '../../../PlayerContext';
import { SpotifyMusicContext } from '../../../SpotifyMusicContext';

const PlayListContainer = () => {
  const {
    playerRef,
    currentTrack,
    setTracks,
    timeUpdateHandler,
    skipTrackHandler,
  } = useContext(PlayerContext);

  const { playListTracks, setPlaylistTracks } = useContext(SpotifyMusicContext);

  console.log(currentTrack);

  // const getValue = () => {
  //   const Cardvalue = JSON.parse(localStorage.getItem('FPath'));
  //   console.log(Cardvalue);
  //   setPlaylistTracks(Cardvalue);
  // };
  useEffect(() => {
    // getValue();
    skipTrackHandler('next');
  }, []);

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
