import Endpoints from '../constants/Endpoints';
import DeviceInfo from 'react-native-device-info';

const loggingFetch = (url, opts) => {
  console.log('Fetch:', url, opts || '');
  return fetch(url, opts);
};

const _post = (url, body, location) => {
  return loggingFetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.assign(
      {},
      body,
      {
        // user: DeviceInfo.getUniqueID(),
        user: 'hessu', // TODO: Remove hessu user when real users available
        location: location
      }
    ))
  });
};

const fetchModels = modelType => {
  const url = Endpoints.urls[modelType];

  return loggingFetch(url)
    .then(response => response.json())
    .catch((error) => {
      console.log('Error catched on API-fetch', error);
      return Promise.reject(null);
    });
};

const postAction = (payload, location) => {
  return _post(Endpoints.urls.action, payload, location);
};

const createUser = payload => {
  return _post(Endpoints.urls.user, payload)
    .then(response => response.json());
};

const fetchTeams = () => {
  return loggingFetch(Endpoints.urls.teams)
    .then(response => response.json());
};

const fetchActionTypes = () => {
  return loggingFetch(Endpoints.urls.actionTypes)
    .then(response => response.json());
};

export default {
  fetchModels,
  postAction,
  createUser,
  fetchTeams,
  fetchActionTypes
};
