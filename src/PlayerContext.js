import React, { createContext, useContext, useRef, useState } from 'react';
import { MusicContext } from './MusicContext';
const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const { songData } = useContext(MusicContext);
  const [tracks] = useState(songData);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const playerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState({
    currentTime: 0,
    duration: 0,
    percentAnimated: 0,
  });

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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};
