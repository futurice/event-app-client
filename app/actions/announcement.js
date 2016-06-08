'use strict';

import _ from 'lodash';
import api from '../services/api';
import {createRequestActionTypes} from '.';

const SET_ANNOUNCEMENT_LIST = 'SET_ANNOUNCEMENT_LIST';
const {
  GET_ANNOUNCEMENT_LIST_REQUEST,
  GET_ANNOUNCEMENT_LIST_SUCCESS,
  GET_ANNOUNCEMENT_LIST_FAILURE
} = createRequestActionTypes('GET_ANNOUNCEMENT_LIST');

const fetchAnnouncements = () => {
  return (dispatch) => {
    dispatch({ type: GET_ANNOUNCEMENT_LIST_REQUEST });

    api.fetchModels('announcements')
      .then(announcements => {
        announcements = _.isArray(announcements) ? announcements : [announcements];

        dispatch({
          type: SET_ANNOUNCEMENT_LIST,
          payload: announcements
        });
        dispatch({ type: GET_ANNOUNCEMENT_LIST_SUCCESS });
      })
      .catch(error => dispatch({ type: GET_ANNOUNCEMENT_LIST_FAILURE, error: true, payload: error }));
  }
};

export {
  SET_ANNOUNCEMENT_LIST,
  GET_ANNOUNCEMENT_LIST_REQUEST,
  GET_ANNOUNCEMENT_LIST_SUCCESS,
  GET_ANNOUNCEMENT_LIST_FAILURE,
  fetchAnnouncements
};
