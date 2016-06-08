import Immutable from 'immutable';
import { UPDATE_COOLDOWNS } from '../actions/competition';

export default {
  collapsed: true,
  predicate: (state, action) => {
    // Don't log UPDATE_COOLDOWNS actions
    return action.type !== UPDATE_COOLDOWNS;
  },
  stateTransformer: state => {
    let newState = {};
    for (let i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }
    return newState;
  }
};
