'use strict';
import Immutable from 'immutable';

import {
  PHOTO_SET,
  PHOTO_LIST_LOADING,
  PHOTO_LIST_LOADED,
  PHOTO_LIST_FAILED
} from '../actions/photo';

const initialState = Immutable.fromJS({
  list: [],
  listState: 'none'
});


export default function photo(state = initialState, action) {
  switch (action.type) {
    case PHOTO_SET:
      return state.set('list', Immutable.fromJS(action.photos));
    case PHOTO_LIST_LOADING:
      return state.set('listState', 'loading');
    case PHOTO_LIST_LOADED:
      return state.set('listState', 'ready');
    case PHOTO_LIST_FAILED:
      return state.set('listState', 'failed');
    default:
      return state;
  }
}
