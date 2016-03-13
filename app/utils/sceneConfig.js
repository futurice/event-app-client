import React, { Navigator } from 'react-native';
import { connect } from 'react-redux';
const SCREEN_WIDTH = require('Dimensions').get('window').width;
const { Platform } = React;

let sceneConfig;
if (Platform.OS === 'ios') {
  sceneConfig = {
    ...Navigator.SceneConfigs.FloatFromRight,
    gestures: {
      pop: {
        ...Navigator.SceneConfigs.FloatFromRight.gestures.pop,
        edgeHitWidth: SCREEN_WIDTH / 2,
      },
    },
  }
} else {
  sceneConfig = Navigator.SceneConfigs.FadeAndroid;
}

export default sceneConfig;
