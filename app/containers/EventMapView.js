'use strict';

import React, {
  Component,
  Navigator,
  StyleSheet,
  BackAndroid,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import EventMap from '../components/map/EventMap';
import sceneConfig from '../utils/sceneConfig';
import theme from '../style/theme';


var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});


var EventMapView = React.createClass({
  renderScene (route, navigator) {
    _navigator = navigator;
    if (route.component) {
      const Component = route.component
      return <Component navigator={navigator} route={route} {...this.props} />
    }
  },

  render() {
    return (
      <Navigator
        initialRoute={{
          component: EventMap,
          name: 'Tapahtumat'
        }}
        renderScene={this.renderScene}
        configureScene={() => sceneConfig}
      />
    );
  }
});

const select = store => {
    return {
    }
};

export default connect(select)(EventMapView);
