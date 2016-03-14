'use strict';

import _ from 'lodash';
import moment from 'moment';

import ActionTypes from '../constants/ActionTypes';
import api from '../services/api';

const EVENT_SET = 'EVENT_SET';
const EVENT_LIST_LOADING = 'EVENT_LIST_LOADING';
const EVENT_LIST_LOADED = 'EVENT_LIST_LOADED';
const EVENT_LIST_FAILED = 'EVENT_LIST_FAILED';

const fetchEvents = () => {
  return (dispatch) => {
    dispatch({ type: EVENT_LIST_LOADING });

    api.fetchModels('events')
      .then(events => {
        dispatch({
          type: EVENT_SET,
          events: events
        });
        dispatch({ type: EVENT_LIST_LOADED });
      })
      .catch(error => dispatch({ type: EVENT_LIST_FAILED }));
  }
};

export {
  EVENT_SET,
  EVENT_LIST_LOADING,
  EVENT_LIST_LOADED,
  EVENT_LIST_FAILED,
  fetchEvents
};
