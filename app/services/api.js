import Endpoints from '../constants/Endpoints';

function fetchModels(modelType) {
  const url = Endpoints.urls[modelType];

  return fetch(url)
    .then(response => response.json())
    .catch((error) => {
      // TODO lolwat
      console.error('Error catched on API-fetch', error);
      return Promise.reject(null);
    });
}

export default {
  fetchModels
};
