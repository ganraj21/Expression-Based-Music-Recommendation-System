import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PhoneAuth from './Authentication/Phone_Auth';
import VideoCapture from './Capture_Video/VideoCapture';
import InnerFrontPage from './Components/Interface/FrontInterface/InnerFrontPage';
import PlayListContainer from './Components/Interface/InnerTabulerPlaylist/PlayListContainer';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PhoneAuth />} />
          <Route exact path="/user/:id" element={<InnerFrontPage />} />
          <Route
            exact
            path="user/playlist/:id"
            element={<PlayListContainer />}
          />
          <Route exact path="/user/capture" element={<VideoCapture />} />
          {/* <Route exact path="/user/aiPlaylist" element={<GeneratePlaylist />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
