

import React from 'react';

import {
  Navigator,
  StyleSheet,
  BackAndroid,
  Platform,
  View,
} from 'react-native';

import sceneConfig from '../utils/sceneConfig';
import NavRouteMapper from '../components/common/navbarRouteMapper';
import Background from '../components/background';

import TimelineList from '../components/calendar/TimelineList';
const theme = require('../style/theme');

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  navigator: {
    paddingTop: isIOS ? 42 : 0,
    paddingBottom: isIOS ? 30 : 0,
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
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var TimelineListWrapper = React.createClass({
  renderScene(route, navigator) {
    _navigator = navigator;
    if (route.component) {
      const RouteComponent = route.component;
      return <RouteComponent navigator={navigator} route={route} {...this.props} />;
    }
  },

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Background color="purple" />
        <View style={{ flex: 1, backgroundColor: theme.purpleLayer, zIndex: 2, }}>
          <Navigator
            style={styles.navigator}
            navigationBar={
              isIOS
              ? <Navigator.NavigationBar
                style={styles.navbar}
                routeMapper={NavRouteMapper} />
              : null
            }
            initialRoute={{
              component: TimelineList,
              name: 'Events'
            }}
            renderScene={this.renderScene}
            configureScene={() => sceneConfig}
          />
        </View>
      </View>
    );
  }
});

export default TimelineListWrapper;
