/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import rootReducer from './reducers/rootReducer';
import PlanetsList from './PlanetsList';
import PlanetsDetails from './PlanetsDetails';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.mainContainer}>
        <PlanetsDetails />
      </SafeAreaView>
    </Provider>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 30,
    backgroundColor:'black',
  },
  });
export default App;
