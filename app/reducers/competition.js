'use strict';

import Immutable from 'immutable';
import {
  POSTING_ACTION,
  ACTION_POST_SUCCESS,
  ACTION_POST_FAILURE
} from '../actions/competition';

const initialState = Immutable.fromJS({
  isSending: false,
  isError: false
});

export default function competition(state = initialState, action) {
  switch (action.type) {
    case POSTING_ACTION:
      return state.set('isSending', true);
    case ACTION_POST_SUCCESS:
      return state.set('isSending', false);
    case ACTION_POST_FAILURE:
      return state.merge({
        isSending: false,
        isError: true
      });
    default:
      return state;
  }
}
