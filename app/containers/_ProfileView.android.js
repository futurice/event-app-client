

import React from 'react';

import {
  Navigator,
  StyleSheet,
  BackAndroid,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import Profile from '../components/profile/Profile';
const theme = require('../style/theme');

const styles = StyleSheet.create({
  navigator: {
    paddingTop: 0
  }
});

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var ProfileView = React.createClass({
  renderScene(route, navigator) {
    _navigator = navigator;
    if (route.component) {
      const RouteComponent = route.component;
      return <RouteComponent navigator={this.props.navigator} route={route} {...this.props} />
    }
  },

  render() {
    return (
      <Navigator
        style={styles.navigator}
        initialRoute={{
          component: Profile,
          name: 'Settings'
        }}
        renderScene={this.renderScene}
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromBottomAndroid
        })}
      />
    );
  }
});

const select = store => {
  return {};
};

export default connect(select)(ProfileView);
