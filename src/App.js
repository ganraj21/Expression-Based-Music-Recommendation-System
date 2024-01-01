import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PhoneAuth from './Authentication/Phone_Auth';
import InnerFrontPage from './Pages/InnerFrontPage';
import GeneratePlaylist from './GeneratePlayListAI/GeneratePlaylist';
import VideoCapture from './Capture_Video/VideoCapture';
import SideBarSection from './Pages/Components/SideBarSection';
import NavHeader from './Pages/Components/NavHeader';
import PlaylistLayout from './Pages/Components/Playlist/PlaylistLayout';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PhoneAuth />} />
          <Route exact path="/user" element={<InnerFrontPage />} />
          <Route
            exact
            path="/user/:id"
            element={
              <>
                <div className="InnerPageSection">
                  <div className="pageContainer">
                    <SideBarSection />
                    <div className="rightMainContainer">
                      <NavHeader />
                      <PlaylistLayout />
                    </div>
                  </div>
                </div>
              </>
            }
          />
          <Route exact path="/user/capture" element={<VideoCapture />} />
          {/* <Route exact path="/user/aiPlaylist" element={<GeneratePlaylist />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
