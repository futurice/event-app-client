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
<<<<<<< HEAD
=======
import * as RegistrationActions from '../actions/registration';
>>>>>>> master

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  createLoggerMiddleware(loggerConfig)
)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

<<<<<<< HEAD
// Fetch teams & actions
store.dispatch(CompetitionActions.fetchActionTypes());
store.dispatch(TeamActions.fetchTeams());
=======
// Fetch teams & actions, check user existance
store.dispatch(CompetitionActions.fetchActionTypes());
store.dispatch(TeamActions.fetchTeams());
store.dispatch(RegistrationActions.getName());
>>>>>>> master

const RootView = React.createClass({
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => this.updateLocation,
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
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
