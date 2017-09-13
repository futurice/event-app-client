

import Immutable from 'immutable';
import {
  UPDATE_LOCATION
} from '../actions/location';

const initialState = Immutable.fromJS({
  currentLocation: null
});

export default function competition(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      return state.set('currentLocation', action.payload);
    default:
      return state;
  }
};
