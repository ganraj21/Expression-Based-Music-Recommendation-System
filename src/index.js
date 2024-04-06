import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MusicProvider } from './MusicContext';
import { PlayerProvider } from './PlayerContext';

ReactDOM.render(
  <MusicProvider>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </MusicProvider>,
  document.getElementById('root')
);
