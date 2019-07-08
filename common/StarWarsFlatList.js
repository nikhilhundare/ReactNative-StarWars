import React, { PureComponent } from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

export default class StarWarsFlatList extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      item,
      imageURL,
      type,
      onPress,
    } = this.props;

    let itemTitle;
    let itemSubTitle;

    switch(this.props.type){
      case 'PLANETS_LIST' : itemTitle = item.item.name;
                            itemSubTitle = item.item.population;
                            break;
      case 'FILMS_LIST'   : itemTitle = item.item.title;
                            itemSubTitle = '';
                            break;
      case 'ACTORS_LIST'   : itemTitle = item.item.name;
                            itemSubTitle = item.item.height;
                            break;
      default :             break;
    }

    if(item){
      return (
        <View>
        <TouchableOpacity style={styles.listContainer} onPress={onPress}>
          <View style={styles.listItemContainer}>
            <Image source={this.props.imageURL}
                style={styles.imagePlaceHolder}/>
            <Text style={styles.itemTitleText}>{itemTitle}</Text>
            <Text style={styles.itemSubTitleText}>{itemSubTitle}</Text>
          </View>
        </TouchableOpacity>
        </View>
      );
    } else {
      return <ActivityIndicator />
    }

  }
}
const styles = StyleSheet.create({
  listContainer: {
    flex:1,
    flexDirection: 'column',
    borderRadius:10,
    borderWidth: 1,
    borderColor:'#696969',
    margin: 10,
    backgroundColor:'#4d4e4f',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    width:160,
  },
  listItemContainer: {
      flex: 1,
      margin:20,
      alignItems: 'center',
      justifyContent: 'center',
  },
  imagePlaceHolder: {
    height: 80,
    width: 80,
    alignItems:'flex-end',
    justifyContent:'center',
    resizeMode:'contain',
  },

  itemTitleText: {
    fontSize: 18,
    fontWeight:'bold',
    margin:10,
    color: '#fff',
  },
  itemSubTitleText: {
      fontSize: 12,
      marginLeft:10,
      color: '#c0c0c0',
  },

});
