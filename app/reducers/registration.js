


import { APP_STORAGE_KEY } from '../../env';
import { AsyncStorage } from 'react-native';
import { fromJS } from 'immutable';
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  OPEN_REGISTRATION_VIEW,
  CLOSE_REGISTRATION_VIEW,
  UPDATE_NAME,
  UPDATE_PROFILE,
  UPDATE_CODE,
  DISMISS_INTRODUCTION,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SELECT_TEAM,
  OPEN_LOGIN_VIEW,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  CLOSE_WELCOME_VIEW,
  POST_PROFILE_PICTURE_REQUEST,
  POST_PROFILE_PICTURE_SUCCESS,
  POST_PROFILE_PICTURE_FAILURE,
} from '../actions/registration';


const appUserKey = `${APP_STORAGE_KEY}:user`;
const appCodeKey = `${APP_STORAGE_KEY}:code`;

const initialState = fromJS({
  isRegistrationViewOpen: false,
  name: '',
  email: '',
  picture: '',
  code: '',
  selectedTeam: 0,
  isLoading: false,
  isError: false,
  isIntroductionDismissed: false,
  isIntroViewOpen: false,
  loginFailed: false,
  isWelcomeScreenOpen: false,
  loggedUserName: '',
  isLoadingProfilePicture: false,
});

function saveUserToDevice(user) {
  try {
    AsyncStorage.setItem(appUserKey, JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}

function saveCodeToDevice(code) {
  try {
    AsyncStorage.setItem(appCodeKey, code);
  } catch (error) {
    console.log(error);
  }
}


export default function registration(state = initialState, action) {
  switch (action.type) {
    case OPEN_REGISTRATION_VIEW:
      return state.set('isRegistrationViewOpen', true);
    case CLOSE_REGISTRATION_VIEW:
      return state.merge({
        isIntroductionDismissed: false,
        isRegistrationViewOpen: false
      });
    case DISMISS_INTRODUCTION:
      return state.set('isIntroductionDismissed', true);
    case UPDATE_NAME:
      return state.set('name', action.payload);
    case UPDATE_PROFILE: {
      return state.merge(fromJS({
        name: action.payload.name,
        email: action.payload.email,
        code: action.payload.code,
        picture: action.payload.picture
      }));
    }

    case UPDATE_CODE: {
      return state.set('code', action.payload);
    }

    case SELECT_TEAM:
      return state.set('selectedTeam', action.payload);
    case CREATE_USER_REQUEST:
      return state.merge({
        isLoading: true,
        isError: false
      });
    case GET_USER_REQUEST:
    case LOGIN_USER_REQUEST:
      return state.set('isLoading', true);
    case CREATE_USER_SUCCESS:
      return state.merge({
        isLoading: false,
        isError: false
      });
    case CREATE_USER_FAILURE:
    case GET_USER_FAILURE:
      return state.merge({
        isLoading: false,
        isError: true
      });
    case GET_USER_SUCCESS:
      return state.merge({
        name: action.payload.name,
        email: action.payload.email,
        picture: action.payload.picture,
        selectedTeam: action.payload.team,
        uuid: action.payload.uuid,
        isLoading: false
      });
    case OPEN_LOGIN_VIEW:
      return state.set('isIntroViewOpen', true);
    case LOGIN_USER_SUCCESS:
      saveUserToDevice(action.payload.user);
      saveCodeToDevice(action.payload.code);
      return state.merge({
        loginFailed: false,
        isIntroViewOpen: false,
        isLoading: false,
        isWelcomeScreenOpen: true,
        loggedUserName: action.payload.user.name
      });
    case LOGIN_USER_FAILURE:
      return state.merge({
        loginFailed: true,
        isIntroViewOpen: true,
        isLoading: false
      })
    case CLOSE_WELCOME_VIEW:
      return state.merge({
        isIntroViewOpen: false,
        isWelcomeScreenOpen: false
      })
    case POST_PROFILE_PICTURE_REQUEST: {
      return state.set('isLoadingProfilePicture', true);
    }
    case POST_PROFILE_PICTURE_SUCCESS:
    case POST_PROFILE_PICTURE_FAILURE: {
      return state.set('isLoadingProfilePicture', false);
    }
    default:
      return state;
  }
}
