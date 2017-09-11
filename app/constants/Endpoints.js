import _ from 'lodash';
import * as ENV from '../../env';
const ROOT_URL = ENV.API_URL;


const EndpointUrls = {
  markers: `${ROOT_URL}/markers`,
  events: `${ROOT_URL}/events`,
  feed: `${ROOT_URL}/feed`,
  feedItem: (itemId) => `${ROOT_URL}/feed/${itemId}`,
  leaderboard: `${ROOT_URL}/leaderboard`,
  guilds: `${ROOT_URL}/guilds`,
  action: `${ROOT_URL}/actions`,
  user: (uuid) => `${ROOT_URL}/users/${uuid}`,
  teams: `${ROOT_URL}/teams`,
  actionTypes: `${ROOT_URL}/action_types`,
  announcements: `${ROOT_URL}/announcements`,
  vote: `${ROOT_URL}/vote`,
  login: `${ROOT_URL}/register`
};

const EndpointTypes = _.map(EndpointUrls, (item, key) => key);

export default {
  urls: EndpointUrls,
  types: EndpointTypes
};
