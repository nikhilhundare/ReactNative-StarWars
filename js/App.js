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
import { Router, Scene } from 'react-native-router-flux';
//import { createStackNavigator, createAppContainer } from 'react-navigation';

import rootReducer from './reducers/rootReducer';
import PlanetsList from './PlanetsList';
import PlanetsDetails from './PlanetsDetails';
import FilmsDetails from './FilmsDetails';
import ActorDetails from './ActorDetails';

const store = createStore(rootReducer, applyMiddleware(thunk));
const HEADER_IMAGE_URL = require('../common/assets/swLogo.png');

const App = () => {
  // const stackNavigator = createStackNavigator({
  //     PlanetsList: {
  //       screen: PlanetsList
  //     }
  //   });
  //   const MainNavigator = createAppContainer(stackNavigator);
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.mainContainer}>
      <Router sceneStyle = {styles.routerContainer}>
         <Scene
          navigationBarStyle = {styles.routerContainer}
          key = "root"
        >
            <Scene key = "planetList" component = {PlanetsList} title = "Planets List" initial = {true} />
            <Scene key = "planetDetails" component = {PlanetsDetails} title = "Planet Details" />
            <Scene key = "filmsDetails" component = {FilmsDetails} title = "Films Details" />
            <Scene key = "actorsDetails" component = {ActorDetails} title = "Actors Details" />
         </Scene>
      </Router>
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
  routerContainer: {
    backgroundColor:'black',
  },
  navBarImageStyle: {
    backgroundColor:'black',
    height: 100,
  },
});
export default App;
