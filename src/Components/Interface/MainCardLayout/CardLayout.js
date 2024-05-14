import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../../../MusicContext';

const CardLayout = () => {
  const { greeting, cardData, setVideoCh } = useContext(MusicContext);
  const navigate = useNavigate();

  return (
    <>
      {cardData.cardLayout?.map((a, id) => {
        return (
          <>
            <div className="dayGreeting" key={id}>
              {a.mainTitle === 'Good' ? greeting : a.mainTitle}
            </div>
            <div className="musicSectionCard">
              {a.subTopicks.map((e, index) => {
                return (
                  <div
                    className="msCard"
                    key={index}
                    onClick={() => {
                      console.log(e);
                      if (e.title !== 'AI Generated Playlist') {
                        localStorage.setItem('FPath', JSON.stringify(e));
                        localStorage.setItem('nextRoute', 'p');
                        navigate(`/user/playlist/${e.title}`, {
                          state: {
                            e,
                          },
                        });
                        return;
                      } else if (e.title === 'AI Generated Playlist') {
                        setVideoCh(1);
                      }
                      // navigate(`/user/capture`);
                    }}
                  >
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
