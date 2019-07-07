import React, {PureComponent} from 'react';
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

class PlanetsList extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      planetList: []
    };
  }

  componentDidMount() {
    this.props.planetsActions.fetchPlanetsList();

  }

  render() {
        if(this.props.planetsList) {
            return (
              <StarWarsFlatList
                  dataSource={this.props.planetsList}
                  numColumns={NUMBER_OF_COLUMNS}
                  imageURL={IMAGE_URL}
                  type={TYPE}
              />
            );
        } else {
            return <ActivityIndicator />
        }
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(PlanetsList);
