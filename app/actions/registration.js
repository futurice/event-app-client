import DeviceInfo from 'react-native-device-info';
import api from '../services/api';

const CREATING_USER = 'CREATING_USER';
const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS';
const USER_CREATE_FAILURE = 'USER_CREATE_FAILURE';
const OPEN_REGISTRATION_VIEW = 'OPEN_REGISTRATION_VIEW';
const CLOSE_REGISTRATION_VIEW = 'CLOSE_REGISTRATION_VIEW';
const UPDATE_NAME = 'UPDATE_NAME';

const openRegistrationView = () => {
  return { type: OPEN_REGISTRATION_VIEW };
};

const closeRegistrationView = () => {
  return { type: CLOSE_REGISTRATION_VIEW };
};

/**
 * Create/update user based on UUID
 * @param  {String} uuid UUID of the device / user
 * @param  {String} name The name of the user
 */
const createUser = () => {
  return (dispatch, getStore) => {
    dispatch({ type: CREATING_USER });
    const uuid = DeviceInfo.getUniqueID();
    const name = getStore().registration.get('name');
    return api.createUser({ uuid, name })
      .then(response => {
        dispatch({ type: USER_CREATE_SUCCESS })
        dispatch({ type: CLOSE_REGISTRATION_VIEW })
      })
      .catch(error => dispatch({ type: USER_CREATE_FAILURE }));
  };
};

const updateName = name => {
  return { type: UPDATE_NAME, payload: name };
};

export {
  CREATING_USER,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAILURE,
  OPEN_REGISTRATION_VIEW,
  CLOSE_REGISTRATION_VIEW,
  UPDATE_NAME,
  createUser,
  openRegistrationView,
  closeRegistrationView,
  updateName
};
