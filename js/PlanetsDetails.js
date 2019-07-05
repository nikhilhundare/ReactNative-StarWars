import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const IMAGE_URL = require('../common/assets/planet.jpg');
const NUMBER_OF_COLUMNS = 2;
const PLANETS_URL = 'https://swapi.co/api/planets/';

export default class PlanetsDetails extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      planetList: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
        const swPlanetsListAPI = await fetch(PLANETS_URL);
        const swPlanetsListResult = await swPlanetsListAPI.json();
        this.setState({
          planetList: swPlanetsListResult.results,
          loading: false
        });
      } catch(err) {
          console.log("Error fetching data for Planets List", err);
      }
  }

  renderItem(data){
    return (
      <TouchableOpacity style={styles.planetListContainer}>
      <View style={styles.planetListItemContainer}>
          <Image source={IMAGE_URL}
              style={styles.filmsPlaceHolder}/>
          <Text style={styles.planetNameText}>{data.item.name}</Text>
          <Text style={styles.planetPopulationText}>{data.item.population}</Text>
          </View>
      </TouchableOpacity>
    );
  }

  render() {
        const { planetList, loading } = this.state;
        return (
          <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
              <View>
                <Text> Name of the Planet </Text>
                <Text> Population </Text>
                <Text> Diameter </Text>
                <Text> Climate </Text>
                <Text> Gravity </Text>
              </View>
              <Image source={IMAGE_URL} style={styles.planetPlaceHolder}/>
            </View>
            <View style={styles.filmsContainer}>
              <FlatList
                data={planetList}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.name}
                numColumns={NUMBER_OF_COLUMNS}
              />

            </View>
          </View>
        );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 30,
  },
  imageContainer: {
    flex:0.3,
    flexDirection: 'row',
  },
  filmsContainer: {
    flex: 0.7,
  },
  planetListContainer: {
    flex:1,
    flexDirection: 'column',
    margin: 1,
    borderRadius:10,
    borderWidth: 1,
    margin: 10,
  },
  planetPlaceHolder: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 200,
    width: 200,
  },
  filmsPlaceHolder: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 40,
    width: 40,
  },
  planetListItemContainer: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 20,
  },
  planetNameText: {
    fontSize: 16,
  },
  planetPopulationText: {
      fontSize: 10,
  },

});
