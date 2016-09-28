const ROOT_URL = 'https://futurice.github.io/futubileet-site';


import locationService from '../services/location';
const EVENT_LOCATION = { latitude: 60.2875359, longitude: 25.0384261 };

const Links = [
  {title: 'Heureka Website', link: 'http://www.heureka.fi', icon: 'lightbulb-outline'},
  {title: 'Directions to Heureka', link: locationService.getGeoUrl({ location: EVENT_LOCATION, locationName: 'Futubileet in Heureka' }), icon: 'directions' },
  {title: 'Call Taxi Vantaa', link: 'tel://01007300', icon: 'directions-car', separatorAfter: true},
  {title: 'Terms of Service', link: `${ROOT_URL}/terms.html`, icon: 'info', showInWebview: true},
  {title: 'Privacy', link: `${ROOT_URL}/privacy.html`, icon: 'lock', showInWebview: true},
  {title: 'Licenses', link: `${ROOT_URL}/licenses.html`, icon: 'help', showInWebview: true, last: true},

];


export default {
  links: Links
};
