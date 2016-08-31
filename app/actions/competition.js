'use strict';

import api from '../services/api';
import ActionTypes from '../constants/ActionTypes';
import * as NotificationMessages from '../utils/notificationMessage';
import { refreshFeed } from './feed';
import {createRequestActionTypes} from '.';

const {
  POST_ACTION_REQUEST,
  POST_ACTION_SUCCESS,
  POST_ACTION_FAILURE
} = createRequestActionTypes('POST_ACTION');
const {
  GET_ACTION_TYPES_REQUEST,
  GET_ACTION_TYPES_SUCCESS,
  GET_ACTION_TYPES_FAILURE
} = createRequestActionTypes('GET_ACTION_TYPES');

const OPEN_TEXTACTION_VIEW = 'OPEN_TEXTACTION_VIEW';
const CLOSE_TEXTACTION_VIEW = 'CLOSE_TEXTACTION_VIEW';
const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
const UPDATE_COOLDOWNS = 'UPDATE_COOLDOWNS';

const openTextActionView = () => {
  return { type: OPEN_TEXTACTION_VIEW };
};

const closeTextActionView = () => {
  return { type: CLOSE_TEXTACTION_VIEW };
};

const _postAction = (payload) => {
  return (dispatch, getStore) => {
     dispatch({ type: POST_ACTION_REQUEST });

    return api.postAction(payload, getStore().location.get('currentLocation'))
      .then(response => {
         setTimeout(() => {
             dispatch(refreshFeed());
        dispatch({ type: POST_ACTION_SUCCESS, payload: { type: payload.type } });
        dispatch({ type: SHOW_NOTIFICATION, payload: NotificationMessages.getMessage(payload), status: 1 });

         }, 1000);

        setTimeout(() => {
          dispatch({ type: HIDE_NOTIFICATION });
        }, 3000);
      })
      .catch(e => {
        console.log('Error catched on competition action post!', e);

        if (e.response.status === 429) {
          dispatch({
            type: SHOW_NOTIFICATION,
            payload: NotificationMessages.getRateLimitMessage(payload)
          });
        } else {
          dispatch({
            type: SHOW_NOTIFICATION,
            payload: NotificationMessages.getErrorMessage(payload)
          });
        }
        dispatch({ type: POST_ACTION_FAILURE, error: e });

        setTimeout(() => {
          dispatch({ type: HIDE_NOTIFICATION });
        }, 3000);
      });
  };
};

const postAction = type => {
  return _postAction({
    type
  });
};

const postText = text => {
  return _postAction({
    type: ActionTypes.TEXT,
    text: text
  });
};

const postImage = image => {
  return _postAction({
    type: ActionTypes.IMAGE,
    imageData: image
  });
};

const fetchActionTypes = () => {
  return dispatch => {
    dispatch({ type: GET_ACTION_TYPES_REQUEST });
    api.fetchModels('actionTypes')
      .then(actionTypes => dispatch({ type: GET_ACTION_TYPES_SUCCESS, payload: actionTypes }))
      .catch(e => dispatch({ type: GET_ACTION_TYPES_FAILURE, error: true, payload: e }));
  };
};

const updateCooldowns = () => {
  return { type: UPDATE_COOLDOWNS };
};

export {
  POST_ACTION_REQUEST,
  POST_ACTION_SUCCESS,
  POST_ACTION_FAILURE,
  GET_ACTION_TYPES_REQUEST,
  GET_ACTION_TYPES_SUCCESS,
  GET_ACTION_TYPES_FAILURE,
  OPEN_TEXTACTION_VIEW,
  CLOSE_TEXTACTION_VIEW,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  UPDATE_COOLDOWNS,
  postAction,
  postText,
  postImage,
  openTextActionView,
  closeTextActionView,
  fetchActionTypes,
  updateCooldowns
};
