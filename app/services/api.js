import DeviceInfo from 'react-native-device-info';
import { AsyncStorage } from 'react-native';

import Endpoints from '../constants/Endpoints';
import { version as VERSION_NUMBER } from '../../package.json';
import * as ENV from '../../env';


const USER_UUID = DeviceInfo.getUniqueID();
const API_TOKEN = ENV.API_TOKEN;

const fetchModels = modelType => {
  const url = Endpoints.urls[modelType];
  return cachedFetch(url);
};

const fetchMoreFeed = lastID => {
  const params = { beforeId: lastID, limit: 20 };
  let url = Endpoints.urls.feed;
  url += '?' + Object.keys(params).map(k => {
    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
  }).join('&');

  return cachedFetch(url);
};

const postAction = (params, location) => {
  let payload = Object.assign({}, params, { user: DeviceInfo.getUniqueID() });

  // Add location to payload, if it exists
  if (location) {
    payload.location = location;
  }

  return _post(Endpoints.urls.action, payload);
};

const putUser = payload => {
  return _put(Endpoints.urls.user(payload.uuid), payload);
};

const getUser = uuid => {
  return wapuFetch(Endpoints.urls.user(uuid))
    .then(checkResponseStatus)
    .then(response => response.json());
};

const loginUser = inviteCode => {
  return wapuFetch(`${Endpoints.urls.login}?code=${inviteCode}`)
    .then(checkResponseStatus)
    .then(response => response.json());
};

const deleteFeedItem = item => {
  return _delete(Endpoints.urls.feedItem(item.id));
};

const cachedFetch = (url, opts) => {
  return wapuFetch(url, opts)
  .then(response => {
    // If server responds with error, it is thrown
    if (isErrorResponse(response.status)) {
      const error = new Error(response.statusText);
      error.response = response;
      error.status = response.status;
      throw error;
    }

    return response.json();
  })
  .then(response => {
    return AsyncStorage.setItem(url, JSON.stringify(response))
      .then(() => response);
  })
  .catch(error => {
    if (error.response) {
      // Re-throw server errors
      throw error;
    }

    // In case of a network failure, return data from cache
    console.log('Error catched on API-fetch', error);
    return AsyncStorage.getItem(url)
    .then(value => {
      value = JSON.parse(value);
      if (value != null && !value.error) {
        return Promise.resolve(value);
      } else {
        return Promise.reject(null);
      }
    });
  });
}

// Our own wrapper for fetch. Logs the request, adds required version headers, etc.
// Instead of using fetch directly, always use this.
const wapuFetch = (url, opts) => {
  opts = opts || {};
  opts.headers = opts.headers || {};

  opts.headers['x-client-version'] = VERSION_NUMBER;
  opts.headers['x-user-uuid'] = USER_UUID;
  opts.headers['x-token'] = API_TOKEN;
  return fetch(url, opts);
};

const checkResponseStatus = response => {
  if (response.status >= 200 && response.status < 400) {
    return response;
  } else {
    return response.json()
      .then(res => {
        console.log('Error catched', response.statusText);
        const error = new Error(response.statusText);
        error.response = response;
        error.responseJson = res;
        throw error;
      });
  }
};

function isErrorResponse(status) {
  return status && status >= 400;
}

const _post = (url, body) => {
  return wapuFetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(checkResponseStatus);
};

const _put = (url, body) => {
  return wapuFetch(url, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(checkResponseStatus);
};

const _delete = (url, body) => {
  return wapuFetch(url, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(checkResponseStatus);
};

export default {
  deleteFeedItem,
  fetchModels,
  fetchMoreFeed,
  postAction,
  putUser,
  getUser,
  loginUser
};
