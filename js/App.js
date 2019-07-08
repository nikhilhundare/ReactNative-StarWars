/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {View, StyleSheet} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Scene } from 'react-native-router-flux';

import rootReducer from './reducers/rootReducer';
import PlanetsList from './screens/PlanetsList';
import PlanetsDetails from './screens/PlanetsDetails';
import FilmsDetails from './screens/FilmsDetails';
import ActorDetails from './screens/ActorDetails';

const store = createStore(rootReducer, applyMiddleware(thunk));
const HEADER_IMAGE_URL = require('../common/assets/swLogo.png');

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.mainContainer}>
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
      </View>
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
