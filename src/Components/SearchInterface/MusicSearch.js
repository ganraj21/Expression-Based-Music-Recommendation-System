import React, { useContext, useEffect } from 'react';
import SideBarSection from '../SidebarInterface/SideBarSection';
import NavHeader from '../HeaderNavigation/NavHeader';
import { SpotifyMusicContext } from '../../SpotifyMusicContext';
import SearchPlayListLayout from './SearchPlayListLayout';
import NewPlayer from '../PlayerInterface/NewPlayer';
import { PlayerContext } from '../../PlayerContext';

const MusicSearch = () => {
  const { tracks } = useContext(SpotifyMusicContext);
  const { playerRef, currentTrack, setCurrentTrack, timeUpdateHandler } =
    useContext(PlayerContext);
  // tracks = tracks[0]?.items;

  useEffect(() => {
    setCurrentTrack(tracks[0]?.items);
  }, [tracks]);

  // console.log(currentTrack[0]?.preview_url);
  return (
    <>
      <div className="InnerPageSection">
        <div className="PCInnerContainer">
          <SideBarSection />
          <div className="rightMainContainer">
            <NavHeader />
            <SearchPlayListLayout playlistData={tracks} />
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

export default MusicSearch;
