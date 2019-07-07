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
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as planetActions from './actions/planetsAction.js';

const IMAGE_URL = require('../common/assets/orangePlanet.png');
const FILMS_IMAGE_URL = require('../common/assets/movies.png');
const NUMBER_OF_COLUMNS = 2;

const mapStateToProps = state => ({
  planetsDetails: state.planetsDetails.planetsDetailsData,
});
const mapDispatchToProps = dispatch => ({
  planetsActions: bindActionCreators(planetActions, dispatch)
});

class PlanetsDetails extends PureComponent {
  constructor(props){
    super(props);
    this.renderFlatList = this.renderFlatList.bind(this);
  }

  componentDidMount() {
    this.props.planetsActions.fetchPlanetsDetails();
  }

  renderItem(data){
    return (
      <TouchableOpacity style={styles.planetListContainer}>
      <View style={styles.planetListItemContainer}>
          <Image source={FILMS_IMAGE_URL}
              style={styles.filmsPlaceHolder}/>
          <Text style={styles.planetNameText}>{data.item.title}</Text>
          <Text style={styles.planetPopulationText}>{data.item.title}</Text>
          </View>
      </TouchableOpacity>
    );
  }
  renderFlatList() {
    return (
      <View style={styles.filmsContainer}>
        <FlatList
          data={this.props.planetsDetails.filmsData}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.name}
          numColumns={NUMBER_OF_COLUMNS}
        />

      </View>
    );
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
          return (
            <View style={styles.mainContainer}>
              <View style={styles.imageContainer}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.planetHeading}> {name} </Text>
                  <Text style={styles.planetDetailsText}> {population} </Text>
                  <Text style={styles.planetDetailsText}> {diameter} </Text>
                  <Text style={styles.planetDetailsText}> {climate} </Text>
                  <Text style={styles.planetDetailsText}> {gravity} </Text>
                </View>
                <Image source={IMAGE_URL} style={styles.planetPlaceHolder}/>
              </View>
              <View style={styles.filmsContainer}>
                <FlatList
                  data={this.props.planetsDetails.filmsData}
                  renderItem={this.renderItem}
                  keyExtractor={(item) => item.name}
                  numColumns={NUMBER_OF_COLUMNS}
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
    flex:0.3,
    flexDirection: 'row',
    justifyContent:'center',
  },
  filmsContainer: {
    flex: 0.7,
  },
  detailsContainer: {
    marginLeft: 5,
  },
  planetHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#fff',
  },
  planetDetailsText: {
    fontSize: 14,
    fontWeight: 'normal',
    color:'#fff',
    marginTop: 5,
  },
  planetListContainer: {
    flex:1/NUMBER_OF_COLUMNS,
    flexDirection: 'column',
    margin: 1,
    borderRadius:10,
    borderWidth: 1,
    borderColor:'#696969',
    margin: 10,
    backgroundColor:'#696969',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  planetPlaceHolder: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 140,
    width: 140,
  },
  filmsPlaceHolder: {
    height: 80,
    width: 80,
    alignItems:'flex-end',
    justifyContent:'center',
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

export default connect (mapStateToProps, mapDispatchToProps)(PlanetsDetails);
