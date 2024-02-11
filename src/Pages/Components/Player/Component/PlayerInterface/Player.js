import React from 'react';
import PlayerControl from '../Main/PlayerControl';
import SeekControl from '../Main/SeekControl';
import './Player.css';
function Player({
  uiState,
  setUiState,
  songState,
  setSongState,
  audioRef,
  seekWidth,
}) {
  return (
    <div className="player">
      <PlayerControl
        uiState={uiState}
        songState={songState}
        setUiState={setUiState}
        setSongState={setSongState}
        audioRef={audioRef}
      />
      <SeekControl
        uiState={uiState}
        setUiState={setUiState}
        songState={songState}
        setSongState={setSongState}
        audioRef={audioRef}
        seekWidth={seekWidth}
      />
    </div>
  );
}

export default Player;
