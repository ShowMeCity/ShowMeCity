import React, { useEffect, useState, useRef } from "react";
import IconPlayFill from "../styles/svg/PlayIcon";
import IconBackward from "../styles/svg/PreviousIcon";
import IconForward from "../styles/svg/NextIcon";
import IconPause from "../styles/svg/PauseIcon";
import { videoSignal } from "../App";
import { computed } from "@preact/signals-react";

const AudioPlayer = () => {
    const audioRef = useRef(new Audio());
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    console.log("audioPlayer"); 
    useEffect(() => {
        try {
            const currentRadio = getComputedVideoSignal.value[0].radios[currentIndex];
            if (audioRef.current && currentRadio && currentRadio.src) {
                audioRef.current.src = currentRadio.src;
                setCurrentIndex(0);
            }
        } catch (e) {
            console.error("Error setting audio source:", e);
        }
    }, [getComputedVideoSignal.value[0].radios]);

    useEffect(() => {
        try {
            if (audioRef.current) {
                isPlaying ? audioRef.current.play() : audioRef.current.pause();
            }
        } catch (e) {
            console.error("Error playing/pausing audio:", e);
        }
    }, [isPlaying]);

    useEffect(() => {
        try {
            const currentRadio = getComputedVideoSignal.value[0].radios[currentIndex];
            if (audioRef.current) {
                audioRef.current.src = currentRadio.src!;
                if (isPlaying) {
                    audioRef.current.play();
                } else {
                    audioRef.current.pause();
                }
            }
        } catch (e) {
            console.error("Error setting audio source and playing:", e);
        }
    }, [currentIndex]);

    const handlePlayPause = () => {
        if (getComputedVideoSignal.value[0].radios[currentIndex].src === "") {
            return setIsPlaying(false);
        }
        setIsPlaying((prevState) => !prevState);
    };
    const handleForward = () => {
        if (currentIndex < getComputedVideoSignal.value[0].radios.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const handleBackward = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        } else {
            setCurrentIndex(getComputedVideoSignal.value[0].radios.length - 1);
        }
    };

    return (
        <>
            <div style={styles.controlHolder}>
                <center style={styles.audioText}>
                    {getComputedVideoSignal.value[0].radios[currentIndex]?.stationName || "No Radio"}
                </center>
                <div style={styles.buttonHolder}>
                    <button id="backwardBtn" style={styles.button} onClick={handleBackward}>
                        <IconBackward />
                    </button>
                    <button id="playPauseBtn" style={styles.button} onClick={() => handlePlayPause()}>
                        {isPlaying ? <IconPause /> : <IconPlayFill />}
                    </button>
                    <button id="forwardBtn" style={styles.button} onClick={handleForward}>
                        <IconForward />
                    </button>
                </div>
            </div>
        </>
    );
};



const getComputedVideoSignal = computed(() => videoSignal.value);
interface audioStylesInterface {
    controlHolder: React.CSSProperties;
    audioText: React.CSSProperties;
    buttonHolder: React.CSSProperties;
    button: React.CSSProperties;
}


const styles: audioStylesInterface = {
    controlHolder: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    audioText: {
        color: "white",
        fontSize: "1rem",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "20px",
    },
    buttonHolder: {
        color: "white",
    },
    button: {
        border: "none",
        height: "40px",
        width: "40px",
        borderRadius: "5px",
        backgroundColor: "rgba(0,0,0,0.0)",
        color: "white",
        margin: "0px 5px",
        fontSize: "1rem",
        textAlign: "center",
    },
};

export default AudioPlayer;
