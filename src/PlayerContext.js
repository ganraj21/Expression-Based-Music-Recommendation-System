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

  useEffect(() => {
    const getMusicData = async () => {
      const res = await fetch(`${uri}/PlaylistSongs`);

      if (res.ok) {
        const result = await res.json();
        setTracks(shuffle(result));
        // setTracks(result);
        console.log(tracks);
      } else {
        throw new Error('System Error');
      }
    };
    setTimeout(getMusicData, 1500);
  }, []);

  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
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
    if (!playerRef) {
      const currentSongIndex = tracks.findIndex(
        (song) => song === currentTrack
      );
      setCurrentTrack(tracks[(currentSongIndex + 1) % tracks.length]);
    }
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

  const skipTrackHandler = useCallback(
    async (direction) => {
      const currentSongIndex = tracks.findIndex(
        (song) => song === currentTrack
      );
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

  const handleSpotifyLogin = () => {
    const clientId = '738b40260db24fbaaacef0d6f5527b1d';
    const redirectUri = 'http://localhost:3001/';
    const scopes = ['user-read-private', 'playlist-read-private'];
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      '%20'
    )}&response_type=token`;

    window.location.href = spotifyAuthUrl;
  };
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
        handleSpotifyLogin,
        shuffle,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
