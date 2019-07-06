/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import PlanetsDetails from './PlanetsDetails';

const App = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <PlanetsDetails />
      </SafeAreaView>
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
