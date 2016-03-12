'use strict';
import Immutable from 'immutable';

import {
  EVENT_SET,
  EVENT_LIST_LOADING,
  EVENT_LIST_LOADED,
  EVENT_LIST_FAILED
} from '../actions/event';

const initialState = Immutable.fromJS({
  list: [],
  listState: 'none'
});


export default function event(state = initialState, action) {
  switch (action.type) {
    case EVENT_SET:
      return state.set('list', Immutable.fromJS(action.events));
    case EVENT_LIST_LOADING:
      return state.set('listState', 'loading');
    case EVENT_LIST_LOADED:
      return state.set('listState', 'ready');
    case EVENT_LIST_FAILED:
      return state.set('listState', 'failed');
    default:
      return state;
  }
}
