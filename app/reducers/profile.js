
import Immutable from 'immutable';

import {
  SET_LINK,
} from '../actions/profile';

const initialState = Immutable.fromJS({
  links: []
});

export default function profile(state = initialState, action) {
  switch (action.type) {
    case SET_LINK:
      return state.set('links', Immutable.fromJS(action.links));
    default:
      return state;
  }
}
