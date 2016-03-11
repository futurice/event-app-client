'use strict';
import Immutable from 'immutable';

import {
  EVENT_SET
} from '../actions/event';

const initialState = Immutable.fromJS({
  list: []
});


export default function event(state = initialState, action) {
  switch (action.type) {
    case EVENT_SET:
      return state.set('list', Immutable.fromJS(action.events));
    default:
      return state;
  }
}
