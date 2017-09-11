'use strict';

import React from 'react';

import {
  Navigator,
  StyleSheet,
  View,
  Platform
} from 'react-native';

import analytics from '../services/analytics';
import FeedList from '../components/feed/FeedList';
import NavRouteMapper from '../components/common/navbarRouteMapper';
import Background from '../components/background';
import theme from '../style/theme';

const VIEW_NAME = 'FeedView';

const styles = StyleSheet.create({
  navigator: {
    paddingTop: Platform.OS === 'ios' ? 62 : 0,
    paddingBottom:Platform.OS === 'ios' ? 30 : 0,
  },
  navbar: {
    backgroundColor: theme.secondary,
    height: 62,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default React.createClass({
  componentDidMount() {
    analytics.viewOpened(VIEW_NAME);
  },

  renderScene(route, navigator) {
    if (route.component) {
      const RouteComponent = route.component;
      return <RouteComponent navigator={navigator} route={route} {...this.props} />
    }
  },

  render() {
    if (Platform.OS === 'ios') {
      return (
      <View style={{ flex: 1 }}>
        <Background color="yellow" />
        <View style={{ flex: 1, backgroundColor: theme.transparent, zIndex: 2, }}>
          <Navigator
          style={styles.navigator}
          initialRoute={{
            component: FeedList,
            name: 'Feed'
          }}
          navigationBar={
            <Navigator.NavigationBar
              style={styles.navbar}
              routeMapper={NavRouteMapper} />
          }
          renderScene={this.renderScene}
          configureScene={() => ({
            ...Navigator.SceneConfigs.FloatFromRight
          })} />
        </View>
      </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <Background color="yellow" />
          <View style={{ flex: 1, backgroundColor: theme.transparent, zIndex: 2 }}>
            <Navigator
            style={styles.navigator}
            initialRoute={{
              component: FeedList,
              name: 'Feed'
            }}
            renderScene={this.renderScene}
            configureScene={() => ({
              ...Navigator.SceneConfigs.FloatFromRight
            })} />
          </View>
      </View>);
    }
  }
});
