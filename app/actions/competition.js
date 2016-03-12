'use strict';

import api from '../services/api';
import ActionTypes from '../constants/ActionTypes';
import LocationManager from '../utils/LocationManager';

const POSTING_ACTION = 'POSTING_ACTION';
const ACTION_POST_SUCCESS = 'ACTION_POST_SUCCESS';
const ACTION_POST_FAILURE = 'ACTION_POST_FAILURE';
const REQUEST_ACTION_TYPES = 'REQUEST_ACTION_TYPES';
const RECEIVE_ACTION_TYPES = 'RECEIVE_ACTION_TYPES';
const ERROR_REQUESTING_ACTION_TYPES = 'ERROR_REQUESTING_ACTION_TYPES';

const _postAction = (payload) => {
  return (dispatch, getStore) => {
    dispatch({ type: POSTING_ACTION });
    return api.postAction(payload, getStore().location.get('currentLocation'))
      .then(response => dispatch({ type: ACTION_POST_SUCCESS }))
      .catch(e => dispatch({ type: ACTION_POST_FAILURE, error: e }));
  };
};

const postAction = type => {
  return _postAction({
    team: 1, // TODO: Change to a real team
    type
  });
};

const postImage = image => {
  return _postAction({
    team: 1, // TODO: Change to a real team
    type: ActionTypes.IMAGE,
    imageData: image
  });
};

const fetchActionTypes = () => {
  return dispatch => {
    dispatch({ type: REQUEST_ACTION_TYPES });
    api.fetchActionTypes()
      .then(teams => dispatch({ type: RECEIVE_ACTION_TYPES, payload: teams }))
      .catch(e => dispatch({ type: ERROR_REQUESTING_ACTION_TYPES, error: e }));
  };
}

export {
  POSTING_ACTION,
  ACTION_POST_SUCCESS,
  ACTION_POST_FAILURE,
  REQUEST_ACTION_TYPES,
  RECEIVE_ACTION_TYPES,
  ERROR_REQUESTING_ACTION_TYPES,
  postAction,
  postImage,
  fetchActionTypes
};
