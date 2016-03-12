'use strict';
import Immutable from 'immutable';

import {
  FEED_SET,
  FEED_LIST_LOADING,
  FEED_LIST_LOADED,
  FEED_LIST_FAILED
} from '../actions/feed';

const initialState = Immutable.fromJS({
  list: [],
  listState: 'none'
});

export default function feed(state = initialState, action) {
  switch (action.type) {
    case FEED_SET:
      return state.set('list', Immutable.fromJS(action.feed));
    case FEED_LIST_LOADING:
      return state.set('listState', 'loading');
    case FEED_LIST_LOADED:
      return state.set('listState', 'ready');
    case FEED_LIST_FAILED:
      return state.set('listState', 'failed');
    default:
      return state;
  }
}
