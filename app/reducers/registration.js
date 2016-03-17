'use strict';

import Immutable from 'immutable';
import {
  CREATING_USER,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAILURE,
  OPEN_REGISTRATION_VIEW,
  CLOSE_REGISTRATION_VIEW,
  UPDATE_NAME,
  REQUEST_NAME,
  RECEIVE_USER,
  ERROR_REQUESTING_USER,
  SELECT_TEAM
} from '../actions/registration';

const initialState = Immutable.fromJS({
  isRegistrationViewOpen: false,
  name: '',
  selectedTeam: 0,
  isLoading: false,
  isError: false
});

export default function registration(state = initialState, action) {
  switch (action.type) {
    case OPEN_REGISTRATION_VIEW:
      return state.set('isRegistrationViewOpen', true);
    case CLOSE_REGISTRATION_VIEW:
      return state.set('isRegistrationViewOpen', false);
    case UPDATE_NAME:
      return state.set('name', action.payload);
    case SELECT_TEAM:
      return state.set('selectedTeam', action.payload);
    case CREATING_USER:
      return state.merge({
        'isLoading': true,
        'isError': false
      });
    case USER_CREATE_SUCCESS:
      return state.merge({
        'isLoading': false,
        'isError': false
      });
    case USER_CREATE_FAILURE:
      return state.merge({
        'isLoading': false,
        'isError': true
      });
    case RECEIVE_USER:
      return state.merge({'name': action.payload.name, 'selectedTeam': action.payload.team});
    default:
      return state;
  }
}
