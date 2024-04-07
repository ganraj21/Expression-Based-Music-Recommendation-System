import React, { useCallback, useContext, useEffect } from 'react';
import { PlayerContext } from '../../PlayerContext';
import { CgPlayTrackPrevO, CgPlayTrackNextO } from 'react-icons/cg';
import { GiPauseButton } from 'react-icons/gi';
import { BsFillPlayFill } from 'react-icons/bs';
import './NewPlayer.css';

const NewPlayer = () => {
  const {
    isPlaying,
    playerRef,
    playSongHandler,
    drawerOpen,
    tracks,
    currentTrack,
    setCurrentTrack,
    skipTrackHandler,
    songProgress,
    setSongProgress,
  } = useContext(PlayerContext);

  const iconStyles = {
    fontSize: 30,
    color: '#D2E8D4',
  };

  useEffect(() => {
    console.log(1);
    tracks.map((song) =>
      song === currentTrack ? (song.active = true) : (song.active = false)
    );
  }, [currentTrack, tracks, playerRef, isPlaying]);

  const getTime = (time) => {
    return `${Math.floor(time / 60)}:${
      Math.floor(time % 60) < 10
        ? String(Math.floor(time % 60)).padStart(2, '0')
        : Math.floor(time % 60)
    }`;
  };

  useEffect(() => {
    if (songProgress.percentAnimated === 100) {
      skipTrackHandler('next');
    }
    console.log(2);
  }, [songProgress, skipTrackHandler]);

  const dragHandler = (e) => {
    playerRef.current.currentTime = e.target.value;
    setSongProgress({ ...songProgress, currentTime: e.target.value });
  };

  const animateTrackSlider = {
    transform: `translateX(${songProgress.percentAnimated}%)`,
  };
  const currentTrackStyle = {
    // background: `linear-gradient(to right, ${currentTrack.color[0]}, ${currentTrack.color[1]}`,
  };

  return (
    <>
      <div className="playerWrapperClass">
        <div className={`player ${drawerOpen ? 'drawer__shrink_in' : ''}`}>
          <div className="play-control">
            <CgPlayTrackPrevO
              style={iconStyles}
              onClick={() => skipTrackHandler('prev')}
              className="skip-back control-icon"
            />
            {isPlaying ? (
              <GiPauseButton
                onClick={playSongHandler}
                className="control-icon"
                style={iconStyles}
              />
            ) : (
              <BsFillPlayFill
                onClick={playSongHandler}
                className="play control-icon"
                style={iconStyles}
              />
            )}
            <CgPlayTrackNextO
              onClick={() => skipTrackHandler('next')}
              style={iconStyles}
              className="skip-forward control-icon"
            />
          </div>
          <div className="time-control">
            <p>{getTime(songProgress.currentTime)}</p>
            <div className="track" style={currentTrackStyle}>
              <input
                type="range"
                min={0}
                max={songProgress.duration || 0}
                value={songProgress.currentTime}
                onChange={dragHandler}
              />
              <div className="animate-track" style={animateTrackSlider} />
            </div>
            <p>
              {songProgress.duration ? getTime(songProgress.duration) : '0:00'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPlayer;
