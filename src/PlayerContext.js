import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState({
    currentTime: 0,
    duration: 0,
    percentAnimated: 0,
  });

  const uri = 'https://emotion-based-mrs-data.onrender.com';

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // useEffect(() => {
  //   const getMusicData = async () => {
  //     const res = await fetch(`${uri}/PlaylistSongs`);

  //     if (res.ok) {
  //       const result = await res.json();
  //       setTracks(shuffle(result));
  //       console.log(tracks);
  //     } else {
  //       throw new Error('System Error');
  //     }
  //   };
  //   setTimeout(getMusicData, 2500);
  // }, []);

  const [currentTrack, setCurrentTrack] = useState([]);
  useEffect(() => {
    setCurrentTrack(tracks[0]);
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

  const playSongHandler = async () => {
    if (!playerRef) {
      const currentSongIndex = tracks.findIndex(
        (song) => song === currentTrack
      );
      setCurrentTrack(tracks[(currentSongIndex + 1) % tracks.length]);
    }
    try {
      if (isPlaying) await playerRef?.current?.play();
      if (isPlaying) {
        try {
          await playerRef?.current?.pause();
        } catch (e) {
          console.log(e);
        }
        setIsPlaying(!isPlaying);
      } else {
        await playerRef?.current?.play();
        setIsPlaying(!isPlaying);
      }
    } catch (e) {
      console.log('error');
    }
  };

  const skipTrackHandler = useCallback(
    async (direction) => {
      const currentSongIndex = tracks.findIndex(
        (song) => song === currentTrack
      );
      //console.log(currentTrack);
      // if (currentTrack?.track?.preview_url === null) skipTrackHandler('next');
      if (direction === 'next') {
        await setCurrentTrack(tracks[(currentSongIndex + 1) % tracks.length]);
        if (isPlaying) playerRef.current.play();
      }
      if (direction === 'prev') {
        if (currentSongIndex > 0) {
          await setCurrentTrack(tracks[currentSongIndex - 1]);
          if (isPlaying) playerRef.current.play();
        } else {
          await setCurrentTrack(tracks[tracks.length - 1]);
        }
      }
    },
    [currentTrack, tracks, isPlaying, playerRef, setCurrentTrack]
  );

  return (
    <PlayerContext.Provider
      value={{
        tracks,
        setTracks,
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
        skipTrackHandler,
        shuffle,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
