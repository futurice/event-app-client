'use strict';

import Immutable from 'immutable';
import {
  OPEN_REGISTRATION_VIEW,
  CLOSE_REGISTRATION_VIEW,
  UPDATE_NAME
} from '../actions/registration';

const initialState = Immutable.fromJS({
  isRegistrationViewOpen: false,
  name: ''
});

export default function registration(state = initialState, action) {
  switch (action.type) {
    case OPEN_REGISTRATION_VIEW:
      return state.set('isRegistrationViewOpen', true);
    case CLOSE_REGISTRATION_VIEW:
      return state.set('isRegistrationViewOpen', false);
    case UPDATE_NAME:
      return state.set('name', action.payload);
    default:
      return state;
  }
}
