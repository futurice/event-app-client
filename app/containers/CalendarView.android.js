"use strict";

import React, {
  Component,
  Navigator,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import EventList from '../components/calendar/EventList';
const theme = require('../style/theme');


var CalendarView = React.createClass({

  renderScene (route, navigator) {
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
        ...Navigator.SceneConfigs.FloatFromBottomAndroid
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
