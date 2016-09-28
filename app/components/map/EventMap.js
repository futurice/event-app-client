'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import theme from '../../style/theme';
import PhotoView from 'react-native-photo-view';
const { width } = Dimensions.get('window');


const venueImg = 'https://futurice.github.io/futubileet-site/venue/venue.png';
class EventMap extends Component {


  render() {
    return (
      <View style={styles.container}>
        <PhotoView
          source={{uri: venueImg}}
          minimumZoomScale={1.5}
          maximumZoomScale={4}
          resizeMode={'contain'}
          style={{ width, height: width, marginBottom: 50}}
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
    backgroundColor: theme.white
}});


export default EventMap;
