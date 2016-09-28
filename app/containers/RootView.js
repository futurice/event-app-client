'use strict';
import React from 'react';
import { Platform, StatusBar, AppStateIOS, AsyncStorage } from 'react-native';
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
// import { checkForUpdates } from '../utils/updater';
import { APP_STORAGE_KEY } from '../../env';
const appUserKey = `${APP_STORAGE_KEY}:user`;

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
// AsyncStorage.clear();

AsyncStorage.getItem(appUserKey)
.then(user => {
  if (!user) {
    store.dispatch(RegistrationActions.showLogin());
  }
})
.catch(error => { store.dispatch(RegistrationActions.showLogin()); });

const RootView = React.createClass({

  componentDidMount() {

    // const locationOpts = {
    //   enableHighAccuracy: false,
    //   timeout: 20000,
    //   maximumAge: 1000 * 60 * 60
    // };

    // navigator.geolocation.getCurrentPosition(
    //   position => this.updateLocation,
    //   error => console.log(error.message),
    //   locationOpts
    // );
    // this.watchID = navigator.geolocation.watchPosition(
    //   this.updateLocation,
    //   error => console.log(error.message),
    //   locationOpts
    // );

    // Statusbar style
    if (Platform.OS === 'ios') {

      StatusBar.setHidden(false)
      StatusBar.setBarStyle('light-content')

      // // check for updates when app is resumed
      // AppStateIOS.addEventListener('change', state => {
      //   if (state === 'active') {
      //     checkForUpdates();
      //   }
      // });

      // // and check once on startup
      // checkForUpdates();
    }

  },

  // componentWillUnmount() {
  //   // navigator.geolocation.clearWatch(this.watchID);
  // },

  // updateLocation(position) {
  //   store.dispatch(LocationActions.updateLocation({
  //     latitude: position.coords.latitude,
  //     longitude: position.coords.longitude
  //   }));
  // },

  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
});

export default RootView;
