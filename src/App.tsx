import React, { useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import YouTubeVideoPlayer from "./components/YoutubeVideoPlayer";
import TransparentScreen from "./components/TransparentScreen";
import NavWrapper from "./components/NavWrapper";
import { effect, signal } from "@preact/signals-react";
import { Api } from "./connections/Api";
import { ApiData, VideoInterface } from "./state/AppInteface";


window.onload = () => {
    const buyMeACoffeeBtn = document.getElementById("bmc-wbtn");

    function simulateButtonClick() {
        console.log("Clicking on Buy Me A Coffee button");
        if (buyMeACoffeeBtn) {
            buyMeACoffeeBtn.click();
        }
    }
    // Initial click after 1 minute
    setTimeout(() => {
        simulateButtonClick();
        // Click again every 10 minutes
        setInterval(() => {
            simulateButtonClick();
        }, 10 * 60 * 1000); // 10 minutes in milliseconds
    }, 1 * 60 * 1000);
}


const App: React.FC = () => {
    return (
        <>
            <NavWrapper />
            {isPlaying.value ? <TransparentScreen /> : <LoadingScreen />}
            <YouTubeVideoPlayer />
        </>
    );
};

const initAppData: ApiData[] = [{
    country: "Loading...",
    cities: [{
        city: "Loading",
        orginalUrl: [],
    }],
    radios: [{
        stationName: "Loading",
        src: "error",
    }],
}];

const initVideoData: VideoInterface[] = [{
    country: "Loading",
    city: "Loading",
    currentVideoId: "Loading",
    radios: [{
        stationName: "Loading",
        src: ""
    }]
}];

export const apiDatas = signal<ApiData[]>(initAppData);
export const playBackSignal = signal<number>(1);
export const muteSignal = signal<boolean>(false);
export const videoSignal = signal<VideoInterface[]>(initVideoData);
export const radioIndex = signal<number>(0);
export const isPlaying = signal<boolean>(false);

const getRandomCity = (apiDatas: ApiData[]): VideoInterface => {
    const randomCountryIndex = Math.floor(Math.random() * apiDatas.length);
    const randomCityIndex = Math.floor(Math.random() * apiDatas[randomCountryIndex].cities.length);
    const randomCity = apiDatas[randomCountryIndex].cities[randomCityIndex];
    return {
        city: randomCity.city,
        country: apiDatas[randomCountryIndex].country,
        currentVideoId: randomCity.orginalUrl[Math.floor(Math.random() * randomCity.orginalUrl.length)],
        radios: apiDatas[randomCountryIndex].radios.length === 0 ? [{ stationName: "No Radio", src: "" }] : apiDatas[randomCountryIndex].radios
    };
};

const handleApiData = (res: ApiData[]) => {
    apiDatas.value = res;
    videoSignal.value = [getRandomCity(res)];
};

const handleError = (err: Error) => {
    console.error(err);
    // Handle error (e.g., display a user-friendly message)
    alert("Error: " + err.message);
};

effect(() => {
    Api.get()
        .then(handleApiData)
        .catch(handleError);
});

const main_wrapper: React.CSSProperties = {
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
    position: 'relative',
};

export default App;
