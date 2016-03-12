'use strict';

import api from '../services/api';
import ActionTypes from '../constants/ActionTypes';
import LocationManager from '../utils/LocationManager';

const POSTING_ACTION = 'POSTING_ACTION';
const ACTION_POST_SUCCESS = 'ACTION_POST_SUCCESS';
const ACTION_POST_FAILURE = 'ACTION_POST_FAILURE';

const uploadImage = image => {
  return postAction(ActionTypes.IMAGE, { image: image });
};

/**
 * Post all kinds of actions to backend
 * @param  {ActionTypes} type The type of the action
 * @param  {Object} additionalPayload Any additional payload, e.g. an image if one is to be uploaded
 */
const postAction = (type, additionalPayload) => {
  return dispatch => {
    const actionPayload = {
      location: LocationManager.getLocation(),
      team: 0, // TODO: Change to a real team
      type
    };
    if (additionalPayload) {
      actionPayload.payload = additionalPayload;
    }
    dispatch({ type: POSTING_ACTION });
    return api.postAction(actionPayload)
      .then(response => dispatch({ type: ACTION_POST_SUCCESS }))
      .catch(error => dispatch({ type: ACTION_POST_FAILURE }));
  };
};

export {
  POSTING_ACTION,
  ACTION_POST_SUCCESS,
  ACTION_POST_FAILURE,
  uploadImage,
  postAction
};
