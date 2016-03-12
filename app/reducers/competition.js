'use strict';

import Immutable from 'immutable';
import {
  POSTING_ACTION,
  ACTION_POST_SUCCESS,
  ACTION_POST_FAILURE,
  REQUEST_ACTION_TYPES,
  RECEIVE_ACTION_TYPES,
  ERROR_REQUESTING_ACTION_TYPES,
  OPEN_TEXTACTION_VIEW,
  CLOSE_TEXTACTION_VIEW,
} from '../actions/competition';

const initialState = Immutable.fromJS({
  isSending: false,
  isError: false,
  isLoadingActionTypes: false,
  isErrorLoadingActionTypes: false,
  actionTypes: [],
  isTextActionViewOpen: false
});

export default function competition(state = initialState, action) {
  switch (action.type) {
    case OPEN_TEXTACTION_VIEW:
      return state.set('isTextActionViewOpen', true);
      break;
    case CLOSE_TEXTACTION_VIEW:
      return state.set('isTextActionViewOpen', false);
      break;
    case POSTING_ACTION:
      return state.merge({
        isSending: true,
        isError: false
      });
    case ACTION_POST_SUCCESS:
      return state.merge({
        isSending: false,
        isError: false
      });
    case ACTION_POST_FAILURE:
      return state.merge({
        isSending: false,
        isError: true
      });
    case REQUEST_ACTION_TYPES:
      return state.merge({
        isLoadingActionTypes: true,
        isErrorLoadingActionTypes: false
      });
    case RECEIVE_ACTION_TYPES: {
      return state.merge({
        isLoadingActionTypes: false,
        isErrorLoadingActionTypes: false,
        actionTypes: action.payload
      });
    }
    case ERROR_REQUESTING_ACTION_TYPES: {
      return state.merge({
        isLoadingActionTypes: false,
        isErrorLoadingActionTypes: true
      });
    }
    default:
      return state;
  }
}
