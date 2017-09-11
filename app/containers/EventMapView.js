'use strict';

import React from 'react';

import {
  Navigator,
  StyleSheet,
  BackAndroid,
  View,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import Directions from '../components/directions/main';
import sceneConfig from '../utils/sceneConfig';
import NavRouteMapper from '../components/common/navbarRouteMapper';
import Background from '../components/background';
import theme from '../style/theme';

const styles = StyleSheet.create({
  navigator: {
    paddingTop: Platform.OS === 'ios' ? 62 : 0,
    backgroundColor: 'transparent',
  },
  navbar: {
    backgroundColor: theme.secondary,
    height: 62,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

var _navigator;

let directionSceneConfig = Object.assign({
  ...Navigator.SceneConfigs.FadeAndroid,
  sceneConfig
});

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var EventMapView = React.createClass({
  renderScene(route, navigator) {
    _navigator = navigator;
    if (route.component) {
      const RouteComponent = route.component;
      return <RouteComponent navigator={navigator} route={route} {...this.props} />
    }
  },

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Background color="purple" />
        <View style={{ flex: 1, backgroundColor: theme.purpleLayer, zIndex: 2, }}>
          <Navigator
            style={styles.navigator}
            initialRoute={{
              component: Directions,
              name: 'Map'
            }}
            navigationBar={
              (Platform.OS === 'ios') ? <Navigator.NavigationBar
                style={styles.navbar}
                routeMapper={NavRouteMapper} /> : null
            }

            renderScene={this.renderScene}
            configureScene={() => directionSceneConfig}
          />
        </View>
      </View>
    );
  }
});

const select = store => {
  return {};
};

export default connect(select)(EventMapView);
