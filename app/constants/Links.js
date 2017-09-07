const ROOT_URL = 'https://futurice.github.io/futubileet-site';


import locationService from '../services/location';
const EVENT_LOCATION = { latitude: 60.1756973, longitude: 24.9336035 };

const Links = [
  {title: 'Finlandia Hall Website', link: 'https://www.finlandiatalo.fi/en', icon: 'account-balance'},
  {title: 'Directions to Heureka', link: locationService.getGeoUrl({ location: EVENT_LOCATION, locationName: 'Futubileet in Heureka' }), icon: 'directions' },
  {title: 'Call Taxi Helsinki', link: 'tel://01000700', icon: 'directions-car', separatorAfter: false},
  {title: 'Terms of Service', link: `${ROOT_URL}/terms.html`, icon: 'info', secondary: true, showInWebview: true},
  {title: 'Privacy', link: `${ROOT_URL}/privacy.html`, icon: 'lock', secondary: true, showInWebview: true},
  {title: 'Licenses', link: `${ROOT_URL}/licenses.html`, icon: 'help', secondary: true, showInWebview: true, last: true},

];


export default {
  links: Links
};
