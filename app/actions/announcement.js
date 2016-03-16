'use strict';

import _ from 'lodash';
import moment from 'moment';

import ActionTypes from '../constants/ActionTypes';
import api from '../services/api';

const ANNOUNCEMENT_SET = 'ANNOUNCEMENT_SET';
const ANNOUNCEMENT_LIST_LOADING = 'ANNOUNCEMENT_LIST_LOADING';
const ANNOUNCEMENT_LIST_LOADED = 'ANNOUNCEMENT_LIST_LOADED';
const ANNOUNCEMENT_LIST_FAILED = 'ANNOUNCEMENT_LIST_FAILED';

const fetchAnnouncements = () => {
  return (dispatch) => {
    dispatch({ type: ANNOUNCEMENT_LIST_LOADING });

    api.fetchModels('announcements')
      .then(announcements => {
        announcements = _.isArray(announcements) ? announcements : [announcements];

        dispatch({
          type: ANNOUNCEMENT_SET,
          payload: announcements
        });
        dispatch({ type: ANNOUNCEMENT_LIST_LOADED });
      })
      .catch(error => dispatch({ type: ANNOUNCEMENT_LIST_FAILED }));
  }
};

export {
  ANNOUNCEMENT_SET,
  ANNOUNCEMENT_LIST_LOADING,
  ANNOUNCEMENT_LIST_LOADED,
  ANNOUNCEMENT_LIST_FAILED,
  fetchAnnouncements
};
