import React, { useContext, useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { FaPlay, FaList } from 'react-icons/fa';
import { GiPauseButton } from 'react-icons/gi';
import { FaHeart } from 'react-icons/fa';
import { IoTimeOutline } from 'react-icons/io5';
import './PlaylistLayout.css';
import { MusicContext } from '../../../MusicContext';

const PlaylistLayout = ({ playlistData }) => {
  const [likebtn, isLikeBtn] = useState(0);
  const { playerController, songPlay } = useContext(MusicContext);

  const CardInfo = JSON.parse(localStorage.getItem('FPath'));
  if (playlistData === undefined) playlistData = CardInfo;

  return (
    <>
      <div className="listLayoutContainer">
        <div className="respectiveMusicInfo">
          <div className="cardImage">
            <img
              src={playlistData.work_img}
              class="img-fluid rounded-top"
              alt="card"
            />
          </div>
          <div className="cardInfo">
            <span>Playlist</span>
            <span className="headerTitle">
              <h1>{playlistData.title}</h1>
            </span>
            <span className="subTitle">{playlistData.description}</span>
          </div>
        </div>
        <div className="operationSection">
          <span className="playPauseIcon" onClick={playerController}>
            {songPlay ? <GiPauseButton /> : <FaPlay />}
          </span>
          <span
            className="loveIcon"
            onClick={() => {
              isLikeBtn(!likebtn);
            }}
          >
            {likebtn ? <FaHeart /> : <IoMdHeartEmpty />}
          </span>
          <div className="listIcon">
            <span className="listIconBtn">
              <FaList />
            </span>
          </div>
        </div>
        <div className="playlistContainer">
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '20px',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid #8b8b8b' }}>
                <th style={tableHeaderStyle}>#</th>
                <th style={tableHeaderStyle}>Title</th>
                <th style={tableHeaderStyle}>Album</th>
                <th style={tableHeaderStyle}>
                  <span className="labeltimeIcon">
                    <IoTimeOutline />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {playlistData.subMusic.map((row, index) => (
                <tr key={index} className="labelRow">
                  <td style={tableCellStyle} className="labelNumber">
                    {row.id}
                  </td>
                  <td style={tableCellStyle}>
                    <div className="musicLabelInfo">
                      <div className="musicLabelInfoImage">
                        <img src={row.work_img} alt="label Img" />
                      </div>
                      <div className="labelInfo">
                        <span className="mainTitleName">{row.title}</span>
                        <span className="subTitleName">{row.description}</span>
                      </div>
                    </div>
                  </td>
                  <td style={tableCellStyle} className="labelAlbumName">
                    {row.albumName}
                  </td>
                  <td style={tableCellStyle} className="labelTimeZone">
                    {row.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PlaylistLayout;

// Styles
const tableHeaderStyle = {
  padding: '10px',
  textAlign: 'left',
  color: '#a7a7a7',
};

const tableCellStyle = {
  padding: '10px',
};
