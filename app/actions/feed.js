'use strict';

import ActionTypes from '../constants/ActionTypes';
import api from '../services/api';

const FEED_SET = 'FEED_SET';
const FEED_LIST_LOADING = 'FEED_LIST_LOADING';
const FEED_LIST_LOADED = 'FEED_LIST_LOADED';
const FEED_LIST_FAILED = 'FEED_LIST_FAILED';
const FEED_LIST_REFRESHING = 'FEED_LIST_REFRESHING';
const FEED_LIST_REFRESHED = 'FEED_LIST_REFRESHED';

const fetchFeed = () => {
  return (dispatch) => {
    dispatch({ type: FEED_LIST_LOADING });

    api.fetchModels('feed')
      .then(items => {
        dispatch({
          type: FEED_SET,
          feed: items
        });

        dispatch({ type: FEED_LIST_LOADED });
      })
      .catch(error => dispatch({ type: FEED_LIST_FAILED }));
  }
};

const refreshFeed = () => {
  return (dispatch) => {

    dispatch({ type: FEED_LIST_REFRESHING });
    api.fetchModels('feed')
      .then(items => {
        dispatch({
          type: FEED_SET,
          feed: items
        });
        dispatch({ type: FEED_LIST_REFRESHED });
      })
      .catch(error => dispatch({ type: FEED_LIST_REFRESHED }));
  }
};

export {
  FEED_SET,
  FEED_LIST_LOADING,
  FEED_LIST_LOADED,
  FEED_LIST_FAILED,
  FEED_LIST_REFRESHING,
  FEED_LIST_REFRESHED,
  fetchFeed,
  refreshFeed
};
