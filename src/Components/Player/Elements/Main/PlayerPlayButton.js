import React, { useContext, useEffect } from 'react';
import { RiPlayFill } from 'react-icons/ri';
import { IoIosPause } from 'react-icons/io';
import { MusicContext } from '../../../../MusicContext';

function PlayerPlayButton({
  uiState,
  setUiState,
  songState,
  audioRef,
  setSongState,
}) {
  const { playerController, songPlay } = useContext(MusicContext);

  const playPauseHandler = () => {
    playerController();
    setUiState({ ...uiState, songPlaying: !uiState.songPlaying });
    if (uiState.songPlaying === true) {
      audioRef.current.pause();
      setSongState({ ...songState, isPlaying: songPlay });
    } else {
      audioRef.current.play();
      setSongState({ ...songState, isPlaying: songPlay });
    }
  };

  const PlayPauseButton = () => {
    if (uiState.songPlaying || songPlay) {
      return (
        <IoIosPause className="player__control-icon player__control-icon--white" />
      );
    } else {
      return (
        <RiPlayFill className="player__control-icon player__control-icon--white" />
      );
    }
  };

  return (
    <div className="player__control--play-button" onClick={playPauseHandler}>
      <PlayPauseButton />
    </div>
  );
}

export default PlayerPlayButton;
