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
        iv_load_policy: 3,
        origin: 'http://localhost:3000',
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
    }

    const onReady = (e: YouTubeEvent) => {
        playerRef.current = e.target;
        e.target.setPlaybackQuality('hd1080');
        // toggleMute();
    }

    const onStateChange = (e: YouTubeEvent) => {
        switch (e.data) {
            case -1:
                console.log('unstarted');
                updateState({...appState, isLoading: true, isPlaying: false });
                break;
            case 0:
                console.log('ended');
                updateState({ ...appState, isLoading: true, isPlaying: false, });
                break;
            case 1:
                console.log('playing');
                updateState({ ...appState, isLoading: false, isPlaying: true, });
                break;
            case 2:
                console.log('paused');
                updateState({ ...appState, isLoading: true, isPlaying: false });
                break;
            case 3:
                console.log('buffering');
                updateState({ ...appState, isLoading: true, isPlaying: false, });
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
        console.log('playNextVideo', url);
    }

    useEffect(() => {
        try {
            toggleMute();
        } catch (e) {
            console.log('Loading');
        }
    }, [appState.isMute])

    useEffect(()=>{
        try {
            playNextVideo(appState.currentVideoId);
        } catch (e) {
            console.log('Changing Video');
        }
    },[appState.currentVideoId])

    useEffect(() => {
        try {
            changePlayBackRate(appState.playBackRate);
        } catch (e) {
            console.log('Changing PlayBackRate');
        }
    }, [appState.playBackRate])


    return (<>
        <Youtube videoId={appState.currentVideoId} ref={playerRef}  opts={opts} onReady={onReady} onStateChange={onStateChange} style={videoStyles} />
    </>);
}

export default YoutubeVideoPlayer;