import React, { useContext, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { FaUser, FaRegBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserIconActions from './UserIconActions';
import toast, { Toaster } from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import { PlayerContext } from '../../PlayerContext';
import { MusicContext } from '../../MusicContext';
import { SpotifyMusicContext } from '../../SpotifyMusicContext';

const NavHeader = () => {
  const navigate = useNavigate();
  const [userActions, setUserAction] = useState(0);
  const { setVideoCh, videoCh } = useContext(MusicContext);
  const { setKeyword, keyword, fetchMusicData, setResultOffset } =
    useContext(SpotifyMusicContext);
  const { currentTrack, shuffle, tracks } = useContext(PlayerContext);

  const goBackward = () => {
    shuffle(tracks);
    const UserId = localStorage.getItem('UserId');
    navigate(`/user/${UserId}`);
    if (videoCh) setVideoCh(0);
  };

  const goForward = () => {
    const CardInfo = JSON.parse(localStorage.getItem('FPath'));
    shuffle(tracks);
    try {
      console.log(CardInfo.title);
      navigate(`/user/playlist/${CardInfo.title}`, {
        state: {
          CardInfo,
        },
      });
    } catch (e) {
      if (!CardInfo) {
        toast.error('No Content Available');
      }
    }
  };

  const showUserActions = () => {
    console.log('Clicked on User Profile');
    setUserAction(!userActions);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setResultOffset(0);
      fetchMusicData();
      navigate(`/user/search/${keyword}`);
    }
  };

  return (
    <>
      <div className="navOutContainer">
        <Toaster toastOptions={{ duration: 3000 }} />
        <div
          className="navHeader"
          style={{ background: currentTrack?.palette }}
        >
          <div className="navSlider">
            <span className="leftIcon" onClick={goBackward}>
              <FaAngleLeft
                style={{ height: '30px', width: '15px', fontWeight: '100' }}
              />
            </span>
            <span className="rightIcon" onClick={goForward}>
              <FaAngleRight
                style={{ height: '30px', width: '15px', fontWeight: '100' }}
              />
            </span>
          </div>
          <div className="nav__search">
            <input
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={handleKeyPress}
              style={{
                width: '85%',
                height: '36px',
                background: 'transparent',
                color: '#fff',
                paddingLeft: '10px',
                border: '1px #fff',
                borderRadius: '9px',
              }}
            />
            <FiSearch />
          </div>
          <div className="userProfileIcons">
            {/* <span className="notificationBell">
              <FaRegBell style={{ height: '21px', width: '15px' }} />
            </span> */}
            <span className="userProfile" onClick={showUserActions}>
              <FaUser style={{ height: '21px', width: '15px' }} />
            </span>
          </div>
        </div>
        {userActions ? <UserIconActions /> : ''}
      </div>
    </>
  );
};

export default NavHeader;
