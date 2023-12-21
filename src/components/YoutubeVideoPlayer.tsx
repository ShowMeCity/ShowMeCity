import React, { useRef, useContext, useEffect, useCallback } from "react";
import Youtube, { YouTubeEvent } from "react-youtube";
import { videoSignal, playBackSignal, muteSignal, isPlaying, apiDatas } from "../App";
import { computed, signal, effect } from "@preact/signals-react";

const videoPlayerSignal = signal<Youtube | undefined>(undefined);

// const videoPlayer = signal<Youtube
const YoutubeVideoPlayer: React.FC = () => {
    const playerRef = useRef<any>();

    useEffect(() => {
        toggleMute()
    }, [getComputedMutestatus.value])

    useEffect(() => {
        changePlayBackRate(getComputedPlayBackRate.value);
    }, [getComputedPlayBackRate.value])

    useEffect(() => {
        playNextVideo(getComputedVideoSignal.value[0].currentVideoId)
    }, [getComputedVideoSignal.value[0].currentVideoId])

    useEffect(() => {
        if (getComputedVideoPlayer.value === undefined) return
        console.log("videoPlayerSignal", getComputedVideoPlayer.value)
        playNextVideo(getComputedVideoSignal.value[0].currentVideoId)
    }, [getComputedVideoPlayer.value === undefined]);

    return (
        <div style={youtubeStyle}>
            <Youtube videoId={getComputedVideoSignal.value ? getComputedVideoSignal.value[0].currentVideoId : "qPgWV8Rxemo"} style={youtubeStyle} opts={opts} onReady={(e) => onReady(e, playerRef)} onStateChange={e => onStateChange(e, playerRef)} />
        </div>);
};

/* YoutubeVideoPlayer Component End Here */

const getComputedVideoSignal = computed(() => {
    return videoSignal.value;
});

const youtubeStyle: React.CSSProperties = {
    height: "100vh",
    width: "100%",
    scale: "1.2"
}
const getComputedPlayBackRate = computed(() => {
    return playBackSignal.value;
});

const getComputedVideoId = computed(() => {
    return getComputedVideoSignal.value[0].currentVideoId;
});

const getComputedVideoPlayer = computed(() => {
    return videoPlayerSignal.value;
});

const onReady = (e: YouTubeEvent, playerRef: React.MutableRefObject<any>) => {
    playerRef.current = e.target;
    videoPlayerSignal.value = e.target;
    const computedVideoPlayer = getComputedVideoPlayer.value;
    if (computedVideoPlayer) {
        playerRef.current.setPlaybackQuality('hd1080');
    }
}

const onStateChange = (e: YouTubeEvent, playerRef: React.MutableRefObject<any>) => {
    switch (e.data) {
        case -1:
            isPlaying.value = false;
            break
        case 1:
            isPlaying.value = true;
            break;
        case 3:
            isPlaying.value = false;
            break;
        default:
            isPlaying.value = false;
            break;

    }
}




const toggleMute = () => {
    try {
        const computedVideoPlayer = getComputedVideoPlayer.value as Youtube;
        if (computedVideoPlayer) {
            if (getComputedMutestatus.value) {
                computedVideoPlayer.mute();
            } else {
                computedVideoPlayer.unMute();
            }
        }
    } catch (e) {
        console.log(e);
    }
};

const getComputedMutestatus = computed(() => {
    return muteSignal.value;
});

const changePlayBackRate = (rate: number) => {
    try {
        if (getComputedVideoPlayer.value === undefined) return
        getComputedVideoPlayer.value.setPlaybackRate(rate);
    } catch (e) {
        console.log("playbackrate error", e)
    }
};

const playNextVideo = (url: string) => {
    try {
        if (getComputedVideoPlayer.value === undefined) return
        getComputedVideoPlayer.value.loadVideoById(url);
    } catch (e) {
        console.log("Error play next video", e)
    }
};




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
    origin: 'https://show-me-city.vercel.app/',
}
const opts = {
    height: '100%',
    width: '100%',
    playerVars: playerVars,
}

export default YoutubeVideoPlayer;
