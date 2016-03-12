'use strict';

import DeviceInfo from 'react-native-device-info';
import api from '../services/api';
import ActionTypes from '../constants/ActionTypes';

const POSTING_ACTION = 'POSTING_ACTION';
const ACTION_POST_SUCCESS = 'ACTION_POST_SUCCESS';
const ACTION_POST_FAILURE = 'ACTION_POST_FAILURE';
const REQUEST_ACTION_TYPES = 'REQUEST_ACTION_TYPES';
const RECEIVE_ACTION_TYPES = 'RECEIVE_ACTION_TYPES';
const ERROR_REQUESTING_ACTION_TYPES = 'ERROR_REQUESTING_ACTION_TYPES';
const OPEN_TEXTACTION_VIEW = 'OPEN_TEXTACTION_VIEW';
const CLOSE_TEXTACTION_VIEW = 'CLOSE_TEXTACTION_VIEW';

const openTextActionView = () => {
  return { type: OPEN_TEXTACTION_VIEW };
};

const closeTextActionView = () => {
  return { type: CLOSE_TEXTACTION_VIEW };
};

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

const postText = text => {
  return _postAction({
    type: ActionTypes.TEXT,
    user: DeviceInfo.getUniqueID(),
    text: text
  });
}

const postImage = image => {
  return _postAction({
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
  OPEN_TEXTACTION_VIEW,
  CLOSE_TEXTACTION_VIEW,
  postAction,
  postText,
  postImage,
  openTextActionView,
  closeTextActionView,
  fetchActionTypes
};
