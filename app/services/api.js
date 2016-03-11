import Endpoints from '../constants/Endpoints';

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
  return fetch(Endpoints.action, {
      method: 'post',
      body: JSON.stringify(payload)
    })
    .then(response => response.json());
};

export default {
  fetchModels,
  postAction
};
