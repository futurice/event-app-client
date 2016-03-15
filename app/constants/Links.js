import _ from 'lodash';
const ROOT_URL = 'http://wappu.futurice.com/terms';

const Terms = [
  {title:'Terms of Service', link: `${ROOT_URL}/terms`, icon: 'info-outline'},
  {title:'Privacy', link: `${ROOT_URL}/privacy`, icon: 'help-outline'},
  {title:'Come work for Futurice', link: 'http://futurice.com/careers', icon: 'send'},
];

export default {
  terms: Terms,
};
