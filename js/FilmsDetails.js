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

import * as planetActions from './actions/planetsAction.js';
import StarWarsFlatList from '../common/StarWarsFlatList.js';
import StarWarsDetailsScreen from '../common/StarWarsDetailsScreen.js';

const IMAGE_URL = require('../common/assets/greenPlanet.png');
const ACTOR_IMAGE_URL = require('../common/assets/actor.png');
const NUMBER_OF_COLUMNS = 2;
const TYPE = 'ACTORS_LIST';

const mapStateToProps = state => ({
  filmsDetails: state.filmsDetails.filmsDetailsData,
});
const mapDispatchToProps = dispatch => ({
  planetsActions: bindActionCreators(planetActions, dispatch)
});

class FilmsDetails extends Component {
  constructor(props){
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this._onItemPress = this._onItemPress.bind(this);
  }

  componentDidMount() {
    this.props.planetsActions.fetchFilmsDetails(this.props.url);
  }
  _onItemPress(item){
    const actorURL = item.item.url;
    Actions.actorsDetails({url:actorURL});
  }

  _renderItem(item, index){
    return(
      <StarWarsFlatList
        imageURL={ACTOR_IMAGE_URL}
        type={TYPE}
        item={item}
        onPress={()=> this._onItemPress(item)}
      />
    );
  }

  render() {
    if(this.props.filmsDetails){
      const {
        title,
        director,
      } = this.props.filmsDetails.filmsData;
      const detailsData = {
        name: title,
        subDetails: {
          director: director,
        },
      }
      return (
        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <StarWarsDetailsScreen
              dataSource={detailsData}
              imageURL=''
            />
          </View>
          <View style={styles.filmsContainer}>
          <FlatList
                  data={this.props.filmsDetails.actorsData}
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
  },

});

export default connect (mapStateToProps, mapDispatchToProps)(FilmsDetails);
