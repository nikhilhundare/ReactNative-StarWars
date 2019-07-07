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
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as planetActions from './actions/planetsAction.js';
import StarWarsFlatList from '../common/StarWarsFlatList.js';
import StarWarsDetailsScreen from '../common/StarWarsDetailsScreen.js';

const IMAGE_URL = require('../common/assets/orangePlanet.png');
const FILMS_IMAGE_URL = require('../common/assets/movies.png');
const NUMBER_OF_COLUMNS = 2;
const TYPE = 'FILMS_LIST';

const mapStateToProps = state => ({
  planetsDetails: state.planetsDetails.planetsDetailsData,
});
const mapDispatchToProps = dispatch => ({
  planetsActions: bindActionCreators(planetActions, dispatch)
});

class PlanetsDetails extends PureComponent {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.planetsActions.fetchPlanetsDetails();
  }

  render() {
        if(this.props.planetsDetails){
          const {
            name,
            population,
            diameter,
            climate,
            gravity,
          } = this.props.planetsDetails.planetsData;
          const detailsData = {
            name: name,
            subDetails: {
              population: population,
              diameter: diameter,
              climate: climate,
              gravity: gravity,
            },
          }
          return (
            <View style={styles.mainContainer}>
              <View style={styles.imageContainer}>
                <StarWarsDetailsScreen
                  dataSource={detailsData}
                  imageURL={IMAGE_URL}
                />
              </View>
              <View style={styles.filmsContainer}>
                <StarWarsFlatList
                    dataSource={this.props.planetsDetails.filmsData}
                    numColumns={NUMBER_OF_COLUMNS}
                    imageURL={FILMS_IMAGE_URL}
                    type={TYPE}
                />
              </View>
            </View>
          );
        } else {
          return <ActivityIndicator />
        }

  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 30,
  },
  imageContainer: {
    flex:0.2,
    flexDirection: 'row',
    justifyContent:'center',
  },
  filmsContainer: {
    flex: 0.8,
    marginTop: 10,
  },

});

export default connect (mapStateToProps, mapDispatchToProps)(PlanetsDetails);
