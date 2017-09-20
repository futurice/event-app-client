

import React, { PropTypes } from 'react';

import {
  Navigator,
  BackAndroid
} from 'react-native';
import { connect } from 'react-redux';
import TimelineList from '../components/calendar/TimelineList';

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var TimelineListWrapper = React.createClass({
  propTypes: {
    navigator: PropTypes.object.isRequired
  },
  renderScene(route, navigator) {
    _navigator = navigator;
    if (route.component) {
      const RouteComponent = route.component;
      return <RouteComponent navigator={this.props.navigator} route={route} {...this.props} />
    }
  },

  render() {
    return (
      <Navigator
        initialRoute={{
          component: TimelineList,
          name: 'Events'
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
  return {};
};

export default connect(select)(TimelineListWrapper);
