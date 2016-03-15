import Endpoints from '../constants/Endpoints';
import DeviceInfo from 'react-native-device-info';
import React, { AsyncStorage } from 'react-native';


const loggingFetch = (url, opts) => {
  console.log('Fetch:', url, opts || '');
  return fetch(url, opts);
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

const _post = (url, body) => {
  return loggingFetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(checkStatus);
};

const _put = (url, body) => {
  return loggingFetch(url, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(checkStatus);
};

const fetchModels = modelType => {
  const url = Endpoints.urls[modelType];
  return loggingFetch(url)
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
  return loggingFetch(Endpoints.urls.user(uuid))
    .then(checkStatus)
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

const fetchAnnouncements = () => {
  return loggingFetch(Endpoints.urls.announcements)
    .then(response => response.json());
}

export default {
  fetchModels,
  postAction,
  putUser,
  getUser,
  fetchTeams,
  fetchActionTypes,
  fetchAnnouncements
};
