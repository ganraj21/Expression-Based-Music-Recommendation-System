import { createContext, useContext, useEffect, useState } from 'react';
import { initializePlaylist } from './initialize';
import { PlayerContext } from './PlayerContext';
const SpotifyMusicContext = createContext();

const SpotifyAPIContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likedMusic, setLikedMusic] = useState([]);
  const [pinnedMusic, setpinnedMusic] = useState([]);
  const [resultOffset, setResultOffset] = useState(0);

  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playListTracks, setPlaylistTracks] = useState([]);
  const [token, setToken] = useState(null);

  const { setCurrentTrack, shuffle } = useContext(PlayerContext);
  const fetchKeywordData = async (reqType) => {
    setTracks([]);
    setCurrentTrack([]);
    window.scrollTo(0, 0);
    setIsLoading(true);
    var reqURL = '';

    if (reqType === 'keyword') {
      reqURL = `https://api.spotify.com/v1/search?q=${keyword}&type=track&offset=${resultOffset}`;
    }
    // else if (reqType === 'artists') {
    //   reqURL = `https://api.spotify.com/v1/artists/${reqId}/albums`;
    // } else
    //  {
    //   reqURL = `https://api.spotify.com/v1/albums/${reqId}`;
    // }
    try {
      const response = await fetch(reqURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch music data');
      }

      const jsonData = await response.json();

      if (typeof jsonData === 'object' && jsonData !== null) {
        setTracks(Object.keys(jsonData).map((key) => jsonData[key]));
      } else {
        setTracks(jsonData?.tracks?.items);
      }

      // Convert object properties to an array of objects
      setTracks(jsonData?.tracks?.items);
      setCurrentTrack(jsonData?.tracks?.items[0]);
      localStorage.setItem('FPath', JSON.stringify(jsonData?.tracks?.items));
      localStorage.setItem('nextRoute', 's');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlaylistData = async (reqType, reqId) => {
    setTracks([]);
    setPlaylistTracks([]);
    window.scrollTo(0, 0);
    setIsLoading(true);
    var reqURL = '';

    if (reqType === 'playlist') {
      reqURL = `https://api.spotify.com/v1/playlists/${reqId}`;
    } else if (reqType === 'artists') {
      reqURL = `https://api.spotify.com/v1/artists/${reqId}/albums`;
    } else {
      reqURL = `https://api.spotify.com/v1/albums/${reqId}`;
    }
    try {
      const response = await fetch(reqURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch music data');
      }

      const jsonData = await response.json();

      // Convert object properties to an array of objects
      setPlaylistTracks(shuffle(jsonData?.tracks?.items));
      // console.log(jsonData?.tracks?.items);
      localStorage.setItem('FPath', JSON.stringify(jsonData?.tracks?.items));
      localStorage.setItem('nextRoute', 'p');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setCurrentTrack(tracks[0]?.items[0]);
  }, []);
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
        fetchKeywordData,
        fetchPlaylistData,
        setPlaylistTracks,
        playListTracks,
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
      }}
    >
      {children}
    </SpotifyMusicContext.Provider>
  );
};

export { SpotifyMusicContext, SpotifyAPIContextProvider };
