import React, { createContext, useEffect, useRef, useState } from 'react';
const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState({
    currentTime: 0,
    duration: 0,
    percentAnimated: 0,
  });

  const uri = 'https://emotion-based-mrs-data.onrender.com';
  useEffect(() => {
    const getMusicData = async () => {
      const res = await fetch(`${uri}/PlaylistSongs`);

      if (res.ok) {
        const result = await res.json();
        setTracks(result);
        console.log(result);
      } else {
        throw new Error('System Error');
      }
    };
    setTimeout(getMusicData, 1500);
  }, []);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const percentAnimatedUpdate = (current / duration) * 100;

    setSongProgress({
      ...songProgress,
      percentAnimated: percentAnimatedUpdate,
      currentTime: current,
      duration,
    });
  };

  const playSongHandler = () => {
    if (isPlaying) playerRef.current?.play();
    if (isPlaying) {
      try {
        playerRef.current.pause();
      } catch (e) {
        console.log(e);
      }
      setIsPlaying(!isPlaying);
    } else {
      playerRef.current?.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        tracks,
        drawerOpen,
        setDrawerOpen,
        playerRef,
        isPlaying,
        setIsPlaying,
        timeUpdateHandler,
        setSongProgress,
        songProgress,
        currentTrack,
        setCurrentTrack,
        playSongHandler,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
