import React, { Component, Context, createContext } from "react";
import LoadingScreen from "./components/LoadingScreen";
import YouTubeVideoPlayer from "./components/YoutubeVideoPlayer";
import { AppState, MyContextProps, PartialAppState } from "./state/AppInteface";
import TransparentScreen from "./components/TransparentScreen";
import Navigation from "./components/Navigation";
export const MainStateContext = createContext<MyContextProps | undefined>(undefined);

class App extends Component {
    state: AppState;
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            isMute: false,
            isPlaying: false,
            currentCountry: 'USA',
            currentCity: 'New York',
            currentVideoId: 'i4sorpyHBg8',
            playBackRate: 1,
        }
    }

    updateState = (newState: PartialAppState) => {
        this.setState(newState);
    }
    render() {
        const contextValue: MyContextProps = {
            appState: this.state,
            updateState: this.updateState,
        };
        return (
            <>
                <MainStateContext.Provider value={contextValue}>
                    {this.state.isLoading ? <LoadingScreen /> : <TransparentScreen />}
                    <YouTubeVideoPlayer />
                    <Navigation />
                </MainStateContext.Provider>
            </>
        );
    }
}

export default App;