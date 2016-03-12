'use strict';
import Immutable from 'immutable';

import {
  REQUEST_TEAMS,
  RECEIVE_TEAMS,
  ERROR_REQUESTING_TEAMS
} from '../actions/team';

const initialState = Immutable.fromJS({
  teams: [],
  isLoading: false,
  isError: false
});

export default function team(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TEAMS:
      return state.merge({
        isLoading: true,
        isError: false
      });
    case RECEIVE_TEAMS:
      return state.merge({
        isLoading: false,
        isError: false,
        teams: action.payload
      });
    case ERROR_REQUESTING_TEAMS:
      return state.merge({
        isLoading: false,
        isError: true
      });
    default:
      return state;
  }
};
