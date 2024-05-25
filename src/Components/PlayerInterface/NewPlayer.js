import React, { useContext, useEffect } from 'react';
import { PlayerContext } from '../../PlayerContext';
import { Song } from './Song';
import {
  IoPlaySkipBackOutline,
  IoPlaySkipForwardOutline,
} from 'react-icons/io5';
import { GiPauseButton } from 'react-icons/gi';
import { FaPlay } from 'react-icons/fa';
import { LuListMusic } from 'react-icons/lu';
import './NewPlayer.css';
import { SpotifyMusicContext } from '../../SpotifyMusicContext';

const NewPlayer = () => {
  const {
    isPlaying,
    playerRef,
    playSongHandler,
    drawerOpen,
    tracks,
    currentTrack,
    skipTrackHandler,
    songProgress,
    setSongProgress,
  } = useContext(PlayerContext);

  // const { tracks } = useContext(SpotifyMusicContext);

  const iconStyles = {
    fontSize: 24,
    color: '#D2E8D4',
  };

  console.log(tracks);
  console.log(currentTrack);

  useEffect(() => {
    tracks.map((song) => {
      song === currentTrack ? (song.active = true) : (song.active = false);
    });
  }, [currentTrack, tracks, playerRef, isPlaying]);

  console.log(currentTrack);

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
          <div className="songThumbnail">
            <Song />
          </div>
          <div className="playerContainer">
            <div className="play-control">
              <LuListMusic style={iconStyles} />
              <IoPlaySkipBackOutline
                style={iconStyles}
                onClick={() => skipTrackHandler('prev')}
                className="skip-back control-icon"
              />
              {isPlaying ? (
                <GiPauseButton
                  onClick={playSongHandler}
                  className="control-icon"
                  style={{ fontSize: '21px', width: '30px' }}
                />
              ) : (
                <FaPlay
                  onClick={playSongHandler}
                  className="play control-icon"
                  style={{ fontSize: '18px', width: '30px' }}
                />
              )}
              <IoPlaySkipForwardOutline
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
                {songProgress.duration
                  ? getTime(songProgress.duration)
                  : '0:00'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPlayer;
