import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default class StarWarsFlatList extends PureComponent {

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem(data){
    let itemTitle;
    let itemSubTitle;

    switch(this.props.type){
      case 'PLANETS_LIST' : itemTitle = data.item.name;
                            itemSubTitle = data.item.population;
                            break;
      case 'FILMS_LIST'   : itemTitle = data.item.title;
                            itemSubTitle = '';
                            break;
      default :             break;
    }
    return (
      <TouchableOpacity style={styles.listContainer}>
        <View style={styles.listItemContainer}>
          <Image source={this.props.imageURL}
              style={styles.imagePlaceHolder}/>
          <Text style={styles.itemTitleText}>{itemTitle}</Text>
          <Text style={styles.itemSubTitleText}>{itemSubTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      dataSource,
      numColumns,
      imageURL,
      type,
    } = this.props;

    if(dataSource.length){
      return (
        <View>
        <FlatList
                data={this.props.dataSource}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => `K_${index}`}
                numColumns={this.props.numColumns}
                />
        </View>
      );
    } else {
      return <ActivityIndicator />
    }

  }
}
const styles = StyleSheet.create({
  listContainer: {
    flex:1/2,
    flexDirection: 'column',
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
  listItemContainer: {
      flex: 1,
      justifyContent: 'space-between',
      margin:20,
  },
  imagePlaceHolder: {
    height: 80,
    width: 80,
    alignItems:'flex-end',
    justifyContent:'center',
  },

  itemTitleText: {
    fontSize: 18,
    marginTop:10,
    marginLeft:5,
  },
  itemSubTitleText: {
      fontSize: 12,
      marginLeft:5,
  },

});
StarWarsFlatList.propTypes = {
  dataSource: PropTypes.array.isRequired,
};
