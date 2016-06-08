import Immutable from 'immutable';
import _ from 'lodash';
import {REQUEST_ACTION_SUFFIXES} from '../actions';
const initialState = Immutable.fromJS({
  error: null
});

function getError(action) {
  const body = _.get(action, 'error.responseJson');
  if (body) {
    const showUser = _.get(body, 'showUser');
    if (!showUser) {
      return null;
    }

    return Immutable.fromJS({
      header: _.get(body, 'header') || 'Error',
      message: _.get(body, 'message')
    });
  }
}

export default function errors(state = initialState, action) {
  if (_.endsWith(action.type, REQUEST_ACTION_SUFFIXES.FAILURE)) {
    const error = getError(action);
    if (error) {
      return state.set('error', error);
    }
  }

  if (action.type === 'RESET_ERROR_MESSAGE') {
    return state.set('error', null);
  }

  return state;
};
