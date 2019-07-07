import React, { PureComponent } from 'react';
import {
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

export default class StarWarsDetailsScreen extends PureComponent {

  constructor(props) {
    super(props);
  }

  _renderSubText(data) {
    //debugger;
    // for (const [subTitle, subText] of entries) {
    //   console.log(`There are ${count} ${fruit}s`)
    // }
    var namesList = Object.entries(data).map(function(item){
                        return <Text style={styles.itemDetailsText}>{item[0].toUpperCase()} : {item[1]}</Text>;
                    });
    return namesList;
  }

  render() {
    const {
      dataSource,
      imageURL,
    } = this.props;
    if(dataSource){
      return (
        <View style={styles.mainContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.itemHeading}> {dataSource.name.toUpperCase()} </Text>
            {this._renderSubText(dataSource.subDetails)}
          </View>
          <View style={{paddingLeft:10, paddingRight: 10, justifyContent:'flex-start', alignItems:'flex-start'}}>
            <Image source={this.props.imageURL} style={styles.imagePlaceHolder}/>
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
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    marginLeft: 5,
  },
  itemHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color:'#fff',
  },
  itemDetailsText: {
    fontSize: 14,
    fontWeight: 'normal',
    color:'#fff',
    marginTop: 5,
    marginLeft: 5,
  },
  imagePlaceHolder: {
    justifyContent: 'flex-end',
    height: 140,
    width: 140,
    marginRight: 10,
  },
});
