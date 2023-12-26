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
              <span>
                <GoHome /> Home
              </span>
              <span>
                <IoSearchOutline /> Search
              </span>
            </div>
            <div className="bottomOperations">
              <span>
                <MdLibraryMusic />
                Your Library
              </span>
              <span>
                <FaPlus />
              </span>
              <span>
                <FaArrowRight />
              </span>
              <span>Playlists</span>
              <span>Artists</span>
            </div>
          </div>
          <div className="rightMainContainer">
            <div className="navHeader">
              <span>
                <FaAngleLeft />
              </span>
              <span>
                <FaAngleRight />
              </span>
              <span>
                <FaRegBell />
              </span>
              <span>
                <FaUser />
              </span>
            </div>
            <div className="musicSectionCard">
              {PageData.map((e, index) => {
                return (
                  <div className="msCard" key={index}>
                    <img src={e.work_img} alt="music section" />
                    <h4 className="mainTitle" title={e.title}>
                      {e.title}
                    </h4>
                    <h6 className="subTitle" title={e.description}>
                      {e.description}
                    </h6>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InnerFrontPage;
