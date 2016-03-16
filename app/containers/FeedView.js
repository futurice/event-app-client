'use strict';

import React, {
  Component,
  Navigator,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Platform
} from 'react-native';
import { connect } from 'react-redux';

import analytics from '../services/analytics';
import FeedList from '../components/feed/FeedList';
import NavRouteMapper from '../components/common/navbarRouteMapper';
import theme from '../style/theme';

const VIEW_NAME = 'FeedView';

const styles = StyleSheet.create({
  navigator: {
    paddingTop: (Platform.OS === 'ios') ? 62 : 0
  },
  navbar: {
    backgroundColor: theme.primary,
    height: 62,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center'
  }
});


var FeedView = React.createClass({
  componentDidMount() {
    analytics.viewOpened(VIEW_NAME);
  },

  renderScene(route, navigator) {
    if (route.component) {
      const Component = route.component;
      return <Component navigator={navigator} route={route} {...this.props} />
    }
  },

  render() {
    if (Platform.OS === 'ios') {
      return <Navigator
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
        })} />;
    }
    else {
      return <Navigator
        style={styles.navigator}
        initialRoute={{
          component: FeedList,
          name: 'Feed'
        }}
        renderScene={this.renderScene}
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromRight
        })} />;
    }
  }
});


const select = store => {
    return {
    }
};

export default connect(select)(FeedView);
