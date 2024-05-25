import React, { useContext } from 'react';
import { PlayerContext } from '../../PlayerContext';

export const Song = () => {
  const {
    currentTrack,
    // : track,
    isPlaying,
    drawerOpen,
  } = useContext(PlayerContext);
  // const { color } = track;
  console.log(currentTrack);
  return (
    <div
      className={`song-container ${drawerOpen ? 'drawer__shrink_in' : ''}`}
      // style={{
      //   background: `linear-gradient(to right, ${color[0]}, ${color[1]})`,
      //   color: `${color[2]}`,
      // }}
    >
      <img
        src={
          currentTrack?.album?.images[0].url ||
          currentTrack?.track?.album?.images[0].url
        }
        className={isPlaying ? 'spinning__cover' : ''}
        alt={currentTrack?.track?.album?.name || currentTrack?.album?.name}
      />
      <div className="metaInfo">
        <h1>{currentTrack?.track?.album?.name || currentTrack?.album?.name}</h1>
        <h2>{currentTrack?.track?.album?.artists[0].name}</h2>
      </div>
    </div>
  );
};
