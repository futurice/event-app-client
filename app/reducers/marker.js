'use strict';
import Immutable from 'immutable';

import {
  MARKER_SET,
  MARKER_LIST_LOADING,
  MARKER_LIST_LOADED,
  MARKER_LIST_FAILED
} from '../actions/marker';

const initialState = Immutable.fromJS({
  list: [],
  listState: 'none'
});

export default function event(state = initialState, action) {
  switch (action.type) {
    case MARKER_SET:
      return state.set('list', Immutable.fromJS(action.payload));
    case MARKER_LIST_LOADING:
      return state.set('listState', 'loading');
    case MARKER_LIST_LOADED:
      return state.set('listState', 'ready');
    case MARKER_LIST_FAILED:
      return state.set('listState', 'failed');
    default:
      return state;
  }
}
