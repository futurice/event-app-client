import api from '../services/api';
import {createRequestActionTypes} from './index';

const SET_EVENT_LIST = 'SET_EVENT_LIST';
const {
  GET_EVENT_LIST_REQUEST,
  GET_EVENT_LIST_SUCCESS,
  GET_EVENT_LIST_FAILURE
} = createRequestActionTypes('GET_EVENT_LIST');

const UPDATE_EVENT_SHOWFILTER = 'UPDATE_EVENT_SHOWFILTER';
const TOGGLE_EVENT_MAP_LOCATE = 'TOGGLE_EVENT_MAP_LOCATE';

const fetchEvents = () => {
  return (dispatch) => {
    dispatch({ type: GET_EVENT_LIST_REQUEST });

    api.fetchModels('events')
      .then(events => {
        dispatch({
          type: SET_EVENT_LIST,
          payload: events
        });
        dispatch({ type: GET_EVENT_LIST_SUCCESS });
      })
      .catch(error => dispatch({ type: GET_EVENT_LIST_FAILURE, error: true, payload: error }));
  }
};

const updateShowFilter = filterName => {
  return { type: UPDATE_EVENT_SHOWFILTER, payload: filterName };
};

const toggleLocateMe = () => {
  return { type: TOGGLE_EVENT_MAP_LOCATE };
}

export {
  SET_EVENT_LIST,
  GET_EVENT_LIST_REQUEST,
  GET_EVENT_LIST_SUCCESS,
  GET_EVENT_LIST_FAILURE,
  UPDATE_EVENT_SHOWFILTER,
  TOGGLE_EVENT_MAP_LOCATE,
  fetchEvents,
  updateShowFilter,
  toggleLocateMe
};
