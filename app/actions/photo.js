'use strict';

import ActionTypes from '../constants/ActionTypes';
import api from '../services/api';

const PHOTO_SET = 'PHOTO_SET';
const PHOTO_LIST_LOADING = 'PHOTO_LIST_LOADING';
const PHOTO_LIST_LOADED = 'PHOTO_LIST_LOADED';
const PHOTO_LIST_FAILED = 'PHOTO_LIST_FAILED';


const fetchPhotos = () => {
  return (dispatch) => {
    dispatch({ type: PHOTO_LIST_LOADING });

    api.fetchModels('photos')
      .then(items => {
        dispatch({
          type: PHOTO_SET,
          photos: items
        });

        dispatch({ type: PHOTO_LIST_LOADED });
      })
      .catch(error => dispatch({ type: PHOTO_LIST_FAILED }));
  }
};

export {
  PHOTO_SET,
  PHOTO_LIST_LOADING,
  PHOTO_LIST_LOADED,
  PHOTO_LIST_FAILED,
  fetchPhotos
};
