'use strict';
import Immutable from 'immutable';

import {
  SET_ANNOUNCEMENT_LIST,
  GET_ANNOUNCEMENT_LIST_REQUEST,
  GET_ANNOUNCEMENT_LIST_SUCCESS,
  GET_ANNOUNCEMENT_LIST_FAILURE
} from '../actions/announcement';

const initialState = Immutable.fromJS({
  list: [],
  listState: 'none'
});

export default function announcement(state = initialState, action) {
  switch (action.type) {
    case SET_ANNOUNCEMENT_LIST:
      return state.set('list', Immutable.fromJS(action.payload));
    case GET_ANNOUNCEMENT_LIST_REQUEST:
      return state.set('listState', 'loading');
    case GET_ANNOUNCEMENT_LIST_SUCCESS:
      return state.set('listState', 'ready');
    case GET_ANNOUNCEMENT_LIST_FAILURE:
      return state.set('listState', 'failed');
    default:
      return state;
  }
}
