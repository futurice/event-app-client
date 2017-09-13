import TermsView from '../components/Terms';
import locationService from '../services/location';

const ROOT_URL = 'https://futurice.github.io/futubileet-site';
const EVENT_LOCATION = { latitude: 60.1756973, longitude: 24.9336035 };

const Links = [
  {title: 'Finlandia Hall Website', link: 'https://www.finlandiatalo.fi/en', icon: 'LINK_FINLANDIA_HALL'},
  {title: 'Directions to Finlandia Hall', link: locationService.getGeoUrl({ location: EVENT_LOCATION, locationName: 'Futufinlandia' }), icon: 'LINK_DIRECTIONS' },
  {title: 'Call Taxi Helsinki', link: 'tel://01000700', icon: 'LINK_TAXI', separatorAfter: false},
  {title: 'Terms of Service', component: TermsView, icon: 'LINK_TERMS', secondary: true, showInWebview: true},
  {title: 'Privacy', link: `${ROOT_URL}/privacy.html`, icon: 'LINK_PRIVACY', secondary: true, showInWebview: true},
  {title: 'Licenses', link: `${ROOT_URL}/licenses.html`, icon: 'LINK_LICENSES', secondary: true, showInWebview: true, last: true},
];


export default {
  links: Links
};
