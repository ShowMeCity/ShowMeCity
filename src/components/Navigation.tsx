import React from "react";
import CountrySelector from "./CountrySelector";
import YoutubeControls from "./YoutubeControls";
import AudioPlayer from "./AudioPlayer";

const Navigation = () => {
    const styles: React.CSSProperties = {
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        zIndex: 100,
        display: 'flex',
        padding: '10px',
        borderRadius: '5px',
        justifyContent: 'space-between',
        gap: '10px',
        backgroundColor: 'rgba(0,0,0,0.7)',
    }
    return (
        <div style={styles} >
            <div>
                <CountrySelector />
                <YoutubeControls  />
            </div>
            <hr/>
            <AudioPlayer />
        </div>
    );
}

export default Navigation;