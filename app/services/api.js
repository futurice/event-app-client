import DeviceInfo from 'react-native-device-info';
import React, { AsyncStorage } from 'react-native';

import Endpoints from '../constants/Endpoints';
import {version as VERSION_NUMBER} from '../../package.json';

const USER_UUID = DeviceInfo.getUniqueID();

// Our own wrapper for fetch. Logs the request, adds required version headers, etc.
// Instead of using fetch directly, always use this.
const wapuFetch = (url, opts) => {
  opts = opts || {};
  opts.headers = opts.headers || {};

  // Set version header
  opts.headers['x-client-version'] = VERSION_NUMBER;

  // Set UUID-header
  opts.headers['x-user-uuid'] = USER_UUID;

  console.log('Fetch:', url, opts || '');
  return fetch(url, opts);
};

const checkResponseStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

const _post = (url, body) => {
  return wapuFetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(checkResponseStatus);
};

const _put = (url, body) => {
  return wapuFetch(url, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(checkResponseStatus);
};

const fetchModels = modelType => {
  const url = Endpoints.urls[modelType];
  return wapuFetch(url)
  .then(response => response.json())
  .then(response => {
    return AsyncStorage.setItem(url, JSON.stringify(response)).then(() => response);
  })
  .catch((error) => {
    console.log('Error catched on API-fetch', error);
    return AsyncStorage.getItem(url)
    .then((value) => {
      if (value != null) {
        return Promise.resolve(JSON.parse(value));
      } else {
        return Promise.reject(null);
      }

    });
  });
};

const postAction = (payload, location) => {
  const finalPayload = Object.assign({}, payload, {
    user: DeviceInfo.getUniqueID(),
    location: location
  });
  return _post(Endpoints.urls.action, finalPayload);
};

const putUser = payload => {
  return _put(Endpoints.urls.user(payload.uuid), payload);
};

const getUser = uuid => {
  return wapuFetch(Endpoints.urls.user(uuid))
    .then(checkResponseStatus)
    .then(response => response.json());
};

export default {
  fetchModels,
  postAction,
  putUser,
  getUser
};
