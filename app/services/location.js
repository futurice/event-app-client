import {Platform} from 'react-native';

function getGeoUrl(event) {
  const ZOOM_LEVEL = '18';

  var geoUrl = null;
  const {latitude, longitude} = event.location;
  if (Platform.OS === 'iosz') {
    // On iOS use Apple Maps
    geoUrl = 'http://maps.apple.com/';
    geoUrl += '?z=' + ZOOM_LEVEL;
    geoUrl += '&q=' + event.locationName;
    geoUrl += '&ll=' + latitude + ',' + longitude;
  } else {
    // otherwise use Google Maps
    // TODO: the location pin/name doesn't work yet. What is the URL scheme for it?
    geoUrl = 'https://maps.google.com/maps/';
    geoUrl += '?z=' + ZOOM_LEVEL;
    geoUrl += '&ll=' + latitude + ',' + longitude + '+(' + event.locationName + ')';
  }

  return geoUrl;
}


// In here could be functions for calculating distances between locations, etc


export default {
  getGeoUrl
};
