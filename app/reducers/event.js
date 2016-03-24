'use strict';
import Immutable from 'immutable';

import {
  EVENT_SET,
  EVENT_LIST_LOADING,
  EVENT_LIST_LOADED,
  EVENT_LIST_FAILED,
  EVENT_SHOWFILTER_UPDATE,
  EVENT_MAP_LOCATE_TOGGLE
} from '../actions/event';

const initialState = Immutable.fromJS({
  list: [],
  listState: 'none',
  showFilter: '24H',
  locateMe: false
});

export default function event(state = initialState, action) {
  switch (action.type) {
    case EVENT_SET:
      return state.set('list', Immutable.fromJS(action.payload));
    case EVENT_LIST_LOADING:
      return state.set('listState', 'loading');
    case EVENT_LIST_LOADED:
      return state.set('listState', 'ready');
    case EVENT_LIST_FAILED:
      return state.set('listState', 'failed');
    case EVENT_SHOWFILTER_UPDATE:
      return state.set('showFilter', Immutable.fromJS(action.payload));
    case EVENT_MAP_LOCATE_TOGGLE:
      return state.set('locateMe', !state.get('locateMe'));
    default:
      return state;
  }
}
