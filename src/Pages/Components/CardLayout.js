import React from 'react';
import PageData from '../PageData';

const CardLayout = () => {
  return (
    <>
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
    </>
  );
};

export default CardLayout;
