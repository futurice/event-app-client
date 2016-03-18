'use strict';

import React, {
  Navigator,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import sceneConfig from '../utils/sceneConfig';
import NavRouteMapper from '../components/common/navbarRouteMapper';

import TimelineList from '../components/calendar/TimelineList';
const theme = require('../style/theme');

const styles = StyleSheet.create({
  navigator: {
    paddingTop: 42,
    paddingBottom:30,
  },
  navbar: {
    backgroundColor: theme.primary,
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
      <Navigator
        style={styles.navigator}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navbar}
            routeMapper={NavRouteMapper} />
        }
        initialRoute={{
          component: TimelineList,
          name: 'Tapahtumat'
        }}
        renderScene={this.renderScene}
        configureScene={() => sceneConfig}
      />
    );
  }
});

const select = store => {
  return {};
};

export default connect(select)(TimelineListWrapper);
