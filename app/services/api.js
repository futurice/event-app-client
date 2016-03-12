import Endpoints from '../constants/Endpoints';
import DeviceInfo from 'react-native-device-info';

const _post = (url, body) => {
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(Object.assign(
      {},
      body,
      // { 'user': DeviceInfo.getUniqueID() }
      { 'user': 'hessu' } // TODO: Remove hessu user when real users available
    ))
  });
}

const fetchModels = modelType => {
  const url = Endpoints.urls[modelType];

  return fetch(url)
    .then(response => response.json())
    .catch((error) => {
      console.log('Error catched on API-fetch', error);
      return Promise.reject(null);
    });
};

const postAction = payload => {
  return _post(Endpoints.urls.action, payload)
    .then(response => response.json());
};

const createUser = payload => {
  return _post(Endpoints.urls.user, payload)
    .then(response => response.json());
};

export default {
  fetchModels,
  postAction,
  createUser
};
