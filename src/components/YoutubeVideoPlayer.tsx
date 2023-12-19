import React, { useRef, useContext, useEffect } from "react";
import Youtube, { YouTubeEvent } from "react-youtube";
import { MainStateContext } from "../App";

const YoutubeVideoPlayer: React.FC = () => {
    const { appState, updateState } = useContext(MainStateContext)!;
    const playerRef = useRef<any>();
    const playerVars = {
        showinfo: 0,
        autoplay: 1,
        disablekb: 1,
        controls: 0,
        enablejsapi: 1,
        fs: 0,
        loop: 1,
        start: Math.random() * 50 + 40,
        iv_load_policy: 3,
        origin: 'http://localhost:5173',
    }
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: playerVars,
    }

    const videoStyles: React.CSSProperties = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: 0,
        scale: '1.3',
    }

    const onReady = (e: YouTubeEvent) => {
        playerRef.current = e.target;
        e.target.setPlaybackQuality('hd1080');
    }

    const onStateChange = (e: YouTubeEvent) => {
        const playerState = e.data;

        switch (playerState) {
            case -1:
                console.log('unstarted');
                updateState(prev => ({ ...prev, isLoading: true, isPlaying: false }));
                break;
            case 0:
                console.log('ended');
                updateState(prev => ({ ...prev, isLoading: true, isPlaying: false }));
                break;
            case 1:
                console.log('playing');
                updateState(prev => ({ ...prev, isLoading: false, isPlaying: true }));
                break;
            case 2:
                console.log('paused');
                updateState(prev => ({ ...prev, isLoading: true, isPlaying: false }));
                break;
            case 3:
                console.log('buffering');
                updateState(prev => ({ ...prev, isLoading: true, isPlaying: false }));
                break;
            default:
                console.log('default');
                break;
        }
    }


    const toggleMute = () => {

        if (playerRef.current.isMuted()) {
            playerRef.current.unMute();
        } else {
            playerRef.current.mute();
        }
    }

    const changePlayBackRate = (rate: number) => {
        playerRef.current.setPlaybackRate(rate);
    }


    const playNextVideo = (url: string) => {
        playerRef.current.loadVideoById(url);
    }

    useEffect(() => {
        console.log('Mute', appState.isMute);
        try {
            toggleMute();
        } catch (e) {
            console.log('Loading');
        }
    }, [appState.isMute])

    useEffect(() => {
        console.log('Changing Video', appState.currentVideoId);
        try {
            playNextVideo(appState.currentVideoId);
        } catch (e) {
            console.log('Changing Video');
        }
    }, [appState.currentVideoId])

    useEffect(() => {
        console.log('Changing PlayBackRate', appState.playBackRate);
        try {
            changePlayBackRate(appState.playBackRate);
        } catch (e) {
            console.log('Changing PlayBackRate');
        }
    }, [appState.playBackRate])

    console.log("YoutubeVideoPlayer Rendered");
    return (<>
        <Youtube videoId={appState.currentVideoId} ref={playerRef} opts={opts} onReady={onReady} onStateChange={onStateChange} style={videoStyles} />
    </>);
}

export default YoutubeVideoPlayer;