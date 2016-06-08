import api from '../services/api';
import {createRequestActionTypes} from '.';

const SET_MARKER_LIST = 'SET_MARKER_LIST';
const {
  GET_MARKER_LIST_REQUEST,
  GET_MARKER_LIST_SUCCESS,
  GET_MARKER_LIST_FAILURE
} = createRequestActionTypes('GET_MARKER_LIST');

const fetchMarkers = () => {
  return (dispatch) => {
    dispatch({ type: GET_MARKER_LIST_REQUEST });

    api.fetchModels('markers')
      .then(events => {
        dispatch({
          type: SET_MARKER_LIST,
          payload: events
        });
        dispatch({ type: GET_MARKER_LIST_SUCCESS });
      })
      .catch(error => dispatch({ type: GET_MARKER_LIST_FAILURE, error: true, payload: error }));
  }
};

export {
  SET_MARKER_LIST,
  GET_MARKER_LIST_REQUEST,
  GET_MARKER_LIST_SUCCESS,
  GET_MARKER_LIST_FAILURE,
  fetchMarkers
};
