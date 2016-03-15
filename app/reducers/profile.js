'use strict';
import Immutable from 'immutable';

import {
  LINK_SET,
} from '../actions/profile';

const initialState = Immutable.fromJS({
  links: [],
});

export default function profile(state = initialState, action) {
  switch (action.type) {
    case LINK_SET:
      return state.set('links', Immutable.fromJS(action.links));
    default:
      return state;
  }
}
