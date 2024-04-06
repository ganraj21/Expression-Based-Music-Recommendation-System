import React, { useContext, useRef, useState } from 'react';
import SongInfo from './Component/Main/SongInfo';
import Player from './Component/PlayerInterface/Player';
import { MusicContext } from '../../MusicContext';

const NewPlayer = () => {
  const { songData, playerController, songPlay } = useContext(MusicContext);

  const [uiState, setUiState] = useState({
    aboutShown: false,
    libraryShown: false,
    libraryPinned: false,
    coverSpinning: false,
    songPlaying: false,
    seekWidth: 0,
  });

  const [songState, setSongState] = useState({
    currentSong: songData.length > 0 ? [songData[0]] : [], // Ensure songData has at least one element
    isPlaying: false,
    elapsed: 0,
    duration: 0,
  });

  const audioRef = useRef(null);

  const songEndHandler = async () => {
    let currentIndex = songData.findIndex(
      (song) => song === songState.currentSong[0]
    );
    await setSongState({
      ...songState,
      currentSong: [songData[(currentIndex + 1) % songData.length]],
    });
    audioRef.current.play();
  };

  const songInfoHandler = (e) => {
    const elapsed = e.target.currentTime;
    const duration = e.target.duration;
    setSongState({
      ...songState,
      duration: duration,
      elapsed: elapsed,
    });
  };

  return (
    <>
      <div className="playerWrapperClass">
        <div
          className={`app__wrapper ${
            uiState.darkMode ? 'dark-mode' : 'light-mode'
          }`}
          style={{
            backdropFilter: `${
              uiState.libraryShown || uiState.aboutShown
                ? 'none'
                : 'blur(1.5rem)'
            }`,
            WebkitBackdropFilter: `${
              uiState.libraryShown || uiState.aboutShown
                ? 'none'
                : 'blur(1.5rem)'
            }`,
          }}
        >
          <SongInfo songState={songState} />
          <Player
            uiState={uiState}
            setUiState={setUiState}
            audioRef={audioRef}
            songState={songState}
            setSongState={setSongState}
          />
          {songState.currentSong.length > 0 &&
            songState.currentSong[0].audio && ( // Ensure songData is available and currentSong[0] has the audio property
              <audio
                ref={audioRef}
                src={songState.currentSong[0].audio}
                onTimeUpdate={songInfoHandler}
                onLoadedMetadata={songInfoHandler}
                onEnded={songEndHandler}
              ></audio>
            )}
        </div>
      </div>
    </>
  );
};

export default NewPlayer;
