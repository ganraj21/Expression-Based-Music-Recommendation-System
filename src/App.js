import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PhoneAuth from './Authentication/Phone_Auth';
import InnerFrontPage from './Pages/InnerFrontPage';
import GeneratePlaylist from './GeneratePlayListAI/GeneratePlaylist';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PhoneAuth />} />
          <Route exact path="/user" element={<InnerFrontPage />} />
          <Route exact path="/user/aiPlaylist" element={<GeneratePlaylist />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
