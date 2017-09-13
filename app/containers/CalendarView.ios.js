

import React from 'react';

import {
  Navigator,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import sceneConfig from '../utils/sceneConfig';
import NavRouteMapper from '../components/common/navbarRouteMapper';
import Background from '../components/background';

import TimelineList from '../components/calendar/TimelineList';
const theme = require('../style/theme');

const styles = StyleSheet.create({
  navigator: {
    paddingTop: 42,
    paddingBottom: 30,
  },
  navbar: {
    backgroundColor: theme.secondary,
    height: 62,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

var TimelineListWrapper = React.createClass({
  renderScene(route, navigator) {
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
              <Navigator.NavigationBar
                style={styles.navbar}
                routeMapper={NavRouteMapper} />
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

const select = store => {
  return {};
};

export default connect(select)(TimelineListWrapper);
