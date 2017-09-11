import api from '../services/api';
import {createRequestActionTypes} from './index';
import { getAllPostsInStore } from '../reducers/feed';
import { SET_COMMENTS as _SET_COMMENTS } from '../concepts/comments';

const SET_FEED = 'SET_FEED';
const APPEND_FEED = 'APPEND_FEED';
const UPDATE_FEED = 'UPDATE_FEED';
const SET_COMMENTS = _SET_COMMENTS;

const {
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILURE
} = createRequestActionTypes('GET_FEED');

const {
  REFRESH_FEED_REQUEST,
  REFRESH_FEED_SUCCESS,
  // Failure of refresh is also modeled as "success"
  // REFRESH_FEED_FAILURE
} = createRequestActionTypes('REFRESH_FEED');
const DELETE_FEED_ITEM = 'DELETE_FEED_ITEM';

const {
  VOTE_FEED_ITEM_REQUEST,
  VOTE_FEED_ITEM_SUCCESS,
} = createRequestActionTypes('VOTE_FEED_ITEM');

const fetchFeed = () => {
  return (dispatch) => {
    dispatch({ type: GET_FEED_REQUEST });

    api.fetchModels('feed')
      .then(items => {
        dispatch({
          type: SET_FEED,
          feed: items
        });

        dispatch({ type: GET_FEED_SUCCESS });
      })
      .catch(error => dispatch({ type: GET_FEED_FAILURE, error: true, payload: error }));
  };
};


const updateFeed = (afterId) => {
  return (dispatch) => {

    api.fetchUpdateFeed(afterId)
      .then(items => {
        dispatch({
          type: UPDATE_FEED,
          feed: items
        });

        // dispatch({ type: GET_FEED_SUCCESS });
      })
      .catch(error => dispatch({ type: GET_FEED_FAILURE, error: true, payload: error }));
  };
};


const refreshFeed = () => {
  return (dispatch) => {

    dispatch({ type: REFRESH_FEED_REQUEST });
    api.fetchModels('feed')
      .then(items => {
        dispatch({
          type: SET_FEED,
          feed: items
        });
        dispatch({ type: REFRESH_FEED_SUCCESS });
        dispatch({ type: GET_FEED_SUCCESS });
      })
      .catch(error => dispatch({ type: REFRESH_FEED_SUCCESS, error: true, payload: error }));
  };
};

const loadMoreItems = (lastID) => {
  return (dispatch) => {

    dispatch({ type: REFRESH_FEED_REQUEST });
    api.fetchMoreFeed(lastID)
      .then(items => {
        dispatch({
          type: APPEND_FEED,
          feed: items
        });
        dispatch({ type: REFRESH_FEED_SUCCESS });
        dispatch({ type: GET_FEED_SUCCESS });
      })
      .catch(error => dispatch({ type: REFRESH_FEED_SUCCESS }));
  };
};

const removeFeedItem = (item) => {
  return dispatch => {
    api.deleteFeedItem(item)
      .then(() => dispatch({
        type: DELETE_FEED_ITEM,
        item
      }))
      .catch(error => console.log('Error when trying to delete feed item', error));
  };
};


const voteFeedItem = (feedItemId, value) => (dispatch, getState) => {
  const state = getState();
  const list = getAllPostsInStore(state);
  const voteItem = list.find((item) => item.get('id') === feedItemId);

  if (!voteItem) {
    return;
  }

  //  userVote needs to be updated
  //  votevalue for item need to be calculated
  //    * if user had no previous vote, just sum given vote to vote values
  //    * if user had voted before, vote changes total value by +/-2
  const votes = voteItem.get('voteCount', 0);
  const userVote = voteItem.get('userVote');

  const wasAlreadyVotedByMe = !!userVote;
  const difference = wasAlreadyVotedByMe ? -1 : 1;

  const newVotes = parseInt(votes, 10) + difference;

  // Naive update before request starts
  dispatch({
    type: VOTE_FEED_ITEM_REQUEST,
    value,
    feedItemId,
    votes: newVotes
  });


  // Do actual API call for vote
  const vote = { value, feedItemId };

  api.voteFeedItem(vote)
  .then(() => dispatch({
    type: VOTE_FEED_ITEM_SUCCESS,
    difference,
    feedItemId
  }))
  .catch(error => console.log('Error when trying to vote feed item', error));
}

const OPEN_LIGHTBOX = 'OPEN_LIGHTBOX';
const CLOSE_LIGHTBOX = 'CLOSE_LIGHTBOX';
const openLightBox = (item) => {
  return { type: OPEN_LIGHTBOX, payload: { item } };
};

const closeLightBox = () => {
  return { type: CLOSE_LIGHTBOX };
};

export {
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
  VOTE_FEED_ITEM_SUCCESS,
  OPEN_LIGHTBOX,
  CLOSE_LIGHTBOX,
  SET_COMMENTS,

  updateFeed,
  fetchFeed,
  refreshFeed,
  loadMoreItems,
  removeFeedItem,
  voteFeedItem,
  openLightBox,
  closeLightBox
};
