import { Input } from 'native-base';
import React, { useCallback, useState } from 'react';
import { ProgressViewIOSComponent, StatusBar, StyleSheet, Text, View, SafeAreaView, TextInput, Button, Linking, Alert } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { NativeRouter, Route, Link, useHistory } from "react-router-native";
import StockWidget from './StockWidget';
import { MMKV } from 'react-native-mmkv';



const titleConfig = {
    title: 'Stock Settings',
    style: 'light-content'
};

function StockSettings() {
    const history = useHistory();
    const leftButtonConfig = {
        title: 'Back',
        handler: () => {
            history.goBack();
        }
    };
    const rightButtonConfig = {
        title: 'Save',
        handler: () => {
            MMKV.set('stocklist', JSON.stringify(stocks));
            history.goBack();
        }
    }

    const [stocks, setStocks] = useState<string[]>(JSON.parse(MMKV.getString('stocklist') ?? '["MSFT", "FB", "TSLA", "GOF"]'));

    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL("https://www.nasdaq.com");
        if (supported) {
            await Linking.openURL("https://www.nasdaq.com");
        } else {
            Alert.alert('Cannot open this URL');
        }
    }, ["https://www.nasdaq.com"]);


    return (
        <SafeAreaView>
            <NavigationBar
                title={titleConfig}
                leftButton={leftButtonConfig}
                rightButton={rightButtonConfig}
            />
            {stocks.map((value, index) => <View key={index} style={styles.viewHeader}>
                <Text style={styles.header}>
                    {`Stock #${index + 1}:`}
                </Text>
                <TextInput
                    style={styles.input1}
                    onChangeText={(text) => {
                        const newStocks = [...stocks];
                        newStocks[index] = text;
                        setStocks(newStocks);
                    }}
                    value={value}
                    placeholder="Insert stock code here"
                    keyboardType='default'
                    textAlign='center'
                    autoCapitalize='characters'
                />
            </View>
            )}
            <View style={styles.moreInfo}>
                <Button
                    title="More Information..."
                    onPress={handlePress}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 100,
        fontSize: 25,
        color: 'grey',
    },
    viewHeader: {
        alignItems: 'center',
        width: '100%',
    },
    text1: {
        fontSize: 24,

    },
    input1: {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 30,
    },
    moreInfo: {
        marginTop: 400,
    }
})

export default StockSettings;