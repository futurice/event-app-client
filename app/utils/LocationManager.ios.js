import React, { DeviceEventEmitter } from 'react-native';
const { RNLocation: Location } = require('NativeModules');

Location.requestWhenInUseAuthorization();
Location.startUpdatingLocation();
Location.setDistanceFilter(5.0);

let currentLocation = null;

const subscription = DeviceEventEmitter.addListener('locationUpdated', location => {
  currentLocation = {
    longitude: location.longitude,
    latitude: location.latitude
  };
});

const getLocation = () => {
  return currentLocation;
};

export default {
  getLocation
};
