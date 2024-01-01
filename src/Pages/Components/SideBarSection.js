import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { IoSearchOutline } from 'react-icons/io5';
import { MdLibraryMusic } from 'react-icons/md';
import { FaPlus, FaArrowRight } from 'react-icons/fa6';
const SideBarSection = () => {
  const navigate = useNavigate();
  const Data = [
    {
      number: 1,
      imageUri: 'https://misc.scdn.co/liked-songs/liked-songs-640.png',
      mainTitle: 'Liked Songs',
      subTitle: 'PlayList- User',
    },
    {
      number: 2,
      imageUri:
        'https://i.scdn.co/image/ab67706c0000da843e0e16910bea8fa6ead5ca03',
      mainTitle: 'Car Music',
      subTitle: 'Playlist • Magic Records',
    },
    {
      number: 3,
      imageUri:
        'https://seed-mix-image.spotifycdn.com/v6/img/moody/00FQb4jTyendYWaN8pK0wa/en/default',
      mainTitle: 'Moody Mix',
      subTitle: 'Lana Del Rey and more',
    },
  ];
  return (
    <>
      <div className="sideBarContainer">
        <div className="topNav">
          <span
            className="sidebarHome"
            onClick={() => {
              navigate('/user');
            }}
          >
            <GoHome style={{ height: '30px', width: '27px' }} /> Home
          </span>
          <span className="sidebarSearch">
            <IoSearchOutline style={{ height: '30px', width: '27px' }} />
            Search
          </span>
        </div>
        <div className="bottomOperations">
          <div className="createLiOptions">
            <span className="musicLibrary" title="Enlarge Your Library">
              <MdLibraryMusic />
              <h5>Your Library</h5>
            </span>
            <div className="createMore">
              <span
                className="createNewPlaylist"
                title="Create playlist or folder"
              >
                <FaPlus />
              </span>
              <span className="showMore" title="show more">
                <FaArrowRight />
              </span>
            </div>
          </div>
          <div className="sortActions">
            <span>Playlists</span>
            <span>Artists</span>
          </div>
          <div className="libraryPlayListContainer">
            {Data.map((e, index) => {
              return (
                <div className="libraryplcontainer" key={index}>
                  <div className="libraryImg">
                    <img src={e.imageUri} alt="playlist img" />
                  </div>
                  <div className="libraryInfo">
                    <span className="libraryCardTitle">{e.mainTitle}</span>
                    <span className="librarySubTitle">{e.subTitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarSection;
