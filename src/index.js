import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MusicProvider } from './MusicContext';

ReactDOM.render(
  <MusicProvider>
    <App />
  </MusicProvider>,
  document.getElementById('root')
);
