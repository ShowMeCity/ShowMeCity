import React from "react";
import CountrySelector from "./CountrySelector";
import YoutubeControls from "./YoutubeControls";
import AudioPlayer from "./AudioPlayer";
import "../styles/navigation_holder_main.css";

const Navigation = ({ className }: { className: string }) => {
    const styles: React.CSSProperties = {
        width: '400px',
        height: '130px !important',
        zIndex: 100,
        display: 'flex',
        padding: '10px',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0.7)',
    }

    return (

        <>
            <div style={styles} className={className} >
                <div>
                    <CountrySelector />
                    <YoutubeControls />
                </div>
                <hr />
                <AudioPlayer />
            </div>
           
        </>

    );
}

export default Navigation;