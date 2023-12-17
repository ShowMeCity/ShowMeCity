import React, { useState } from "react";
import AudioControls from "./AudioControls";
import "./css/audioplayer.css";

export default function AudioPlayer({ tracks }) {
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    function togglePlay() {
        const audioPlayer = document.getElementById("audio-player");
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
        setIsPlaying(!isPlaying);
    }

    async function resetPlayer() {
        try {
            if (isPlaying) {
                const audioPlayer = document.getElementById("audio-player");

               audioPlayer.onloadstart = () => {
                    console.log("onloadstart");
                    document.getElementById("play-pause-btn").disabled = true;
                    document.getElementById("track-name").innerHTML = "Loading";

                }

                audioPlayer.onloadedmetadata = () => {
                    console.log("onloadedmetadata");
                    const trackName =  tracks[trackIndex]?.stationName;
                
                    document.getElementById("track-name").innerHTML = trackName===undefined?"No Radio":trackName;
                    document.getElementById("play-pause-btn").disabled = false;

                }

                await audioPlayer.pause();
                audioPlayer.play();
                console.log("reset");
            }
        } catch (e) {
            console.log("Error in APlayer");
        }
    }

    function nextTrack() {
        setTrackIndex((oldIndex) => (oldIndex + 1) % tracks.length);
        resetPlayer();
    }

    function prevTrack() {
        setTrackIndex((oldIndex) => (oldIndex - 1 + tracks.length) % tracks.length);
        resetPlayer();
    }

    return (
        <>
            <div className="audio-player">
                <div className="track-info">
                    <span className="track-name" id="track-name">{tracks[trackIndex]?.stationName}</span>
                </div>

                <audio src={tracks[trackIndex]?.src} id="audio-player" />
                <AudioControls
                    isPlaying={isPlaying}
                    onPlayPauseClick={togglePlay}
                    onPrevClick={prevTrack}
                    onNextClick={nextTrack}
                />
            </div>
        </>
    );
}