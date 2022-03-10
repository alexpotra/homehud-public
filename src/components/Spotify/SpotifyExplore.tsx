import { Text } from "native-base";
import React, { useCallback } from "react";
import { Button, InputAccessoryView, StyleSheet, TextInput, View } from "react-native";
import { Col, Grid } from "react-native-easy-grid";
import { useHistory } from "react-router-native";
import Spotify from 'rn-spotify-sdk';

function SpotifyExplore() {
    const history = useHistory();
    const handleSearchPress = useCallback(async () => {

    }, []);
    const handleBackPress = useCallback(async () => {
        history.goBack();
    }, []);

    return (
        <Grid style={styles.background}>
            <Col>
                <View style={styles.backButton}>
                    <Button title={"Back"} onPress={handleBackPress} color='#1DB954' />
                </View>
            </Col>
            <Col>
                <View style={styles.homeView}>
                    <Text style={styles.home}>
                        {'Spotify'}
                    </Text>
                    <TextInput
                        style={styles.searchInput}
                        onChangeText={async (text) => {
                            Spotify.search(text, ['album', 'artist', 'playlist', 'track']).then((results) => {
                                console.warn(JSON.stringify(results));
                            }).catch((error) => {
                                console.error(error.toString());
                            })
                        }}
                        placeholder="Search Spotify..."
                        placeholderTextColor="#365A43"
                        keyboardType='default'
                        textAlign='center'
                        autoCapitalize='characters'
                    />
                </View>
            </Col>
            <Col>
                <View style={styles.searchButton}>
                    <Button title={"Search"} onPress={handleSearchPress} color='#1DB954' />
                </View>
            </Col>
        </Grid>
    )
}
const styles = StyleSheet.create({
    background: {
        backgroundColor: "#191414",
        height: '100%',
        width: '100%',
    },
    searchButton: {
        width: '100%',
        paddingLeft: 230,
        paddingTop: 30,
    },
    homeView: {
        alignItems: 'center',
        width: '100%',
        paddingTop: 30,
    },
    home: {
        color: '#1DB954',
        fontSize: 50,
        fontWeight: '600',
    },
    backButton: {
        width: '100%',
        paddingRight: 230,
        paddingTop: 30,
    },
    searchInput: {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 30,
        color: '#1DB954',
    },
})

export default SpotifyExplore;