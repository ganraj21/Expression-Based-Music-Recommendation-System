import React, { useContext } from 'react';
import SideBarSection from '../SidebarInterface/SideBarSection';
import NavHeader from '../HeaderNavigation/NavHeader';
// import { SpotifyMusicContext } from '../../SpotifyMusicContext';
import SearchPlayListLayout from './SearchPlayListLayout';
import NewPlayer from '../PlayerInterface/NewPlayer';
import { PlayerContext } from '../../PlayerContext';

const MusicSearch = () => {
  // const { tracks } = useContext(SpotifyMusicContext);
  const { playerRef, currentTrack, timeUpdateHandler } =
    useContext(PlayerContext);
  // const [newTrack, setNewTrack] = useState([]);

  console.log(currentTrack);
  // useEffect(() => {
  //   const listData = JSON.parse(localStorage.getItem('FPath'));
  //   setNewTrack(listData);
  //   setTracks(listData);
  // }, [tracks]);
  // console.log(newTrack);
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
            src={currentTrack?.preview_url}
          />
        </div>
      </div>
    </>
  );
};

export default MusicSearch;
