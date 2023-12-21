import { Signal } from "@preact/signals-react";

export enum playBackRate {
    "x0.5" = 0.5,
    "x1" = 1,
    "x2" = 2,
}
export interface VideoInterface {
    country: string;
    city: string;
    currentVideoId: string;
    radios:radioInterface[];
}
export interface AppState {
    isLoading: boolean;
    isPlaying: boolean;
    isMute: boolean;
    currentCountry: string;
    currentCity: string;
    currentVideoId: string;
    isAudioPlaying: boolean;
    playBackRate: playBackRate;
    radios: radioInterface[] | [];
    currentPlayingIndex: number;
}

export interface PartialAppState extends Partial<AppState> { }

export interface MyContextProps {
    appState: AppState;
    updateState: React.Dispatch<React.SetStateAction<AppState>>;
    apiDatas: ApiData[];
}

export interface ApiData {
    country: string;
    cities: citiesInterface[] | [];
    radios: radioInterface[] | [];
}

export interface radioInterface {
    stationName: string | undefined;
    src: string | undefined;
}

export interface citiesInterface {
    city: string;
    orginalUrl: string[] | [];
}