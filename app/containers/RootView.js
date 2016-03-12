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
import * as TeamActions from '../actions/team';

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  createLoggerMiddleware(loggerConfig)
)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

// Fetch teams & actions
store.dispatch(CompetitionActions.fetchActionTypes());
store.dispatch(TeamActions.fetchTeams());

export default class RootView extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}
