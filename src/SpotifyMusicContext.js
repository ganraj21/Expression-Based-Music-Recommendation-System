import { createContext, useEffect, useState } from 'react';
import { initializePlaylist } from './initialize';
const SpotifyMusicContext = createContext();

const SpotifyAPIContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likedMusic, setLikedMusic] = useState([]);
  const [pinnedMusic, setpinnedMusic] = useState([]);
  const [resultOffset, setResultOffset] = useState(0);

  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('');
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]?.items);

  const fetchMusicData = async () => {
    setTracks([]);
    window.scrollTo(0, 0);
    setIsLoading(true);
    try {
      const response = await fetch(
        // `https://api.spotify.com/v1/playlists/37i9dQZF1DXbVhgADFy3im`,
        // 'https://api.spotify.com/v1/albums/0a183xiCHiC1GQd8ou7WXO',
        // 'https://api.spotify.com/v1/artists/4YRxDV8wJFPHPTeXepOstw/albums',
        `https://api.spotify.com/v1/search?q=${keyword}&type=track&offset=${resultOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch music data');
      }

      const jsonData = await response.json();

      if (typeof jsonData === 'object' && jsonData !== null) {
        setTracks(Object.keys(jsonData).map((key) => jsonData[key]));
      } else {
        setTracks(jsonData);
      }
      // Convert object properties to an array of objects

      // .tracks.items
      console.log(jsonData?.tracks.items);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // current client credentials will be deleted in few days
  const fetchToken = async () => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&client_id=a77073181b7d48eb90003e3bb94ff88a&client_secret=68790982a0554d1a83427e061e371507',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch token');
      }

      const jsonData = await response.json();
      setToken(jsonData.access_token);
      console.log(jsonData.access_token);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializePlaylist();

    fetchToken();
    setLikedMusic(JSON.parse(localStorage.getItem('likedMusic')));
    setpinnedMusic(JSON.parse(localStorage.getItem('pinnedMusic')));
  }, [setIsLoading, setLikedMusic]);

  return (
    <SpotifyMusicContext.Provider
      value={{
        fetchMusicData,
        isLoading,
        setIsLoading,
        likedMusic,
        setLikedMusic,
        resultOffset,
        setResultOffset,
        pinnedMusic,
        fetchToken,
        setpinnedMusic,
        setKeyword,
        keyword,
        tracks,
        currentTrack,
      }}
    >
      {children}
    </SpotifyMusicContext.Provider>
  );
};

export { SpotifyMusicContext, SpotifyAPIContextProvider };
