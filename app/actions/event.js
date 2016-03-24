'use strict';

import api from '../services/api';

const EVENT_SET = 'EVENT_SET';
const EVENT_LIST_LOADING = 'EVENT_LIST_LOADING';
const EVENT_LIST_LOADED = 'EVENT_LIST_LOADED';
const EVENT_LIST_FAILED = 'EVENT_LIST_FAILED';
const EVENT_SHOWFILTER_UPDATE = 'EVENT_SHOWFILTER_UPDATE';
const EVENT_MAP_LOCATE_TOGGLE = 'EVENT_MAP_LOCATE_TOGGLE';

const fetchEvents = () => {
  return (dispatch) => {
    dispatch({ type: EVENT_LIST_LOADING });

    api.fetchModels('events')
      .then(events => {
        dispatch({
          type: EVENT_SET,
          payload: events
        });
        dispatch({ type: EVENT_LIST_LOADED });
      })
      .catch(error => dispatch({ type: EVENT_LIST_FAILED }));
  }
};

const updateShowFilter = filterName => {
  return { type: EVENT_SHOWFILTER_UPDATE, payload: filterName };
};

const toggleLocateMe = () => {
  return { type: EVENT_MAP_LOCATE_TOGGLE };
}

export {
  EVENT_SET,
  EVENT_LIST_LOADING,
  EVENT_LIST_LOADED,
  EVENT_LIST_FAILED,
  EVENT_SHOWFILTER_UPDATE,
  EVENT_MAP_LOCATE_TOGGLE,
  fetchEvents,
  updateShowFilter,
  toggleLocateMe
};
