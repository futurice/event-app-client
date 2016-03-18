'use strict';

import api from '../services/api';
import ActionTypes from '../constants/ActionTypes';
import * as NotificationMessages from '../utils/notificationMessage';
import { refreshFeed } from './feed';

const POSTING_ACTION = 'POSTING_ACTION';
const ACTION_POST_SUCCESS = 'ACTION_POST_SUCCESS';
const ACTION_POST_FAILURE = 'ACTION_POST_FAILURE';
const REQUEST_ACTION_TYPES = 'REQUEST_ACTION_TYPES';
const RECEIVE_ACTION_TYPES = 'RECEIVE_ACTION_TYPES';
const ERROR_REQUESTING_ACTION_TYPES = 'ERROR_REQUESTING_ACTION_TYPES';
const OPEN_TEXTACTION_VIEW = 'OPEN_TEXTACTION_VIEW';
const CLOSE_TEXTACTION_VIEW = 'CLOSE_TEXTACTION_VIEW';
const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

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
      .then(response => {
        dispatch({ type: ACTION_POST_SUCCESS, payload: {
          type: payload.type
        }});
        dispatch({ type: SHOW_NOTIFICATION, payload: NotificationMessages.getMessage(payload) });
        dispatch(refreshFeed());

        setTimeout(() => {
          dispatch({ type: HIDE_NOTIFICATION });
        }, 3000);
      })
      .catch(e => {
        console.log('Error catched on competition action post!', e);
        dispatch({ type: SHOW_NOTIFICATION, payload: NotificationMessages.getErrorMessage(payload) });
        dispatch({ type: ACTION_POST_FAILURE, error: e })

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
    api.fetchModels('actionTypes')
      .then(actionTypes => dispatch({ type: RECEIVE_ACTION_TYPES, payload: actionTypes }))
      .catch(e => dispatch({ type: ERROR_REQUESTING_ACTION_TYPES, error: e }));
  };
};

export {
  POSTING_ACTION,
  ACTION_POST_SUCCESS,
  ACTION_POST_FAILURE,
  REQUEST_ACTION_TYPES,
  RECEIVE_ACTION_TYPES,
  ERROR_REQUESTING_ACTION_TYPES,
  OPEN_TEXTACTION_VIEW,
  CLOSE_TEXTACTION_VIEW,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  postAction,
  postText,
  postImage,
  openTextActionView,
  closeTextActionView,
  fetchActionTypes
};
