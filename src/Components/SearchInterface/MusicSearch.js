import React, { useContext, useEffect, useState } from 'react';
import SideBarSection from '../SidebarInterface/SideBarSection';
import NavHeader from '../HeaderNavigation/NavHeader';
import { SpotifyMusicContext } from '../../SpotifyMusicContext';
import SearchPlayListLayout from './SearchPlayListLayout';
import NewPlayer from '../PlayerInterface/NewPlayer';
import { PlayerContext } from '../../PlayerContext';

const MusicSearch = () => {
  const { tracks } = useContext(SpotifyMusicContext);
  const { playerRef, currentTrack, timeUpdateHandler } =
    useContext(PlayerContext);
  const [newTrack, setNewTrack] = useState([]);

  console.log(currentTrack);
  useEffect(() => {
    const listData = JSON.parse(localStorage.getItem('FPath'));
    console.log(listData);
    setNewTrack(listData);
    // for (var i = 0; i < newTrack.length; i++) {
    //   if (newTrack[i].preview_url != null) setNewTrack(newTrack[i]);
    // }
  }, [tracks]);
  console.log(newTrack);
  // console.log(currentTrack[0]?.preview_url);
  return (
    <>
      <div className="InnerPageSection">
        <div className="PCInnerContainer">
          <SideBarSection />
          <div className="rightMainContainer">
            <NavHeader />
            <SearchPlayListLayout playlistData={currentTrack} />
          </div>
          <NewPlayer />
          <audio
            className="audio player"
            onTimeUpdate={timeUpdateHandler}
            onLoadedMetadata={timeUpdateHandler}
            ref={playerRef}
            src={currentTrack?.preview_url || newTrack?.preview_url}
          />
        </div>
      </div>
    </>
  );
};

export default MusicSearch;
