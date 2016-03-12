import _ from 'lodash';
const ROOT_URL = 'https://wappuapp-backend.herokuapp.com/api';

const EndpointUrls = {
  events: `${ROOT_URL}/events`,
  photos: `${ROOT_URL}/photos`,
  leaderboard: `${ROOT_URL}/leaderboard`,
  guilds: `${ROOT_URL}/guilds`,
  action: `${ROOT_URL}/actions`,
  user: `${ROOT_URL}/users`,
};

const EndpointTypes = _.map(EndpointUrls, (item, key) => key);

export default {
  urls: EndpointUrls,
  types: EndpointTypes
};
