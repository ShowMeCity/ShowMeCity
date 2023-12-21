import React from "react";
import IconSoundOff from "../styles/svg/SoundOff";
import IconSoundOn from "../styles/svg/SoundOn";
import { playBackRate } from "../state/AppInteface"
import { playBackSignal, muteSignal } from "../App";
import { computed } from "@preact/signals-react";

const YoutubeControls = () => {

    return (
        <>
            <table style={table_styles}>
                <thead>
                    <tr>
                        <th style={merged_styles} colSpan={3}>Playback Rate</th>
                        <th style={th_styles}>Noise</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={td_th_styles}><button className="speed_btn" style={(datas.value == 0.5) ? button_styles_active : button_styles} onClick={() => handleChangePlayBackRate(0.5)}>x0.5</button></td>
                        <td style={td_th_styles}><button className="speed_btn" style={(datas.value == 1) ? button_styles_active : button_styles} onClick={() => handleChangePlayBackRate(1)}>x1</button></td>
                        <td style={td_th_styles}><button className="speed_btn" style={(datas.value == 2) ? button_styles_active : button_styles} onClick={() => handleChangePlayBackRate(2)}>x2</button></td>
                        <td style={td_th_styles}><button className="noise_btn" style={button_styles} onClick={() => toogleMute()} > {getMutestatus.value ? <IconSoundOff /> : <IconSoundOn />}</button></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

/* YoutubeControls Component End Here */


const toogleMute = () => {
    muteSignal.value = !muteSignal.value;
}
const getMutestatus = computed(() => {
    return muteSignal.value;
})

const handleChangePlayBackRate = (rate: playBackRate) => {
    playBackSignal.value = rate;
}

const datas = computed(() => {
    return playBackSignal.value;
})

const button_styles: React.CSSProperties = {
    border: 'none',
    height: '40px',
    width: '40px',
    borderRadius: '5px',
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: 'white',
    textAlign: 'center',
}

const button_styles_active: React.CSSProperties = {
    ...button_styles,
    backgroundColor: 'rgba(227, 172, 113,0.3)',
}
const table_styles: React.CSSProperties = {
    borderCollapse: 'collapse',
    border: 'none',
    color: 'silver',
    width: '200px',
}

const align_left: React.CSSProperties = {
    textAlign: 'left',
    paddingLeft: '5px',
}

const th_styles: React.CSSProperties = {
    fontSize: '0.8rem',
}

const td_th_styles: React.CSSProperties = {
    border: 'none',
    textAlign: 'center',
}

const merged_styles: React.CSSProperties = {
    ...align_left,
    ...th_styles,
}

export default YoutubeControls;