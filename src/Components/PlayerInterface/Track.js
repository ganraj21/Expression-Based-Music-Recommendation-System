import React from 'react';

export const Track = ({
  track,
  tracks,
  setCurrentTrack,
  playerRef,
  isPlaying,
  setIsPlaying,
}) => {
  const songSelectHandler = async () => {
    await setCurrentTrack(track);
    if (!isPlaying) {
      setIsPlaying(true);
      playerRef.current.play();
    }
    tracks.map((song) =>
      song === track ? (song.active = true) : (song.active = false)
    );
    if (isPlaying) playerRef.current.play();
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${track.active ? 'selected' : ''}`}
    >
      <img src={track.cover} alt={track.name} />
      <div className="library-card-row">
        <h3>{track.name}</h3>
        <h4>{track.artist}</h4>
      </div>
    </div>
  );
};
