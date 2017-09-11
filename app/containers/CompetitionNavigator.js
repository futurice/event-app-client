'use strict';

import React, { PropTypes } from 'react';

import {
  Navigator,
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import CompetitionView from './CompetitionView';
import NavRouteMapper from '../components/common/navbarRouteMapper';
import Background from '../components/background';
const theme = require('../style/theme');

const styles = StyleSheet.create({
  navigator: {
    paddingTop: Platform.OS === 'ios' ? 62 : 0
  },
  navbar: {
    backgroundColor: theme.secondary,
    height: 62,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const ProfileView = React.createClass({
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
      <View style={{ flex: 1, backgroundColor: theme.transparent, zIndex: 2, }}>
        <Navigator
          style={styles.navigator}
          navigationBar={
            Platform.OS === 'ios' ? <Navigator.NavigationBar
              style={styles.navbar}
              routeMapper={NavRouteMapper} /> : null
          }
          initialRoute={{
            component: CompetitionView,
            name: 'Ranking'
          }}
          renderScene={this.renderScene}
          configureScene={() => ({
            ...Navigator.SceneConfigs.FloatFromRight
          })}
        />
      </View>
    </View>
    );
  }
});

const select = store => {
  return {};
};

export default connect(select)(ProfileView);
