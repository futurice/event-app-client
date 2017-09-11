import { createSelector } from 'reselect';
import { fromJS, List, Map } from 'immutable';
import { isNil } from 'lodash';
import moment from 'moment';

import api from '../services/api';
import { createRequestActionTypes } from '../actions';;
import { getAllPostsInStore } from '../reducers/feed';
import ActionTypes from '../constants/ActionTypes';

// # Selectors
export const getComments = state => state.comments.get('comments', List([]));
export const isCommentsViewOpen = state => state.comments.get('isOpen', false);
export const isLoadingComments = state => state.comments.get('isLoading', false);
export const isLoadingCommentPost = state => state.comments.get('isPostLoading', false);
export const getCommentItemId =  state => state.comments.get('postId', null);
export const getCommentEditText = state => state.comments.get('editComment', null);

export const getCommentsCount = createSelector(
  getComments, (comments) => comments.size
);

export const getCommentItem = createSelector(
  getCommentItemId, getAllPostsInStore,
  (id, posts) => {

    if (isNil(id)) {
      return Map();
    }

    return posts.find((item) => item.get('id') === id);
  }
);


// # Action types & creators
const {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE
} = createRequestActionTypes('GET_COMMENTS');

const {
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE
} = createRequestActionTypes('POST_COMMENT');

const ADD_COMMENT = 'comments/ADD_COMMENT';
export const SET_COMMENTS = 'comments/SET_COMMENTS'; // update comment count for feed
const OPEN_COMMENTS = 'comments/OPEN_COMMENTS';
const CLOSE_COMMENTS = 'comments/CLOSE_COMMENTS';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';


export const editComment = payload => ({ type: EDIT_COMMENT, payload })

export const fetchPostComments = (postId) => (dispatch) => {
  dispatch({ type: GET_COMMENTS_REQUEST });
  return api.fetchComments(postId)
    .then(({ comments }) => {
      dispatch({
        type: SET_COMMENTS,
        payload: { comments, postId }
      });
      dispatch({ type: GET_COMMENTS_SUCCESS });
    })
    .catch(error => dispatch({ type: GET_COMMENTS_FAILURE, error: true, payload: error }));
}

export const refreshPostComments = (postId) => (dispatch) => {
  return api.fetchComments(postId)
    .then(({ comments }) => {
      dispatch({
        type: SET_COMMENTS,
        payload: { comments, postId }
      });
      dispatch({ type: GET_COMMENTS_SUCCESS });
    })
    .catch(error => dispatch({ type: GET_COMMENTS_FAILURE, error: true, payload: error }));
}


export const postComment = (text) => (dispatch, getState) => {

  const state = getState();
  const feedItemId = getCommentItemId(state);
  const payload = { text, feedItemId, type: ActionTypes.COMMENT };

  dispatch({ type: POST_COMMENT_REQUEST });
  return api.postAction(payload)
    .then(response => {
      // Fetch all comments to get latest comments
      // This is also good because we don't have any refersh mechanism
      Promise.resolve(
        dispatch(refreshPostComments(feedItemId))
      ).then(() => {
        dispatch({ type: POST_COMMENT_SUCCESS });
      });
    })
    .catch(error => dispatch({ type: POST_COMMENT_FAILURE, error: true, payload: error }));
}

export const openComments = (id) => (dispatch) => {
  dispatch(fetchPostComments(id));
  return dispatch({ type: OPEN_COMMENTS, payload: id })
}
export const closeComments = () => ({ type: CLOSE_COMMENTS });

// # Reducer
const initialState = fromJS({
  comments: [],
  editComment: null,
  isOpen: false,
  isLoading: false,
  postId: null,
  isPostLoading: false,
});

export default function comments(state = initialState, action) {
  switch (action.type) {
    case OPEN_COMMENTS:
      return state.merge({ postId: action.payload, isOpen: true });

    case CLOSE_COMMENTS:
      return state.merge({ comments: [], postId: null, isOpen: false, editComment: null });

    case SET_COMMENTS: {
      return state.set('comments', fromJS(action.payload.comments));
    }

    case ADD_COMMENT: {
      return state.set('comments', state.get('comments', List([])).push(fromJS(action.payload)));
    }

    case GET_COMMENTS_REQUEST: {
      return state.merge({
        comments: List([]),
        isLoading: true
      });
    }

    case GET_COMMENTS_SUCCESS:
    case GET_COMMENTS_FAILURE: {
      return state.set('isLoading', false);
    }

    case EDIT_COMMENT: {
      return state.set('editComment', action.payload);
    }

    case POST_COMMENT_REQUEST: {
      return state.set('isPostLoading', true);
    }
    case POST_COMMENT_FAILURE: {
      return state.set('isPostLoading', false);
    }

    case POST_COMMENT_SUCCESS: {
      return state.merge({
        editComment: '',
        isPostLoading: false,
      });
    }

    default: {
      return state;
    }
  }
}
