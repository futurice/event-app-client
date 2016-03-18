'use strict';
import Immutable from 'immutable';

import {
  FEED_SET,
  FEED_APPEND,
  FEED_LIST_LOADING,
  FEED_LIST_LOADED,
  FEED_LIST_FAILED,
  FEED_LIST_REFRESHING,
  FEED_LIST_REFRESHED,
} from '../actions/feed';

const initialState = Immutable.fromJS({
  list: [],
  listState: 'none',
  refreshState: false,
});

export default function feed(state = initialState, action) {
  switch (action.type) {
    case FEED_SET:
      return state.set('list', Immutable.fromJS(action.feed));
    case FEED_APPEND:
      console.log(state.get('list').concat(action.feed))
      return state.set('list', state.get('list').concat(action.feed));
    case FEED_LIST_LOADING:
      return state.set('listState', 'loading');
    case FEED_LIST_LOADED:
      return state.set('listState', 'ready');
    case FEED_LIST_FAILED:
      return state.set('listState', 'failed');
    case FEED_LIST_REFRESHING:
      return state.set('refreshState', true);
    case FEED_LIST_REFRESHED:
      return state.set('refreshState', false);
    default:
      return state;
  }
}
