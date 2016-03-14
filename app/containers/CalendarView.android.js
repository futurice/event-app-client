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

import CalendarView from '../components/calendar/CalendarView';
import theme from '../style/theme';

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var CalendarViewWrapper = React.createClass({
  renderScene (route, navigator) {
    _navigator = navigator;
    if (route.component) {
      const Component = route.component
      return <Component navigator={this.props.navigator} route={route} {...this.props} />
    }
  },

  render() {
    return (
      <Navigator
        initialRoute={{
          component: CalendarView,
          name: 'Tapahtumat'
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
    return {
    }
};

export default connect(select)(CalendarViewWrapper);
