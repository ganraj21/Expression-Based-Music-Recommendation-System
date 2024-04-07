import React, { useContext, useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { FaPlay, FaList } from 'react-icons/fa';
import { GiPauseButton } from 'react-icons/gi';
import { FaHeart } from 'react-icons/fa';
import { IoTimeOutline } from 'react-icons/io5';
import './PlaylistLayout.css';
import { PlayerContext } from '../../../PlayerContext';

const PlaylistLayout = ({ playlistData }) => {
  const [likebtn, isLikeBtn] = useState(0);
  console.log(playlistData);
  const {
    tracks,
    setCurrentTrack,
    playerRef,
    isPlaying,
    setIsPlaying,
    playSongHandler,
    currentTrack,
  } = useContext(PlayerContext);

  const CardInfo = JSON.parse(localStorage.getItem('FPath'));
  if (playlistData === undefined) playlistData = CardInfo;

  const songSelectHandler = async (row) => {
    await setCurrentTrack(row);
    console.log(row);
    if (!isPlaying) {
      setIsPlaying(true);
      playerRef.current.play();
    }
    tracks.map((song) =>
      song === row ? (song.active = true) : (song.active = false)
    );
    if (isPlaying) playerRef.current.play();
  };

  return (
    <>
      <div className="listLayoutContainer">
        <div
          className="respectiveMusicInfo"
          style={{ background: currentTrack?.palette }}
        >
          <div className="cardImage">
            <img
              src={
                `https://source.unsplash.com/175x175/?${'happy'}` ||
                playlistData.work_img
              }
              class="img-fluid rounded-top"
              alt="card"
            />
          </div>
          <div className="cardInfo">
            <span>Playlist</span>
            <span className="headerTitle">
              <h1>{playlistData?.title || playlistData}</h1>
            </span>
            <span className="subTitle">{playlistData.description}</span>
          </div>
        </div>
        <div className="operationSection">
          <span className="playPauseIcon" onClick={playSongHandler}>
            {isPlaying ? <GiPauseButton /> : <FaPlay />}
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
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid #8b8b8b' }}>
                {/* <th style={tableHeaderStyle}>#</th> */}
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
              {tracks.map((row, index) => (
                <>
                  <tr
                    key={index}
                    className="labelRow"
                    onClick={() => songSelectHandler(row)}
                  >
                    {/* <td style={tableCellStyle} className="labelNumber">
                      {row.id}
                    </td> */}
                    <td style={tableCellStyle}>
                      <div className="musicLabelInfo">
                        <div className="musicLabelInfoImage">
                          <img src={row.coverUrl} alt="label Img" />
                        </div>
                        <div className="labelInfo">
                          <span className="mainTitleName">{row.title}</span>
                          <span className="subTitleName">
                            {row.description}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={tableCellStyle} className="labelAlbumName">
                      {row.artist}
                    </td>
                    <td style={tableCellStyle} className="labelTimeZone">
                      {row.time}
                    </td>
                  </tr>
                </>
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
