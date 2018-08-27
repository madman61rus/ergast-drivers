/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'
import configureStore from './src/redux/store'
let { store, persistor } = configureStore()
import {fetchDrivers} from './src/modules/drivers/actions';
import DriversPage from './src/modules/drivers/view';


export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <DriversPage />
        </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
