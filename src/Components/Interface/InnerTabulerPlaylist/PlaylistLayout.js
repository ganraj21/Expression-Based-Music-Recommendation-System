import React, { useContext, useEffect, useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { FaPlay, FaList } from 'react-icons/fa';
import { GiPauseButton } from 'react-icons/gi';
import { FaHeart } from 'react-icons/fa';
import { IoTimeOutline } from 'react-icons/io5';
import './PlaylistLayout.css';
import { PlayerContext } from '../../../PlayerContext';
import { MdPlaylistAdd, MdPlaylistAddCheck } from 'react-icons/md';
// import { SpotifyMusicContext } from '../../../SpotifyMusicContext';
import { useLocation } from 'react-router-dom';
const PlaylistLayout = ({ playlistData }) => {
  const location = useLocation();
  const [likebtn, isLikeBtn] = useState(0);
  const [addPlaylist, isAddPlaylist] = useState(0);

  const { state } = location;
  const { e } = state;
  console.log(e);
  const {
    tracks,
    setTracks,
    setCurrentTrack,
    playerRef,
    isPlaying,
    setIsPlaying,
    currentTrack,
    playSongHandler,
  } = useContext(PlayerContext);

  const CardInfo = JSON.parse(localStorage.getItem('FPath'));
  if (CardInfo === undefined) setTracks(CardInfo);

  console.log(tracks);

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
                tracks[0]?.track?.album?.images[0].url ||
                tracks[0]?.coverUrl ||
                `https://source.unsplash.com/175x175/?${e.value}`
              }
              class="img-fluid rounded-top"
              alt="card"
            />
          </div>
          <div className="cardInfo">
            <span>Playlist</span>
            <span className="headerTitle">
              <h1>{tracks[0]?.title || tracks[0]?.track?.name}</h1>
            </span>
            <span className="subTitle">
              {tracks[0]?.artist || tracks[0]?.track?.album?.artists[0].name}
            </span>
          </div>
        </div>
        <div className="operationSection">
          <span className="playPauseIcon" onClick={playSongHandler}>
            {isPlaying ? <GiPauseButton /> : <FaPlay />}
          </span>
          <span
            className="loveIcon"
            onClick={() => {
              isAddPlaylist(!addPlaylist);
            }}
          >
            {addPlaylist ? <MdPlaylistAdd /> : <MdPlaylistAddCheck />}
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
                <th style={tableHeaderStyle}>Title</th>
                <th style={tableHeaderStyle}>Artist</th>
                <th style={tableHeaderStyle}>Album</th>
                <th style={tableHeaderStyle}>#</th>
                <th style={tableHeaderStyle}>
                  <span className="labeltimeIcon">
                    <IoTimeOutline />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tracks?.map((row, index) => (
                <>
                  <tr
                    key={index}
                    className="labelRow"
                    onClick={() => songSelectHandler(row)}
                  >
                    <td style={tableCellStyle}>
                      <div className="musicLabelInfo">
                        <div className="musicLabelInfoImage">
                          <img
                            src={
                              row?.track?.album?.images[0]?.url ||
                              row?.coverUrl ||
                              `https://source.unsplash.com/175x175/?${e?.value}`
                            }
                            alt="label Img"
                          />
                        </div>
                        <div className="labelInfo">
                          <span className="mainTitleName">
                            {row?.track?.name || row?.title}
                          </span>
                          <span className="subTitleName">
                            {row?.track?.album?.name}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td style={tableCellStyle} className="labelAlbumName">
                      {row?.artist || row?.track?.album?.artists[0].name}
                    </td>
                    <td style={tableCellStyle} className="labelAlbumName">
                      {row?.track?.album?.name}
                    </td>
                    <td
                      style={tableCellStyle}
                      className="labelLike"
                      onClick={() => {
                        isLikeBtn(!likebtn);
                      }}
                    >
                      {likebtn ? <IoMdHeartEmpty /> : <FaHeart />}
                    </td>
                    <td style={tableCellStyle} className="labelTimeZone">
                      {row?.time}
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

PlaylistLayout.defaultProps = {
  // You can specify default values here
  // For example:
  playlistData: {}, // Default playlist data, empty object
};
// Styles
const tableHeaderStyle = {
  padding: '10px',
  textAlign: 'left',
  color: '#a7a7a7',
};

const tableCellStyle = {
  padding: '10px',
};
