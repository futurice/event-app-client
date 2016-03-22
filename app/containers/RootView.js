'use strict';

import React, { Platform, StatusBarIOS } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLoggerMiddleware from 'redux-logger';
import loggerConfig from '../utils/loggerConfig';
import * as reducers from '../reducers';
import MainView from './MainView';
import * as CompetitionActions from '../actions/competition';
import * as LocationActions from '../actions/location';
import * as TeamActions from '../actions/team';
import * as RegistrationActions from '../actions/registration';
var HockeyApp = require('react-native-hockeyapp');

const middlewares = [thunk];
if (__DEV__) {
  // Disabling logging might help performance as XCode prints the whole objects
  // without respecing the collapsed parameter
  const logger = createLoggerMiddleware(loggerConfig)
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware.apply(this, middlewares)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

// Fetch teams & actions, check user existance
store.dispatch(CompetitionActions.fetchActionTypes());
store.dispatch(TeamActions.fetchTeams());
store.dispatch(RegistrationActions.getUser());

const RootView = React.createClass({
  componentWillMount() {
    //HockeyApp.configure('HOCKEY_APP_ID', true);
  },

  componentDidMount() {
    //HockeyApp.start();

    navigator.geolocation.getCurrentPosition(
      position => this.updateLocation,
      error => console.log(error.message),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 * 60 * 5 }
    );
    this.watchID = navigator.geolocation.watchPosition(this.updateLocation);

    // Statusbar style
    if (Platform.OS === 'ios') {
      StatusBarIOS.setHidden(false)
      StatusBarIOS.setStyle('light-content')
    }
  },

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  updateLocation(position) {
    store.dispatch(LocationActions.updateLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }));
  },

  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
});

export default RootView;
