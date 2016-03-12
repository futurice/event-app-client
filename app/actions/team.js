'use strict';

import api from '../services/api';

const REQUEST_TEAMS = 'FETCH_TEAMS';
const RECEIVE_TEAMS = 'RECEIVE_TEAMS';
const ERROR_REQUESTING_TEAMS = 'ERROR_REQUESTING_TEAMS';
const SELECT_TEAM = 'SELECT_TEAM';
const SHOW_TEAM_SELECTOR = 'SHOW_TEAM_SELECTOR';
const CLOSE_TEAM_SELECTOR = 'CLOSE_TEAM_SELECTOR';

const fetchTeams = () => {
  return dispatch => {
    dispatch({ type: REQUEST_TEAMS });
    api.fetchTeams()
      .then(teams => dispatch({ type: RECEIVE_TEAMS, payload: teams }))
      .catch(e => dispatch({ type: ERROR_REQUESTING_TEAMS, error: e }));
  };
};

const selectTeam = team => {
  return dispatch => {
    dispatch({ type: CLOSE_TEAM_SELECTOR });
    dispatch({ type: SELECT_TEAM, payload: team });
  }
};

const showChooseTeam = () => {
  return { type: SHOW_TEAM_SELECTOR };
};

export {
  REQUEST_TEAMS,
  RECEIVE_TEAMS,
  ERROR_REQUESTING_TEAMS,
  SELECT_TEAM,
  SHOW_TEAM_SELECTOR,
  CLOSE_TEAM_SELECTOR,
  fetchTeams,
  selectTeam,
  showChooseTeam
};
