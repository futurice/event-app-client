'use strict';

import React, {
  Component,
  Navigator,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import PhotoList from '../components/photos/PhotoList';
import NavRouteMapper from '../components/common/navbarRouteMapper';
const theme = require('../style/theme');


const styles = StyleSheet.create({
  navigator: {
    paddingTop: 0
  },
  navbar: {
    backgroundColor: theme.primary,
    height: 62,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

var PhotosView = React.createClass({
  renderScene(route, navigator) {
    if (route.component) {
      const Component = route.component;
      return <Component navigator={navigator} route={route} {...this.props} />
    }
  },

  render() {
    return (
      <Navigator
        style={styles.navigator}
        /*navigationBar={
          <Navigator.NavigationBar
            style={styles.navbar}
            routeMapper={NavRouteMapper} />
        }*/
        initialRoute={{
          component: PhotoList,
          name: 'Kuvat'
        }}
        renderScene={this.renderScene}
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromRight
        })}
      />
    );
  }
});


const select = store => {
    return {
    }
};

export default connect(select)(PhotosView);
