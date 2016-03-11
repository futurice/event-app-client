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
import NavRouteMapper from '../components/common/navbarRouteMapper';
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
      style={styles.navigator}
      navigationBar={ <Navigator.NavigationBar 
        style={styles.navbar}
        routeMapper={NavRouteMapper}
        />
      }
      initialRoute={{
        component: EventList, 
        name: 'Tapahtumat'
      }}

      renderScene={this.renderScene}
      configureScene={() => ({
        ...Navigator.SceneConfigs.FloatFromRight
      })}
      />

    );
  },
});

const styles = StyleSheet.create({
  navigator:{
    paddingTop:42,
  },
  navbar:{
    backgroundColor:theme.primary,
    height:62,
    paddingBottom:5,
    flexDirection:'row',
    alignItems:'center'
  }
});

const select = store => {
    return {
    }
};

export default connect(select)(CalendarView);
