import React, { PureComponent } from 'react';
import {
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { RNCamera } from 'react-native-camera';

const CAMERA_ICON = require('./assets/camera_Icon.png');
export default class StarWarsDetailsScreen extends PureComponent {

  constructor(props) {
    super(props);
    this._renderCamera = this._renderCamera.bind(this);
    this.takePicture = this.takePicture.bind(this);
  }

  _renderSubText(data) {
    const onPress = this.props.onPress;
    var namesList = Object.entries(data).map(function(item){
                        if(item[0] === 'homeworld'){
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
    return(
      <View style={styles.cameraContainer}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.front}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes);
            }}
          />
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', margin: 30, }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Image
                style={styles.button}
                source={CAMERA_ICON}
              />
            </TouchableOpacity>
          </View>
        </View>
    );
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      alert("Image has been captured on below location: \n "+data.uri);
    }
  };

  render() {
    const {
      dataSource,
      imageURL,
    } = this.props;
    if(dataSource){
      return (
        <View style={{flex:1}}>
          <View style={styles.mainContainer}>
            <View style={styles.detailsContainer}>
              <Text style={styles.itemHeading}> {dataSource.name.toUpperCase()} </Text>
              {this._renderSubText(dataSource.subDetails)}
            </View>
            <View style={{paddingLeft:10, paddingRight: 10, justifyContent:'flex-start', alignItems:'flex-start'}}>
              <Image source={this.props.imageURL} style={styles.imagePlaceHolder}/>

            </View>
          </View>
          {this._renderCamera()}
        </View>
        );
    } else {
      return <ActivityIndicator />
    }

  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.6,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    marginLeft: 10,
  },
  itemHeading: {
    fontSize: 24,
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
    resizeMode:'contain',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    alignSelf: 'center',
    width:50,
  },
  cameraContainer: {
    backgroundColor: '#000',
    justifyContent:'flex-start',
    flex:0.4,

  },
  button: {
    height: 50,
    width: 50,
  }
});
