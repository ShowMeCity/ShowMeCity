import React from "react";
import IconForward from "./assets/svg/NextIcon";
import IconBackward from "./assets/svg/PreviousIcon";
import IconPlayFill from "./assets/svg/PlayIcon";
import IconPause from "./assets/svg/PauseIcon";

const AudioControls = ({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick }) => (
  <div className="audio-controls">
    <button type="button" className="prev" aria-label="Previous" onClick={onPrevClick}>
      <IconBackward />
    </button>
    {isPlaying ? (
      <button type="button" id="play-pause-btn" className="pause" onClick={() => onPlayPauseClick(false)} aria-label="Pause">
        <IconPause />
      </button>
    ) : (
      <button type="button" id="play-pause-btn" className="play" onClick={() => onPlayPauseClick(true)} aria-label="Play">
        <IconPlayFill />
      </button>
    )}
    <button type="button" className="next" aria-label="Next" onClick={onNextClick}>
      <IconForward />
    </button>
  </div>
);

export default AudioControls;
