import React, { PureComponent } from 'react';
import {
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
//import Camera from 'react-native-camera';

export default class StarWarsDetailsScreen extends PureComponent {

  constructor(props) {
    super(props);
    //this._renderCamera = this._renderCamera.bind(this);
  }

  _renderSubText(data) {
    const onPress = this.props.onPress;
    var namesList = Object.entries(data).map(function(item){
                        if(item[0] === 'homeland'){
                          return (
                            <Text
                              style={styles.itemDetailsLinkText}
                              onPress={onPress}>
                                {item[0].toUpperCase()}
                            </Text>
                          );
                        }
                        return <Text style={styles.itemDetailsText}>{item[0].toUpperCase()} : {item[1]}</Text>;
                    });
    return namesList;
  }

  _renderCamera(){
    // return(
    //   <Camera
    //     ref={(cam) => {
    //       this.camera = cam
    //     }}
    //     style={styles.view}
    //     aspect={Camera.constants.Aspect.fill}
    //     type='front'
    //     mirrorImage={true}
    //   >
    //     <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
    //       [CAPTURE]
    //     </Text>
    //   </Camera>
    // );
  }

  takePicture() {
    // const options = {}
    //
    // this.camera.capture({metadata: options}).then((data) => {
    //   console.log(data)
    // }).catch((error) => {
    //   console.log(error)
    // })
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
          //{this._renderCamera()}
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
  itemDetailsLinkText: {
    fontSize: 14,
    fontWeight: 'normal',
    color:'#FFA500',
    marginTop: 5,
    marginLeft: 5,
  },
  imagePlaceHolder: {
    justifyContent: 'flex-end',
    height: 140,
    width: 140,
    marginRight: 10,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'steelblue',
    borderRadius: 10,
    color: 'red',
    padding: 15,
    margin: 45
  },
});
