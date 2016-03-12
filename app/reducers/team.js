'use strict';
import Immutable from 'immutable';

import {
  REQUEST_TEAMS,
  RECEIVE_TEAMS,
  ERROR_REQUESTING_TEAMS,
  SELECT_TEAM
} from '../actions/team';

const initialState = Immutable.fromJS({
  teams: [],
  isLoading: false,
  isError: false,
  selectedTeam: null
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
    case SELECT_TEAM:
      return state.set('selectedTeam', action.payload);
    default:
      return state;
  }
};
