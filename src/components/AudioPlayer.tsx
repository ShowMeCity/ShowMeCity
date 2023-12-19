import React, { useEffect, useState, useRef } from "react";
import IconPlayFill from "../styles/svg/PlayIcon";
import IconBackward from "../styles/svg/PreviousIcon";
import IconForward from "../styles/svg/NextIcon";
import { useContext } from "react";
import { MainStateContext } from "../App";
import { MyContextProps, radioInterface } from "../state/AppInteface";
import IconPause from "../styles/svg/PauseIcon";

const AudioPlayer = () => {
    const { appState }: MyContextProps = useContext(MainStateContext)!;
    const audioRef = useRef(new Audio());
    const [radios, setRadios] = useState<radioInterface[]>(appState.radios);
    const [currentIndex, setCurrentIndex] = useState<number>(Math.floor(Math.random() * radios.length));
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const control_holder_styles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    };

    const audio_text_styles: React.CSSProperties = {
        color: 'white',
        fontSize: '1rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
    };

    const div_button_holder_styles: React.CSSProperties = {
        color: 'white',
    };

    const button_styles: React.CSSProperties = {
        border: 'none',
        height: '40px',
        width: '40px',
        borderRadius: '5px',
        backgroundColor: 'rgba(0,0,0,0.0)',
        color: 'white',
        margin: '0px 5px',
        fontSize: '1rem',
        textAlign: 'center',
    };

    const onPlayPauseClick = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };

    const onPreviousClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? radios.length - 1 : prevIndex - 1));
    };

    const onNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === radios.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const currentRadio = radios[currentIndex];
        audioRef.current.src = currentRadio ? currentRadio.src : "";

        if (isPlaying) {
            audioRef.current.play();
        }
    }, [currentIndex, radios, isPlaying]);

    useEffect(() => {
        setRadios(appState.radios);
    }, [appState.radios]);

    return (
        <>
            <div style={control_holder_styles}>
                <center style={audio_text_styles}>
                    {radios.length === 0 ? "Default Radio" : radios[currentIndex]?.stationName}
                </center>
                <div style={div_button_holder_styles}>
                    <button id="play_pause_button" style={button_styles} onClick={onPreviousClick}>
                        <IconBackward />
                    </button>
                    <button id="mute_button" style={button_styles} onClick={onPlayPauseClick}>
                        {isPlaying ? <IconPause /> : <IconPlayFill />}
                    </button>
                    <button id="unmute_button" style={button_styles} onClick={onNextClick}>
                        <IconForward />
                    </button>
                </div>
            </div>
        </>
    );
};

export default AudioPlayer;
