import {Platform} from 'react-native';
import geolib from 'geolib';
import _ from 'lodash';

function getGeoUrl(event) {
  const ZOOM_LEVEL = '18';

  var geoUrl = null;
  const {latitude, longitude} = event.location;
  if (Platform.OS === 'ios') {
    // On iOS use Apple Maps
    geoUrl = 'http://maps.apple.com/';
    geoUrl += '?z=' + ZOOM_LEVEL;
    geoUrl += '&q=' + encodeURIComponent(event.locationName);
    geoUrl += '&ll=' + latitude + ',' + longitude;
  } else {
    //<lat>,<long>?q=<lat>,<long>(Label+Name)"
    geoUrl = 'geo:' + latitude + ',' + longitude + '?q=' + latitude + ',' + longitude +
      '(' + encodeURIComponent(event.locationName) + ')';
  }

  return geoUrl;
}

// jscs:disable disallowImplicitTypeConversion
function getDistance(userLocation, eventLocation) {
  if (!userLocation) {
    return '';
  }

  const distanceInMetres = geolib.getDistance(userLocation, eventLocation);
  const distanceInKilometres = distanceInMetres / 1000;

  return '' + _.round(distanceInKilometres, 1) + ' km';
}

export default {
  getGeoUrl,
  getDistance
};
