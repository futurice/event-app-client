import React, { Navigator } from 'react-native';
import { connect } from 'react-redux';
const SCREEN_WIDTH = require('Dimensions').get('window').width;

/**
 * Overwrite the default navigator scene config.
 * to use a wider area for back swiping.
 */
const sceneConfig = {
  ...Navigator.SceneConfigs.FadeAndroid,
  ...Navigator.SceneConfigs.FloatFromRight,
  gestures: {
    pop: {
      ...Navigator.SceneConfigs.FloatFromRight.gestures.pop,
      edgeHitWidth: SCREEN_WIDTH / 2,
    },
  },
};

export default sceneConfig;
