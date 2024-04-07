import React, { useContext } from 'react';
import { PlayerContext } from '../../PlayerContext';

export const Song = () => {
  const {
    currentTrack: track,
    isPlaying,
    drawerOpen,
  } = useContext(PlayerContext);
  // const { color } = track;
  return (
    <div
      className={`song-container ${drawerOpen ? 'drawer__shrink_in' : ''}`}
      // style={{
      //   background: `linear-gradient(to right, ${color[0]}, ${color[1]})`,
      //   color: `${color[2]}`,
      // }}
    >
      <img
        src={track?.coverUrl}
        className={isPlaying ? 'spinning__cover' : ''}
        alt={track?.title}
      />
      <div className="metaInfo">
        <h1>{track?.title}</h1>
        <h2>{track?.artist}</h2>
      </div>
    </div>
  );
};
