import React, { useEffect, useRef, useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { FaPlay, FaList } from 'react-icons/fa';
import { GiPauseButton } from 'react-icons/gi';
import { FaHeart } from 'react-icons/fa';
import { IoTimeOutline } from 'react-icons/io5';
import './PlaylistLayout.css';

const PlaylistLayout = ({ playlistData }) => {
  const [playbtn, isPlayBtn] = useState(0);
  const [likebtn, isLikeBtn] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const imageRef = useRef();

  // console.log(playlistData);  check point

  // useEffect(() => {
  //   // Ensure the image is loaded before extracting the color
  //   imageRef.current.onload = () => {
  //     const colorThief = new ColorThief();
  //     const [r, g, b] = colorThief.getColor(imageRef.current);
  //     setBackgroundColor(`rgb(${r}, ${g}, ${b})`);
  //   };
  // }, [playlistData]);

  const CardInfo = JSON.parse(localStorage.getItem('FPath'));
  if (playlistData === undefined) playlistData = CardInfo;

  const tableData = [
    {
      number: 1,
      title: {
        imageUri:
          'https://i.scdn.co/image/ab67616d00004851e810a88d506b30bdc0935247',
        mainTitle: 'Raabta',
        subTitle: 'Pritam, Arijit Singh',
      },
      album: 'Agent Vinod',
      time: '3:30',
    },
    {
      number: 2,
      title: {
        imageUri:
          'https://i.scdn.co/image/ab67616d000048515f3ede47954a93aa03efe5f9',
        mainTitle: 'Arjan Vailly',
        subTitle: 'Manan Bhardwaj, Bhupinder Babbal',
      },
      album: 'ANIMAL',
      time: '4:15',
    },
    {
      number: 3,
      title: {
        imageUri:
          'https://i.scdn.co/image/ab67616d00004851471b7e4f9c2fcf92d4f1e5c1',
        mainTitle: 'Sapna Jahan (From "Brothers")',
        subTitle: 'Ajay-Atul,Sonu Nigam,Neeti Mohan',
      },
      album: 'Sapna Jahan (From "Brothers")',
      time: '2:50',
    },
    {
      number: 4,
      title: {
        imageUri:
          'https://i.scdn.co/image/ab67616d000048514a60872ae145776164540a7f',
        mainTitle: 'Heeriye (feat. Arijit Singh)',
        subTitle: 'Jasleen Royal,Arijit Singh,Harrykahanhai',
      },
      album: 'Heeriye (feat. Arijit Singh)',
      time: '4:30',
    },
    // Add more data as needed
  ];
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
          <span
            className="playPauseIcon"
            onClick={() => {
              isPlayBtn(!playbtn);
            }}
          >
            {playbtn ? <GiPauseButton /> : <FaPlay />}
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