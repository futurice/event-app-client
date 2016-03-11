"use strict";

import React, {
  Component,
  Navigator,
  StyleSheet,
  BackAndroid,
  View,
  Text,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import EventList from '../components/calendar/EventList';
const theme = require('../style/theme');




var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});


var CalendarView = React.createClass({

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
        component: EventList,
        name: 'Tapahtumat'
      }}
      renderScene={this.renderScene}
      configureScene={() => ({
        ...Navigator.SceneConfigs.FadeAndroid
      })}
      />
    );
  },
});


const select = store => {
    return {
    }
};

export default connect(select)(CalendarView);
