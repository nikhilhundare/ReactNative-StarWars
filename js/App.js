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
         navigationBarTitleImage = {HEADER_IMAGE_URL}
         navigationBarTitleImageStyle = {styles.logoStyle}
          navigationBarStyle = {styles.routerContainer}
          tintColor='white'
          key = "root"
        >
            <Scene key = "planetList" component = {PlanetsList} initial = {true} />
            <Scene key = "planetDetails" component = {PlanetsDetails}  />
            <Scene key = "filmsDetails" component = {FilmsDetails} />
            <Scene key = "actorsDetails" component = {ActorDetails} />
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
  logoStyle: {
    height: 80,
    width: 130,
    resizeMode:'contain',
    top:-50,
    position:'absolute',
  },
  leftButton: {
    color:'#fff',
  }
});
export default App;
