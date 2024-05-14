import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MusicProvider } from './MusicContext';
import { PlayerProvider } from './PlayerContext';
import { SpotifyAPIContextProvider } from './SpotifyMusicContext';

ReactDOM.render(
  <PlayerProvider>
    <SpotifyAPIContextProvider>
      <MusicProvider>
        <App />
      </MusicProvider>
    </SpotifyAPIContextProvider>
  </PlayerProvider>,
  document.getElementById('root')
);
