import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageData from './PageData';
import './InnerFrontPage.css';

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
        <div className="navHeader">
          <span>Icon Home</span>
          <img src="/" alt="user" />
        </div>
        <div className="pageContainer">
          <div className="sideBarContainer">sidebar</div>
          <div className="rightMainContainer">
            <div className="musicSectionCard">
              {PageData.map((e, index) => {
                return (
                  <div className="msCard" key={index}>
                    <img src={e.work_img} alt="music section" />
                    <h4 className="mainTitle">{e.title}</h4>
                    <span className="subTitle">{e.description}</span>
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
