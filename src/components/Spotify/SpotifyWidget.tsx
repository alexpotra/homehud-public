
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, BackHandler, SafeAreaView, StyleSheet, Text, TouchableHighlight, View, Button } from "react-native";
import Spotify, { PlaybackMetadata, PlaybackTrack } from 'rn-spotify-sdk';

function SpotifyWidget() {
    const [spotifyInitialized, setSpotifyInitialized] = useState(false);
    const [spotifyLoggedIn, setSpotifyLoggedIn] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<PlaybackTrack>();
    const [isPlaying, setIsPlaying] = useState(false);
    const handlePress = useCallback(async () => {
        if (!isPlaying && !currentTrack) {
            Spotify.playURI('spotify:track:6rqhFgbbKwnb9MLmUQDhG6', 0, 0);
        }

        Spotify.setPlaying(!isPlaying).then(() => {
            refreshTrackMetadata();
            setIsPlaying(!isPlaying);
        }).catch((reason) => {
            console.error(`Playback not started ${reason.toString()}`);
        });
    }, [isPlaying, currentTrack]);

    async function initializeIfNeeded() {
        // initialize Spotify if it hasn't been initialized yet
        if (!await Spotify.isInitializedAsync()) {
            // initialize spotify
            const spotifyOptions = {
                "clientID": "REDACTED",
                "sessionUserDefaultsKey": "SpotifySession",
                "redirectURL": "http://localhost:3000",
                "scopes": ["user-read-private", "playlist-read", "playlist-read-private", "streaming"],
            };
            const loggedIn = await Spotify.initialize(spotifyOptions);
            // update UI state
            setSpotifyInitialized(true);
            setSpotifyLoggedIn(loggedIn);
        }
        else {
            // update UI state
            setSpotifyInitialized(true);
            // handle logged in
            if (await Spotify.isLoggedInAsync()) {
                setSpotifyLoggedIn(true);
            }
        }

        refreshTrackMetadata();
    }

    async function refreshTrackMetadata() {
        try {
            setTimeout(async () => {
                const metadata = await Spotify.getPlaybackMetadataAsync();
                console.warn(`Track metadata: ${metadata ? JSON.stringify(metadata) : 'undefned'}`);
                metadata && setCurrentTrack(metadata.currentTrack);
            }, 500);
        } catch (error) {
            console.error(`Unable to fetch track metadata: ${error.toString()}`);
        }
    }

    function spotifyLoginButtonWasPressed() {
        // log into Spotify
        Spotify.login().then((loggedIn: boolean) => {
            if (loggedIn) {
                // logged in
                setSpotifyLoggedIn(true);
            }
            else {
                // cancelled
            }
        }).catch((error: Error) => {
            // error
            Alert.alert("Error", error.message);
        });
    }

    useEffect(() => {
        initializeIfNeeded();
    }, []);

    useEffect(() => {
        refreshTrackMetadata();
    }, []);

    if (!spotifyInitialized) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={true} style={styles.loadIndicator}>
                </ActivityIndicator>
                <Text style={styles.loadMessage}>
                    Loading...
                </Text>
            </View>
        );
    }
    else if (!spotifyLoggedIn) {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>
                    Hey! You! Log into your spotify
                </Text>
                <TouchableHighlight onPress={spotifyLoginButtonWasPressed} style={styles.spotifyLoginButton}>
                    <Text style={styles.spotifyLoginButtonText}>Log into Spotify</Text>
                </TouchableHighlight>
            </View>
        );
    } else {
        return (
            <SafeAreaView style={styles.view}>
                <View style={styles.container}>
                    <Text style={styles.trackInfo}>
                        {currentTrack ? currentTrack.name : "Nothing playing"}
                    </Text>
                </View>
                <View>
                    <Button title={isPlaying ? "PAUSE" : "PLAY"} color='#FFFFFF' onPress={handlePress}></Button>
                </View>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#191414',
        height: '100%',
        width: '100%',
    },

    container: {
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadIndicator: {
        //
    },
    loadMessage: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    spotifyLoginButton: {
        justifyContent: 'center',
        borderRadius: 18,
        backgroundColor: '#1DB954',
        overflow: 'hidden',
        width: 200,
        height: 40,
        margin: 20,
    },
    spotifyLoginButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },

    greeting: {
        fontSize: 20,
        textAlign: 'center',
    },

    trackInfo: {
        fontSize: 20,
        textAlign: 'center',
        color: '#1DB954',
        justifyContent: 'center',
    },

    pausePlay: {
        justifyContent: 'center',
        alignItems: 'center',

    },
});

export default SpotifyWidget;       