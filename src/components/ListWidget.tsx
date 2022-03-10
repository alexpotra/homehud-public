import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

function ListWidget() {

    return (
        <LinearGradient colors={['#2e2a2a', '#2e2a2a']} style={styles.titleContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {"To-Do List"}
                </Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16
    },
    title: {
        fontSize: 50,
        fontWeight: '500',
        textShadowColor: 'black',
        textShadowRadius: 20,
        color: 'grey',
    },
})

export default ListWidget;