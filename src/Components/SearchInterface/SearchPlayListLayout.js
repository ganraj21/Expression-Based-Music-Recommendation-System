import React, { useContext, useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { FaPlay, FaList } from 'react-icons/fa';
import { GiPauseButton } from 'react-icons/gi';
import { FaHeart } from 'react-icons/fa';
import { IoTimeOutline } from 'react-icons/io5';
import '../Interface/InnerTabulerPlaylist/PlaylistLayout.css';
import { MdPlaylistAdd, MdPlaylistAddCheck } from 'react-icons/md';
import { PlayerContext } from '../../PlayerContext';
import { SpotifyMusicContext } from '../../SpotifyMusicContext';

const SearchPlayListLayout = ({ playlistData }) => {
  const [likebtn, isLikeBtn] = useState(0);
  const [addPlaylist, isAddPlaylist] = useState(0);
  const { tracks } = useContext(SpotifyMusicContext);
  const {
    setCurrentTrack,
    playerRef,
    isPlaying,
    setIsPlaying,
    currentTrack,
    playSongHandler,
  } = useContext(PlayerContext);

  const songSelectHandler = async (row) => {
    await setCurrentTrack(row);
    console.log(row);
    if (!isPlaying) {
      setIsPlaying(true);
      playerRef.current.play();
    }
    playlistData.map((song) =>
      song === row ? (song.active = true) : (song.active = false)
    );
    if (isPlaying) playerRef.current.play();
  };

  console.log(playlistData);
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
                tracks[0]?.album?.images[0].url ||
                `https://source.unsplash.com/175x175/?${'happy'}`
              }
              class="img-fluid rounded-top"
              alt="card"
            />
          </div>
          <div className="cardInfo">
            <span>Playlist</span>
            <span className="headerTitle">
              <h1>{tracks[0]?.name}</h1>
            </span>
            <span className="subTitle">{tracks[0]?.album?.name}</span>
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
                <th style={tableHeaderStyle}>Album</th>
                <th style={tableHeaderStyle}>Artist</th>
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
                            src={row?.album?.images[0].url || row.coverUrl}
                            alt="label Img"
                          />
                        </div>
                        <div className="labelInfo">
                          <span className="mainTitleName">
                            {row?.name || row?.title}
                          </span>
                          <span className="subTitleName">
                            {row?.album?.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={tableCellStyle} className="labelAlbumName">
                      {row?.album?.name}
                    </td>
                    <td style={tableCellStyle} className="labelAlbumName">
                      {row?.album?.artists[0].name}
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

export default SearchPlayListLayout;

SearchPlayListLayout.defaultProps = {
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
