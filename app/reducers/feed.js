'use strict';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

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
  VOTE_FEED_ITEM_REQUEST,
  OPEN_LIGHTBOX,
  CLOSE_LIGHTBOX,
  SET_COMMENTS
} from '../actions/feed';
import LoadingStates from '../constants/LoadingStates';


// # Selectors
export const getFeed = state => state.feed.get('list') || Immutable.List([]);
export const getLightBoxItemId = state => state.feed.get('lightBoxItemId', null);

export const getAllPostsInStore = getFeed;

export const getLightboxItem = createSelector(
  getLightBoxItemId, getAllPostsInStore,
  (id, posts) => {

    if (isNil(id)) {
      return Immutable.Map();
    }

    return posts.find((item) => item.get('id') === id);
  }
);

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
  lightBoxItem: {},
  isLightBoxOpen: false
});

function addNewItemToFeed(fetchedItems, oldDataImmutable) {

  const oldDataIds = oldDataImmutable.map(item => item.get('id'));

  const newData = fetchedItems.filter(item => {
    return (oldDataIds).indexOf(item.id) < 0
  });

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
      console.log(action.feed);
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
    case DELETE_FEED_ITEM: {
      const originalList = state.get('list');
      const itemIndex = originalList.findIndex((item) => item.get('id') === action.item.id);

      if (itemIndex < 0) {
        console.log('Tried to delete item, but it was not found from state:', itemIndex);
        return state;
      } else {
        return state.set('list', originalList.delete(itemIndex));
      }
    }

    case VOTE_FEED_ITEM_REQUEST: {
      const list = state.get('list');
      const voteItemIndex = list.findIndex((item) => item.get('id') === action.feedItemId);
      if (voteItemIndex < 0) {
        console.log('Tried to vote item, but it was not found from state:', voteItemIndex);
        return state;
      } else {
        return state.mergeIn(['list', voteItemIndex], {
          'userVote': action.value,
          'voteCount': action.votes
        });
      }
    }


    case OPEN_LIGHTBOX:
      return state.merge({
        isLightBoxOpen: true,
        lightBoxItem: Immutable.fromJS(action.payload.item)
      });
    case CLOSE_LIGHTBOX:
      return state.merge({
        isLightBoxOpen: false,
        lightBoxItem: Immutable.fromJS({}),
      })

    case SET_COMMENTS: {
      const list = state.get('list');
      const itemIndex = list.findIndex((item) => item.get('id') === action.payload.postId);

      if (itemIndex < 0) {
        console.log('Tried to update comment count for post, but it was not found from state:', itemIndex);
        return state;
      } else {
        return state.setIn(['list', itemIndex, 'commentCount'], action.payload.comments.length || 0);
      }
    }

    default:
      return state;
  }
}
