import Immutable from 'immutable';
import _ from 'lodash';
import {REQUEST_ACTION_SUFFIXES} from '../actions';
const initialState = Immutable.fromJS({
  errorMessage: null
});

function getErrorMessage(action) {
  const body = _.get(action, 'error.responseJson');
  if (body) {
    const showUser = _.get(body, 'showUser');
    return showUser ? _.get(body, 'message') : null;
  }
}

export default function errors(state = initialState, action) {
  if (_.endsWith(action.type, REQUEST_ACTION_SUFFIXES.FAILURE)) {
    const message = getErrorMessage(action);
    if (message) {
      return state.set('errorMessage', message);
    }
  }

  if (action.type === 'RESET_ERROR_MESSAGE') {
    return state.set('errorMessage', null);
  }

  return state;
};
