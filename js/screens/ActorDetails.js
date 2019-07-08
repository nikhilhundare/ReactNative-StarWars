import React, {Component} from 'react';
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
import { Actions } from 'react-native-router-flux';

import * as planetActions from '../actions/planetsAction.js';
import StarWarsFlatList from '../../common/StarWarsFlatList.js';
import StarWarsDetailsScreen from '../../common/StarWarsDetailsScreen.js';

const FILMS_IMAGE_URL = require('../../common/assets/movies.png');
const ACTOR_IMAGE_URL = require('../../common/assets/actor.png');
const NUMBER_OF_COLUMNS = 2;
const TYPE = 'FILMS_LIST';

const mapStateToProps = state => ({
  actorsDetails: state.actorsDetails.actorsDetailsData,
});
const mapDispatchToProps = dispatch => ({
  planetsActions: bindActionCreators(planetActions, dispatch)
});

class ActorDetails extends Component {
  constructor(props){
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this._onDetailsItemPress = this._onDetailsItemPress.bind(this);
  }

  componentDidMount() {
    this.props.planetsActions.fetchActorsDetails(this.props.url);
  }

  _onDetailsItemPress(url){
    Actions.planetDetails({url:url});
  }

  _renderItem(item, index){
    return(
      <StarWarsFlatList
        imageURL={FILMS_IMAGE_URL}
        type={TYPE}
        item={item}
      />
    );
  }

  render() {
    if(this.props.actorsDetails){
      const {
        name,
        height,
        gender,
        birth_year,
        hair_color,
        skin_color,
        homeworld,
      } = this.props.actorsDetails.actorsData;
      const detailsData = {
        name: name,
        subDetails: {
          height: height,
          gender: gender,
          birth_year: birth_year,
          skin_color: skin_color,
          homeworld:homeworld,
        },
      }
      return (
        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <StarWarsDetailsScreen
              dataSource={detailsData}
              imageURL={ACTOR_IMAGE_URL}
              onPress={()=> this._onDetailsItemPress(homeworld)}
            />
          </View>
          <View style={styles.filmsContainer}>
            <FlatList
                    data={this.props.actorsDetails.filmsData}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => `K_${index}`}
                    numColumns={NUMBER_OF_COLUMNS}
            />
          </View>
        </View>
      )
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
    marginTop: 60,
  },

});

export default connect (mapStateToProps, mapDispatchToProps)(ActorDetails);
