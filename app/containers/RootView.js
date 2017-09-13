
import React from 'react';
import { Platform, StatusBar, AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLoggerMiddleware from 'redux-logger';
import loggerConfig from '../utils/loggerConfig';
import * as reducers from '../reducers';
import MainView from './MainView';
import * as CompetitionActions from '../actions/competition';
import * as TeamActions from '../actions/team';
import * as RegistrationActions from '../actions/registration';
import { APP_STORAGE_KEY } from '../../env';
const appCodeKey = `${APP_STORAGE_KEY}:code`;

const middlewares = [thunk];
if (__DEV__) {
  // Disabling logging might help performance as XCode prints the whole objects
  // without respecing the collapsed parameter
  // const logger = createLoggerMiddleware(loggerConfig)
  // middlewares.push(logger);
  console.disableYellowBox = true; // TODO check this
}

const createStoreWithMiddleware = applyMiddleware.apply(this, middlewares)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

// Fetch teams & actions, check user existance
store.dispatch(CompetitionActions.fetchActionTypes());
store.dispatch(TeamActions.fetchTeams());
store.dispatch(RegistrationActions.getUser());

// # Check if user logged
// CLEARING: AsyncStorage.clear();

// Get Invitation code from Storage
// Code is saved to storage when user logs in first time.
AsyncStorage.getItem(appCodeKey)
.then(code => {
  if (!code) {
    store.dispatch(RegistrationActions.showLogin());
  } else {
    store.dispatch(RegistrationActions.updateCode(code));
  }
})
.catch(error => { store.dispatch(RegistrationActions.showLogin()); });

const RootView = React.createClass({

  componentDidMount() {

    // Statusbar style
    if (Platform.OS === 'ios') {
      StatusBar.setHidden(false)
      StatusBar.setBarStyle('light-content')
    }

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
