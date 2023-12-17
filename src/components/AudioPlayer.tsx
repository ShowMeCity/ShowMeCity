import React from "react";
import IconPlayFill from "../styles/svg/PlayIcon";
import IconBackward from "../styles/svg/PreviousIcon";
import IconForward from "../styles/svg/NextIcon";

const AudioPlayer = () => {

    const control_holder_styles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    }
    const audio_text_styles: React.CSSProperties = {
        color: 'white',
        fontSize: '1rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
    }

    const div_button_holder_styles: React.CSSProperties = {
        color: 'white',
    }

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
    }
    return (
        <>
            {/* <audio  /> */}
            <div style={control_holder_styles}>
                <center style={audio_text_styles} >Default Radio</center>
                <div style={div_button_holder_styles}>
                    <button id="play_pause_button" style={button_styles} ><IconBackward /> </button>
                    <button id="mute_button" style={button_styles}> <IconPlayFill /></button>
                    <button id="unmute_button" style={button_styles} > <IconForward /></button>
                </div>
            </div>

        </>
    );
}

export default AudioPlayer;
