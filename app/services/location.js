import {Platform} from 'react-native';

function getGeoUrl(event) {
  const ZOOM_LEVEL = '18';

  var geoUrl = null;
  const {latitude, longitude} = event.location;
  if (Platform.OS === 'ios') {
    // On iOS use Apple Maps
    geoUrl = 'http://maps.apple.com/';
    geoUrl += '?z=' + ZOOM_LEVEL;
    geoUrl += '&q=' + event.locationName;
    geoUrl += '&ll=' + latitude + ',' + longitude;
  } else {
      
      geoUrl = "geo:";//<lat>,<long>?q=<lat>,<long>(Label+Name)"
      geoUrl += latitude + ',' + longitude + '?q=' + latitude + ',' + longitude +'(' + event.locationName + ')';
    
  }

  return geoUrl;
}


// In here could be functions for calculating distances between locations, etc


export default {
  getGeoUrl
};
