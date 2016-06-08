'use strict';
import Immutable from 'immutable';

import {
  SET_MARKER_LIST,
  GET_MARKER_LIST_REQUEST,
  GET_MARKER_LIST_SUCCESS,
  GET_MARKER_LIST_FAILURE
} from '../actions/marker';

const initialState = Immutable.fromJS({
  list: [],
  listState: 'none'
});

export default function event(state = initialState, action) {
  switch (action.type) {
    case SET_MARKER_LIST:
      return state.set('list', Immutable.fromJS(action.payload));
    case GET_MARKER_LIST_REQUEST:
      return state.set('listState', 'loading');
    case GET_MARKER_LIST_SUCCESS:
      return state.set('listState', 'ready');
    case GET_MARKER_LIST_FAILURE:
      return state.set('listState', 'failed');
    default:
      return state;
  }
}
