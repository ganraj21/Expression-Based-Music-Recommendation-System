import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PhoneAuth from './Authentication/Phone_Auth';
import InnerFrontPage from './Components/Interface/FrontInterface/InnerFrontPage';
import PlayListContainer from './Components/Interface/InnerTabulerPlaylist/PlayListContainer';
import MusicSearch from './Components/SearchInterface/MusicSearch';
import SideBarSection from './Components/SidebarInterface/SideBarSection';
import { PrivateRoutes } from './Authentication/PrivateRoutes';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={<PhoneAuth />} /> */}
          {/* <Route element={<PrivateRoutes />}> */}
            <Route exact path="/" element={<InnerFrontPage />} />
            <Route
              exact
              path="user/playlist/:id"
              element={<PlayListContainer />}
            />
            <Route exact path="/user/search/:id" element={<MusicSearch />} />
            <Route
              exact
              path="/user/:id/setting"
              element={<SideBarSection />}
            />
          {/* </Route> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
