import React from "react";
import { useState } from "react";
import Navigation from "./Navigation";


const NavWrapper = () => {
    const [isShow, setIsShow] = useState(false);
    const wrapperStyles: React.CSSProperties = {
        position: 'fixed',
        top: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        justifyContent: 'center',
        padding: '10px 10px',
        zIndex: 1000,
    }
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement;
        if (target.tagName !== 'DIV') return;
        setIsShow(!isShow);
    }

    return (
        <div style={wrapperStyles} id="nav-click-div" onClick={e => handleClick(e)}>
            {
                isShow ?
                    <Navigation className="navigation_holder_main" />
                    :

                    <Navigation className={true ? "navigation_holder_main_close animation_audio" : "navigation_holder_main_close"} />
            }
        </div>
    );
}

export default NavWrapper;