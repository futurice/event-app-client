'use strict';
import Immutable from 'immutable';
import _ from 'lodash';

import {
  SET_FEED,
  APPEND_FEED,
  UPDATE_FEED,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE,
  REFRESH_FEED_REQUEST,
  REFRESH_FEED_SUCCESS,
  DELETE_FEED_ITEM,
  OPEN_LIGHTBOX,
  CLOSE_LIGHTBOX
} from '../actions/feed';
import LoadingStates from '../constants/LoadingStates';

const initialFeedItem = {
  type: 'TEXT',
  text: 'You have reached the bottom, now party on!',
  author: {
    name: 'test'
  }
}

const initialState = Immutable.fromJS({
  list: [initialFeedItem],
  listState: LoadingStates.NONE,
  isRefreshing: false,
  lightBoxImage: 'https://images.unsplash.com/photo-1461823385004-d7660947a7c0?dpr=2&auto=compress,format&crop=entropy&fit=crop&w=376&h=251&q=80&cs=tinysrgb',
  isLightBoxOpen: false
});

function addNewItemToFeed(fetchedItems, oldDataImmutable) {

  const oldDataIds = oldDataImmutable.map(item => item.get('id'));

  const newData = fetchedItems.filter(item => {
    return (oldDataIds).indexOf(item.id) < 0
  });

  console.log(newData);
  return newData;

}

export default function feed(state = initialState, action) {
  switch (action.type) {
    case SET_FEED:
      return state.set('list', Immutable.fromJS(action.feed));
    case APPEND_FEED:
      return (action.feed && action.feed.length) ?
        state.set('list', Immutable.fromJS(state.get('list')
          .concat(Immutable.fromJS(action.feed)))) :
        state;
    case UPDATE_FEED:
      return (action.feed && action.feed.length) ?
        state.set('list', Immutable.fromJS(addNewItemToFeed(action.feed, state.get('list')))
          .concat(state.get('list'))) :
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
    case OPEN_LIGHTBOX:
      return state.merge({
        isLightBoxOpen: true,
        lightBoxImage: action.payload
      });
    case CLOSE_LIGHTBOX:
      return state.merge({
        isLightBoxOpen: false,
        lightBoxImage: null
      })

    default:
      return state;
  }
}
