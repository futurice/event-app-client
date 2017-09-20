'use strict'

import React, { Component } from 'react';

import {
  View,
  Navigator,
  StatusBar,
  BackAndroid
} from 'react-native'

import { connect } from 'react-redux';
import _ from 'lodash';

import RegistrationView from '../components/registration/RegistrationView';
import IntroView from '../components/registration/IntroView';
import LightBox from '../components/lightbox/LightBox';
import errorAlert from '../utils/error-alert';
import AndroidTabNavigation from './Navigation';

const theme = require('../style/theme');


let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

class App extends Component {
  renderScene(route, navigator) {
    _navigator = navigator;
    if (route.component) {
      const RouteComponent = route.component;
      return <RouteComponent navigator={_navigator} route={route} {...this.props} />
    }
  }

  render() {
    const {
      dispatch,
      errors,
      isIntroViewOpen,
      isWelcomeScreenOpen,
      isRegistrationViewOpen
    } = this.props;

    const immutableError = errors.get('error');
    if (immutableError) {
      const error = immutableError.toJS();
      errorAlert(dispatch, _.get(error, 'header'), _.get(error, 'message'));
    }

    if (isIntroViewOpen || isWelcomeScreenOpen || isRegistrationViewOpen) {
      return (
        <View style={{ flex:1 }}>
          <StatusBar backgroundColor={theme.secondary} />
          <IntroView />
        </View>
        );
    };

    return (
      <View style={{ flex:1 }}>
        <StatusBar backgroundColor={theme.statusbar} />

        <Navigator
          initialRoute={{
            component: AndroidTabNavigation,
            name: 'Futufinlandia'
          }}
          renderScene={this.renderScene}
          configureScene={() => ({
            ...Navigator.SceneConfigs.FloatFromBottomAndroid
          })}
        />
        <LightBox />
      </View>
    )
  }
}

const select = store => {
  return {
    errors: store.errors,
    isIntroViewOpen: store.registration.get('isIntroViewOpen'),
    isWelcomeScreenOpen: store.registration.get('isWelcomeScreenOpen'),
    isRegistrationViewOpen: store.registration.get('isRegistrationViewOpen'),
  }
};
export default connect(select)(App);
