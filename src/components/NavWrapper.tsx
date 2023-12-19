import React from "react";
import { useState } from "react";
import Navigation from "./Navigation";
import { MainStateContext } from "../App";
import { useContext } from "react";

const NavWrapper = () => {
    const { appState } = useContext(MainStateContext)!;
    const [isShow, setIsShow] = useState(false);
    const wrapperStyles: React.CSSProperties = {
        position: 'fixed',
        top: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 1000,
    }
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement;
        console.log(target.tagName);
        if (target.tagName !== 'DIV') return;
        setIsShow(!isShow);
    }

    console.log("NavWrapper Rendered");
    return (
        <div style={wrapperStyles} id="nav-click-div" onClick={e => handleClick(e)}>
            {
                isShow ?
                    <Navigation className="navigation_holder_main" />
                    :

                    <Navigation className={!appState.isPlaying ? "navigation_holder_main_close animation_audio" : "navigation_holder_main_close"} />
            }
        </div>
    );
}

export default NavWrapper;