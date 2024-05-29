import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PhoneAuth from './Authentication/Phone_Auth';
// import VideoCapture from './Capture_Video/VideoCapture';
import InnerFrontPage from './Components/Interface/FrontInterface/InnerFrontPage';
import PlayListContainer from './Components/Interface/InnerTabulerPlaylist/PlayListContainer';
import MusicSearch from './Components/SearchInterface/MusicSearch';
import SideBarSection from './Components/SidebarInterface/SideBarSection';

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
          <Route exact path="/user/search/:id" element={<MusicSearch />} />
          <Route exact path="/user/:id/setting" element={<SideBarSection />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
