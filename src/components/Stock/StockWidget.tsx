import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeRouter, Route, Link } from "react-router-native";
import { MMKV } from "react-native-mmkv";



const API_KEY = 'REDACTED';



const GRADIENTS = {
    Increase: ['#2e2a2a', '#2e2a2a', '#2e2a2a', '#2e2a2a', '#2e2a2a'],
    Decrease: ['#2e2a2a', '#2e2a2a', '#2e2a2a', '#2e2a2a', '#2e2a2a'],
    Undefined: ['#2e2a2a', '#2e2a2a', '#2e2a2a', '#2e2a2a', '#2e2a2a'],
};

type Stock = {
    c: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
    ipoCalendar: {
        symbol: string;
        date: string;
        name: string;
        status: string;
        price: string;
        numberOfShares: number;
    }[];
}

function getGradient(stock: Stock | undefined) {

    if (stock != undefined && (stock.c - stock.pc) > 0) {
        return GRADIENTS.Increase;
    }
    if (stock != undefined && (stock.c - stock.pc) < 0) {
        return GRADIENTS.Decrease;
    }
    return GRADIENTS.Undefined;
}
function getColor(stock: Stock | undefined) {
    if (stock != undefined && (stock.c - stock.pc) > 0) {
        return 'green';
    }
    if (stock != undefined && (stock.c - stock.pc) < 0) {
        return 'red';
    }
    return 'grey';
}

function StockWidget() {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [index, setIndex] = useState(0);
    const STOCK_LIST = JSON.parse(MMKV.getString('stocklist') ?? '["MSFT", "FB", "TSLA", "GOF"]');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIndex((index + 1) % STOCK_LIST.length)
        }, 2000);

        return () => {
            clearTimeout(timeout);
        };
    });

    useEffect(() => {
        const stockResults: Stock[] = [];
        for (let index = 0; index < STOCK_LIST.length; index++) {
            fetch(
                `https://finnhub.io/api/v1/quote?symbol=${STOCK_LIST[index]}&token=${API_KEY}`,
            )
                .then((res) => res.json())
                .then((json) => {
                    stockResults[index] = json;
                    setStocks([...stockResults]);
                })
                .catch((reason) => {
                    console.error(`Unable to featch stock data ${reason}`);
                });
        }
    }, []);

    return (
        <LinearGradient colors={getGradient(stocks[index])} style={styles.view}>
            <Text style={{ color: getColor(stocks[index]), ...styles.name }}>
                {STOCK_LIST[index] ? STOCK_LIST[index] : '---'}
            </Text>
            <Text style={{ color: getColor(stocks[index]), ...styles.price }}>
                {'$' + (stocks[index] ? stocks[index].c.toFixed(2) : '---')}
            </Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 24,
        fontWeight: '500',
    },
    price: {
        fontSize: 64,
        fontWeight: '300',
        textShadowColor: 'black',
        textShadowRadius: 20,
    },
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 16,
    }
})

export default StockWidget;