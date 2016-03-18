'use strict';

import ActionTypes from '../constants/ActionTypes';
import api from '../services/api';

const FEED_SET = 'FEED_SET';
const FEED_APPEND = 'FEED_APPEND';
const FEED_LIST_LOADING = 'FEED_LIST_LOADING';
const FEED_LIST_LOADED = 'FEED_LIST_LOADED';
const FEED_LIST_FAILED = 'FEED_LIST_FAILED';
const FEED_LIST_REFRESHING = 'FEED_LIST_REFRESHING';
const FEED_LIST_REFRESHED = 'FEED_LIST_REFRESHED';
const FEED_ITEM_DELETE = 'FEED_ITEM_DELETE';

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
        dispatch({ type: FEED_LIST_LOADED });
      })
      .catch(error => dispatch({ type: FEED_LIST_REFRESHED }));
  }
};

const loadMoreItems = (lastID) => {
  return (dispatch) => {

    dispatch({ type: FEED_LIST_REFRESHING });
    api.fetchMoreFeed(lastID)
      .then(items => {
        dispatch({
          type: FEED_APPEND,
          feed: items
        });
        dispatch({ type: FEED_LIST_REFRESHED });
        dispatch({ type: FEED_LIST_LOADED });
      })
      .catch(error => dispatch({ type: FEED_LIST_REFRESHED }));
  }
};

const removeFeedItem = (item) => {
  return dispatch => {
    api.deleteFeedItem(item)
      .then(() => dispatch({
        type: FEED_ITEM_DELETE,
        item
      }))
      .catch(error => console.log('Error when trying to delete feed item', error));
  }
};

export {
  FEED_SET,
  FEED_APPEND,
  FEED_LIST_LOADING,
  FEED_LIST_LOADED,
  FEED_LIST_FAILED,
  FEED_LIST_REFRESHING,
  FEED_LIST_REFRESHED,
  FEED_ITEM_DELETE,

  fetchFeed,
  refreshFeed,
  loadMoreItems,
  removeFeedItem
};
