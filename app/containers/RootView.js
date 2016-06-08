'use strict';

import React, { Platform, StatusBarIOS, AppStateIOS, AsyncStorage } from 'react-native';
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
import * as ENV from '../../env';
import { checkForUpdates } from '../utils/updater';
import theme from '../style/theme';

const Auth0Lock = require('react-native-lock');
const lock = new Auth0Lock({clientId: ENV.AUTH_CLIENTID, domain: ENV.AUTH_DOMAIN});
const USER_KEY = 'FUTUR_USER';

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

  componentDidMount() {

    const locationOpts = {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 1000 * 60 * 15
    };

    navigator.geolocation.getCurrentPosition(
      position => this.updateLocation,
      error => console.log(error.message),
      locationOpts
    );
    this.watchID = navigator.geolocation.watchPosition(
      this.updateLocation,
      error => console.log(error.message),
      locationOpts
    );

    // Statusbar style
    if (Platform.OS === 'ios') {

      StatusBarIOS.setHidden(false)
      StatusBarIOS.setStyle('light-content')

      // check for updates when app is resumed
      AppStateIOS.addEventListener('change', state => {
        if (state === 'active') {
          checkForUpdates();
        }
      });

      // and check once on startup
      checkForUpdates();
    }


    AsyncStorage.getItem(USER_KEY, (err, user) => {
      if (!user) {
        if (Platform.OS === 'ios') {
          lock.customizeTheme({
            A0ThemeIconImageName: 'ic_login',
            A0ThemeCredentialBoxBorderColor: '' //transparent
          });
        }

        lock.show({
          connections: ['google-oauth2']
        }, (err, profile, token) => {
          // const profile = {
          //   createdAt:"2016-05-11T12:40:39.632Z",
          //   email:"palampinen@gmail.com",
          //   name:"Pasi Lampinen",
          //   nickname:"palampinen",
          //   picture:"https://lh6.googleusercontent.com/-7wsIj22-QV0/AAAAAAAAAAI/AAAAAAAAADg/mV5k6mK_ADs/photo.jpg",
          //   userId:"google-oauth2|12345677654321" // this could be used instead of uuid
          // };

          // Update state
          store.dispatch(RegistrationActions.updateProfile(profile));

          // Save profile to Storage
          AsyncStorage.setItem(USER_KEY, JSON.stringify(profile), () => {
            console.log(profile);
            // Send profile info to server
            store.dispatch(RegistrationActions.putUser());
          })

        });
      }
    });

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
