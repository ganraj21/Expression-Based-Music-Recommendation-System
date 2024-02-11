import React from 'react';
import { RiPlayFill } from 'react-icons/ri';
import { IoIosPause } from 'react-icons/io';

function PlayerPlayButton({
  uiState,
  setUiState,
  songState,
  audioRef,
  setSongState,
}) {
  const currentPalette = songState.currentSong[0].palette;
  const playPauseHandler = () => {
    setUiState({ ...uiState, songPlaying: !uiState.songPlaying });
    if (uiState.songPlaying === true) {
      audioRef.current.pause();
      setSongState({ ...songState, isPlaying: false });
    } else {
      audioRef.current.play();
      setSongState({ ...songState, isPlaying: true });
    }
  };

  const PlayPauseButton = () => {
    if (uiState.songPlaying) {
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
