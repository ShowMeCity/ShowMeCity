export enum playBackRate {
    "x0.5" = 0.5,
    "x1" = 1,
    "x2" = 2,
}

export interface AppState {
    isLoading: boolean;
    isPlaying: boolean;
    isMute: boolean;
    currentCountry: string;
    currentCity: string;
    currentVideoId: string;
    playBackRate: playBackRate;
}

export interface PartialAppState extends Partial<AppState> { }

export interface MyContextProps {
    appState: AppState;
    updateState: (state: AppState) => void;
}
