import React, {Component} from 'react';
import {
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

import * as planetActions from './actions/planetsAction.js';
import StarWarsFlatList from '../common/StarWarsFlatList.js';

const IMAGE_URL = require('../common/assets/orangePlanet.png');
const NUMBER_OF_COLUMNS = 2;
const TYPE = 'PLANETS_LIST';

const mapStateToProps = state => ({
  planetsList: state.planetsList.planetsListData,
});
const mapDispatchToProps = dispatch => ({
  planetsActions: bindActionCreators(planetActions, dispatch)
});

class PlanetsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      planetList: []
    };
    this._renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    this.props.planetsActions.fetchPlanetsList();

  }

  _onItemPress(item){
    const planetURL = item.item.url;
    Actions.planetDetails({url:planetURL});
  }

  _renderItem(item, index) {
    return(
      <View>
        <StarWarsFlatList
            numColumns={NUMBER_OF_COLUMNS}
            imageURL={IMAGE_URL}
            type={TYPE}
            item={item}
            onPress={()=> this._onItemPress(item)}
        />
      </View>
    );

  }

  render() {
        if(this.props.planetsList) {
            return (
              <FlatList
                      data={this.props.planetsList}
                      renderItem={this._renderItem}
                      keyExtractor={(item, index) => `K_${index}`}
                      numColumns={NUMBER_OF_COLUMNS}
              />
            );
        } else {
            return <ActivityIndicator />
        }
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(PlanetsList);
