'use strict';
import Immutable from 'immutable';

import {
  ANNOUNCEMENT_SET,
  ANNOUNCEMENT_LIST_LOADING,
  ANNOUNCEMENT_LIST_LOADED,
  ANNOUNCEMENT_LIST_FAILED
} from '../actions/announcement';

const initialState = Immutable.fromJS({
  list: [],
  listState: 'none'
});


export default function announcement(state = initialState, action) {
  switch (action.type) {
    case ANNOUNCEMENT_SET:
      return state.set('list', Immutable.fromJS(action.payload));
    case ANNOUNCEMENT_LIST_LOADING:
      return state.set('listState', 'loading');
    case ANNOUNCEMENT_LIST_LOADED:
      return state.set('listState', 'ready');
    case ANNOUNCEMENT_LIST_FAILED:
      return state.set('listState', 'failed');
    default:
      return state;
  }
}
