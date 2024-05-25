import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../../../MusicContext';
import { SpotifyMusicContext } from '../../../SpotifyMusicContext';

const CardLayout = () => {
  const { greeting, cardData, setVideoCh } = useContext(MusicContext);
  const { fetchPlaylistData } = useContext(SpotifyMusicContext);
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
                        localStorage.setItem('nextRouteId', e.titleId);
                        fetchPlaylistData('playlist', e.titleId);
                        navigate(`/user/playlist/${e.titleId}`, {
                          state: {
                            e,
                          },
                        });
                        return;
                      } else if (e.title === 'AI Generated Playlist') {
                        setVideoCh(1);
                      }
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
