'use strict';
import Immutable from 'immutable';

import {
  SET_FEED,
  APPEND_FEED,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,
  REFRESH_FEED_REQUEST,
  REFRESH_FEED_SUCCESS,
  DELETE_FEED_ITEM
} from '../actions/feed';
import LoadingStates from '../constants/LoadingStates';

const initialState = Immutable.fromJS({
  list: [],
  listState: LoadingStates.NONE,
  isRefreshing: false,
});

export default function feed(state = initialState, action) {
  switch (action.type) {
    case SET_FEED:
      return state.set('list', Immutable.fromJS(action.feed));
    case APPEND_FEED:
      return (action.feed && action.feed.length) ?
        state.set('list', state.get('list').concat(action.feed)) :
        state;
    case GET_FEED_REQUEST:
      return state.set('listState', LoadingStates.LOADING);
    case GET_FEED_SUCCESS:
      return state.set('listState', LoadingStates.READY);
    case GET_FEED_FAILURE:
      return state.set('listState', LoadingStates.FAILED);
    case REFRESH_FEED_REQUEST:
      return state.set('isRefreshing', true);
    case REFRESH_FEED_SUCCESS:
      return state.set('isRefreshing', false);
    case DELETE_FEED_ITEM:
      const originalList = state.get('list');
      const itemIndex = originalList.findIndex((item) => item.get('id') === action.item.id);

      if (itemIndex < 0) {
        console.log('Tried to delete item, but it was not found from state:', itemIndex);
        return state;
      } else {
        return state.set('list', originalList.delete(itemIndex));
      }

    default:
      return state;
  }
}
