import React, { useEffect, useState, useContext } from "react";
import LoadingScreen from "./components/LoadingScreen";
import YouTubeVideoPlayer from "./components/YoutubeVideoPlayer";
import { AppState, MyContextProps, ApiData } from "./state/AppInteface";
import TransparentScreen from "./components/TransparentScreen";
import { Api } from "./connections/Api";
import NavWrapper from "./components/NavWrapper";

export const MainStateContext = React.createContext<MyContextProps | undefined>(undefined);



const App: React.FC = () => {
    const [state, setState] = useState<AppState>({
        isLoading: true,
        isMute: false,
        isPlaying: false,
        currentCountry: 'Switzerland',
        currentCity: 'Grindelwald',
        currentVideoId: 'b-WViLMs_4c',
        playBackRate: 1,
        radios: [{
            stationName: 'Loading',
            src: 'https://www.youtube.com/watch?v=i4sorpyHBg8',
        }],
        currentPlayingIndex: 0,
    });

    const [datas, setDatas] = useState<ApiData[]>([{ country: "Loading", cities: [], radios: [] }]);

    useEffect(() => {
        console.log("App Mounted");
        Api.get()
            .then((data) => {
                setDatas(data);
                console.log("Fresh Data", data);
                const randomCountryIndex = Math.floor(Math.random() * data.length);
                const randomCityIndex = Math.floor(Math.random() * data[randomCountryIndex].cities.length);
                const radios = data[randomCountryIndex].radios;

                setState(e => ({
                    ...e,
                    currentCountry: data[randomCountryIndex].country,
                    currentCity: data[randomCountryIndex].cities[randomCityIndex].city,
                    radios: radios,
                    currentVideoId: data[randomCountryIndex].cities[randomCityIndex].orginalUrl[
                        Math.random() * data[randomCountryIndex].cities[randomCityIndex].orginalUrl.length | 0
                    ],
                }));
                console.log("Random Country", data[randomCountryIndex]);
            })
            .catch((err) => {
                console.log(err);
                document.write(err);
            });
    }, []);

    const main_wrapper: React.CSSProperties = {
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
        position: 'relative',
    };

    const contextValue: MyContextProps = {
        appState: state,
        updateState: setState,
        apiDatas: datas,
    };

    return (
        <>
            <div style={main_wrapper}>
                <MainStateContext.Provider value={contextValue}>
                    {state.isLoading ? <LoadingScreen /> : <TransparentScreen />}
                    <YouTubeVideoPlayer />
                    <NavWrapper />
                </MainStateContext.Provider>
            </div>
        </>
    );
};

export default App;
