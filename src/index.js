import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MusicProvider } from './MusicContext';
import { PlayerProvider } from './PlayerContext';
import { SpotifyAPIContextProvider } from './SpotifyMusicContext';

ReactDOM.render(
  <SpotifyAPIContextProvider>
    <MusicProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </MusicProvider>
  </SpotifyAPIContextProvider>,
  document.getElementById('root')
);
