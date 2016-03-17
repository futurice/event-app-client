import DeviceInfo from 'react-native-device-info';
import api from '../services/api';

const CREATING_USER = 'CREATING_USER';
const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS';
const USER_CREATE_FAILURE = 'USER_CREATE_FAILURE';
const OPEN_REGISTRATION_VIEW = 'OPEN_REGISTRATION_VIEW';
const CLOSE_REGISTRATION_VIEW = 'CLOSE_REGISTRATION_VIEW';
const UPDATE_NAME = 'UPDATE_NAME';
const REQUEST_NAME = 'REQUEST_NAME';
const RECEIVE_USER = 'RECEIVE_NAME';
const ERROR_REQUESTING_USER = 'ERROR_REQUESTING_USER';
const SELECT_TEAM = 'SELECT_TEAM';
const CLOSE_TEAM_SELECTOR = 'CLOSE_TEAM_SELECTOR';
const openRegistrationView = () => {
  return { type: OPEN_REGISTRATION_VIEW };
};

const closeRegistrationView = () => {
  return { type: CLOSE_REGISTRATION_VIEW };
};

const putUser = () => {
  return (dispatch, getStore) => {
    dispatch({ type: CREATING_USER });
    const uuid = DeviceInfo.getUniqueID();
    const name = getStore().registration.get('name');
    const team = getStore().registration.get('selectedTeam');
    return api.putUser({ uuid, name, team })
      .then(response => {
        dispatch({ type: USER_CREATE_SUCCESS });
        dispatch({ type: CLOSE_REGISTRATION_VIEW });
      })
      .catch(error => dispatch({ type: USER_CREATE_FAILURE, error: error }));
  };
};
const selectTeam = team => {
  return dispatch => {
    dispatch({ type: CLOSE_TEAM_SELECTOR });
    dispatch({ type: SELECT_TEAM, payload: team });
  }
};
const updateName = name => {
  return { type: UPDATE_NAME, payload: name };
};

const getUser = () => {
  return dispatch => {
    dispatch({ type: REQUEST_NAME });
    const uuid = DeviceInfo.getUniqueID();
    console.log("uuid:" + uuid);
    return api.getUser(uuid)
      .then(user => {
        dispatch({ type: RECEIVE_USER, payload: user });
      })
      .catch(error => {
        
        dispatch({ type: ERROR_REQUESTING_USER, error: error });
      });
  };
};

export {
  CREATING_USER,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAILURE,
  OPEN_REGISTRATION_VIEW,
  CLOSE_REGISTRATION_VIEW,
  UPDATE_NAME,
  REQUEST_NAME,
  RECEIVE_USER,
  ERROR_REQUESTING_USER,
  SELECT_TEAM,
  putUser,
  openRegistrationView,
  closeRegistrationView,
  updateName,
  getUser,
  selectTeam
};
