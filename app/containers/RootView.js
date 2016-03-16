'use strict';

import React, { Component } from 'react-native';
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

const middlewares = [thunk];

if (process.env.NODE_ENV === `development` && process.env.REDUX_LOG !== 'false') {
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
store.dispatch(RegistrationActions.getName());

const RootView = React.createClass({
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => this.updateLocation,
      error => console.log(error.message),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000*60*5 }
    );
    this.watchID = navigator.geolocation.watchPosition(this.updateLocation);
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
