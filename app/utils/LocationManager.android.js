/*
*   LocationManager for Andro
*
*   Using Geolocation API
*   https://facebook.github.io/react-native/docs/geolocation.html#content
*   https://developer.mozilla.org/en-US/docs/Web/API/Geolocation
*/

import React, { DeviceEventEmitter } from 'react-native';

let currentLocation = null;
let getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      currentLocation = {
       longitude: position.coords.longitude,
       latitude: position.coords.latitude
     }
   },
   (error) => alert(error.message),
   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
   );
}

getCurrentLocation();

const subscription = DeviceEventEmitter.addListener('updateLocation', location => {
  getCurrentLocation()
});

const getLocation = () => {
  return currentLocation;
};

export default {
  getLocation
};
