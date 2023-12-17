import React, { useEffect, useRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { MainStateContext } from "@/App";
const VideoPlayer = ({ videoId, isMuted, setMuteToogleIcon }) => {
  let player = useRef();
  const context = React.useContext(MainStateContext);
  window.onload = function () {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    onYouTubeIframeAPIReady();
  };

  useEffect(() => {
    if (videoId !== null)
      player.current.loadVideoById(videoId);
  }, [videoId]);

  function onYouTubeIframeAPIReady() {
    console.log('onYouTubeIframeAPIReady')
    player.current = new YT.Player('video', {
      videoId: videoId,
      playerVars: {
        autoplay: '0',
        showinfo: '0',
        mute: '0',
        controls: '0',
        start: '50',
        disablekb: '1',
        enablejsapi: '1',
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': function (event) {
          if (event.data == 3) {
            document.querySelector("#video").style.display = "none";
          }

          if (event.data == 1) {
            document.querySelector("#video").style.display = "block";
          }

        }
      }
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }



  const onToggleMute = () => {
    if (isMuted) {
      player.current.unMute();
    } else {
      player.current.mute();
    }
    setMuteToogleIcon(!isMuted);
  };

  const changeSpeed = (speed) => {
    player.current.setPlaybackRate(speed);
  }



  return (
    <div ref={player} className="video" id="video">
    </div>
  );
}

export default VideoPlayer;
