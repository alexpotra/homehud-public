declare module 'rn-spotify-sdk' {
    export type PlaybackTrack = {
        name: string;
        artistName: string;
        albumCoverArtURL: string;
    }

    export type PlaybackState = {
        playing: boolean;
    }

    export type PlaybackMetadata = {
        prevTrack: PlaybackTrack;
        currentTrack: PlaybackTrack;
        nextTrack: PlaybackTrack;
    }


    type Spotify = {
        initialize: (options: any) => Promise<boolean>;
        isInitializedAsync: () => Promise<boolean>;

        login: () => Promise<boolean>;
        isLoggedInAsync: () => Promise<boolean>;

        getPlaybackMetadataAsync: () => Promise<PlaybackMetadata>;

        playURI: (uri: string, startIndex: number, startPosition: number) => Promise<void>;

        setPlaying: (playing: boolean) => Promise<void>;

        getPlaybackStateAsync: () => Promise<PlaybackState>;

        getVolumeAsync: () => Promise<number>;

        search: (query: string, types: string[]) => Promise<any>;



    }

    const spotify: Spotify;
    export default spotify;
}