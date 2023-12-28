import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageData from './PageData';
import './InnerFrontPage.css';
import { GoHome } from 'react-icons/go';
import { IoSearchOutline } from 'react-icons/io5';
import {
  FaAngleLeft,
  FaAngleRight,
  FaPlus,
  FaArrowRight,
} from 'react-icons/fa6';
import { FaUser, FaRegBell } from 'react-icons/fa';
import { MdLibraryMusic } from 'react-icons/md';
const InnerFrontPage = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const userPhone = localStorage.getItem('User-Phone');
  //   if (!userPhone) {
  //     navigate('/');
  //   }
  // });
  return (
    <>
      <div className="InnerPageSection">
        <div className="pageContainer">
          <div className="sideBarContainer">
            <div className="topNav">
              <span className="sidebarHome">
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
              <span>Playlists</span>
              <span>Artists</span>
            </div>
          </div>
          <div className="rightMainContainer">
            <div className="navHeader">
              <div className="navSlider">
                <span className="leftIcon">
                  <FaAngleLeft
                    style={{ height: '30px', width: '15px', fontWeight: '100' }}
                  />
                </span>
                <span className="rightIcon">
                  <FaAngleRight
                    style={{ height: '30px', width: '15px', fontWeight: '100' }}
                  />
                </span>
              </div>

              <div className="userProfileIcons">
                <span className="notificationBell">
                  <FaRegBell style={{ height: '21px', width: '15px' }} />
                </span>
                <span className="userProfile">
                  <FaUser style={{ height: '21px', width: '15px' }} />
                </span>
              </div>
            </div>
            {PageData.map((a, id) => {
              return (
                <>
                  <div className="dayGreeting" key={id}>
                    {a.mainTitle}
                  </div>
                  <div className="musicSectionCard">
                    {a.subTopicks.map((e, index) => {
                      return (
                        <div className="msCard" key={index}>
                          <img src={e.work_img} alt="music section" />
                          <h4 className="mainTitle" title={e.title}>
                            {e.title}
                          </h4>
                          <h5 className="subTitle" title={e.description}>
                            {e.description}
                          </h5>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default InnerFrontPage;
