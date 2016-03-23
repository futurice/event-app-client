'use strict';

import api from '../services/api';

const MARKER_SET = 'MARKER_SET';
const MARKER_LIST_LOADING = 'MARKER_LIST_LOADING';
const MARKER_LIST_LOADED = 'MARKER_LIST_LOADED';
const MARKER_LIST_FAILED = 'MARKER_LIST_FAILED';

const fetchMarkers = () => {
  return (dispatch) => {
    dispatch({ type: MARKER_LIST_LOADING });

    api.fetchModels('markers')
      .then(events => {
        dispatch({
          type: MARKER_SET,
          payload: events
        });
        dispatch({ type: MARKER_LIST_LOADED });
      })
      .catch(error => dispatch({ type: MARKER_LIST_FAILED }));
  }
};

export {
  MARKER_SET,
  MARKER_LIST_LOADING,
  MARKER_LIST_LOADED,
  MARKER_LIST_FAILED,
  fetchMarkers
};
