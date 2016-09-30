'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

import Loader from '../common/Loader';
import ImageZoom from 'react-native-image-zoom';
const { width, height } = Dimensions.get('window');


const venueImg = 'https://futurice.github.io/futubileet-site/venue/venue.png';
class EventMap extends Component {

  state = { loader: true };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loader && <Loader />}
        <ImageZoom
          onLoad={ ()=> {
            this.setState({loader: false});
          }}
          source={{
            uri: venueImg,
            headers: {
              "Referer" : 'http://...'
            }
          }}
          resizeMode={'contain'}
          style={{ width, height: height, top: -20}}
        />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
}});


export default EventMap;