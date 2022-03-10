
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import TimeWidget from './src/components/TimeWidget';
import WeatherWidget from './src/components/WeatherWidget';
import Widget from './src/components/Widget';
import KeepAwake from 'react-native-keep-awake';
import StockWidget from './src/components/Stock/StockWidget';
import StockSettings from './src/components/Stock/StockSettings';
import { NativeRouter, Route, Link } from "react-router-native";
import SpotifyWidget from './src/components/Spotify/SpotifyWidget';
import SpotifyExplore from './src/components/Spotify/SpotifyExplore';
import ListWidget from './src/components/ListWidget';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <NativeRouter>
      <StatusBar hidden />
      <Route exact path="/">
        <KeepAwake />
        <Grid>
          <Row>
            <TimeWidget />
          </Row>
          <Row>
            <Grid>
              <Row>
                <Widget>
                  <WeatherWidget />
                </Widget>
                <Widget>
                  <Link to={'/StockSettings'} style={{ width: '100%' }}>
                    <StockWidget />
                  </Link>
                </Widget>
                <Widget >
                  <Link to={'/SpotifyExplore'} style={{ width: '100%' }}>
                    <SpotifyWidget />
                  </Link>
                </Widget>
              </Row>
              <Row>
                <Widget>
                  <ListWidget />
                </Widget>
                <Widget />
                <Widget />
              </Row>
            </Grid>
          </Row>
        </Grid>
      </Route>
      <Route path={"/StockSettings"}>
        <StockSettings />
      </Route>
      <Route path={'/SpotifyExplore'}>
        <SpotifyExplore />
      </Route>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F2F2F2',
    height: '100%',
    alignItems: 'center',
  },
  top: {
    height: '50%',
    justifyContent: 'center',
  },
});

export default App;
