import Immutable from "immutable";

export default {
  collapsed: true,
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
