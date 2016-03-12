'use strict';
import Immutable from 'immutable';

import {
  REQUEST_TEAMS,
  RECEIVE_TEAMS,
  ERROR_REQUESTING_TEAMS,
  SELECT_TEAM,
  SHOW_TEAM_SELECTOR,
  CLOSE_TEAM_SELECTOR
} from '../actions/team';

const initialState = Immutable.fromJS({
  teams: [],
  isLoading: false,
  isError: false,
  selectedTeam: null,
  isChooseTeamViewOpen: false
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
    case SHOW_TEAM_SELECTOR:
      return state.set('isChooseTeamViewOpen', true);
    case CLOSE_TEAM_SELECTOR:
      return state.set('isChooseTeamViewOpen', false);
    default:
      return state;
  }
};
