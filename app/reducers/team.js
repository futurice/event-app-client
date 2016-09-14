'use strict';
import Immutable from 'immutable';

import {
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAILURE,
  SHOW_TEAM_SELECTOR,
  CLOSE_TEAM_SELECTOR,
  SET_LEADERBOARD_FILTER
} from '../actions/team';

const initialState = Immutable.fromJS({
  teams: [],
  isLoading: false,
  isError: false,
  selectedTeam: null,
  isChooseTeamViewOpen: false,
  isRefreshing: false,
  leaderBoardFilter: null
});

export default function team(state = initialState, action) {
  switch (action.type) {
    case GET_TEAMS_REQUEST:
      return state.merge({
        isLoading: true,
        isError: false,
        isRefreshing: true
      });
    case GET_TEAMS_SUCCESS:
      return state.merge({
        isLoading: false,
        isError: false,
        teams: action.payload,
        isRefreshing: false
      });
    case GET_TEAMS_FAILURE:
      return state.merge({
        isLoading: false,
        isError: true,
        isRefreshing: false
      });
    case SET_LEADERBOARD_FILTER:
      return state.set('leaderBoardFilter', action.payload);
    case SHOW_TEAM_SELECTOR:
      return state.set('isChooseTeamViewOpen', true);
    case CLOSE_TEAM_SELECTOR:
      return state.set('isChooseTeamViewOpen', false);
    default:
      return state;
  }
};
