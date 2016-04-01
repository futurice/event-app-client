'use strict';

import Immutable from 'immutable';
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  OPEN_REGISTRATION_VIEW,
  CLOSE_REGISTRATION_VIEW,
  UPDATE_NAME,
  DISMISS_INTRODUCTION,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SELECT_TEAM
} from '../actions/registration';

const initialState = Immutable.fromJS({
  isRegistrationViewOpen: false,
  name: '',
  selectedTeam: 0,
  isLoading: false,
  isError: false,
  isIntroductionDismissed: false
});

export default function registration(state = initialState, action) {
  switch (action.type) {
    case OPEN_REGISTRATION_VIEW:
      return state.set('isRegistrationViewOpen', true);
    case CLOSE_REGISTRATION_VIEW:
      return state.merge({
        isIntroductionDismissed: false,
        isRegistrationViewOpen: false
      });
    case DISMISS_INTRODUCTION:
      return state.set('isIntroductionDismissed', true);
    case UPDATE_NAME:
      return state.set('name', action.payload);
    case SELECT_TEAM:
      return state.set('selectedTeam', action.payload);
    case CREATE_USER_REQUEST:
      return state.merge({
        'isLoading': true,
        'isError': false
      });
    case GET_USER_REQUEST:
      return state.set('isLoading', true);
    case CREATE_USER_SUCCESS:
      return state.merge({
        'isLoading': false,
        'isError': false
      });
    case CREATE_USER_FAILURE:
    case GET_USER_FAILURE:
      return state.merge({
        'isLoading': false,
        'isError': true
      });
    case GET_USER_SUCCESS:
      return state.merge({
        'name': action.payload.name,
        'selectedTeam': action.payload.team,
        'uuid': action.payload.uuid,
        'isLoading': false
      });
    default:
      return state;
  }
}
