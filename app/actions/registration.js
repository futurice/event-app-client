import DeviceInfo from 'react-native-device-info';
import api from '../services/api';
import namegen from '../services/namegen';
import _ from 'lodash';
import {createRequestActionTypes} from './index';

const {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE
} = createRequestActionTypes('CREATE_USER');
const {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} = createRequestActionTypes('GET_USER');

const {
  POST_PROFILE_PICTURE_REQUEST,
  POST_PROFILE_PICTURE_SUCCESS,
  POST_PROFILE_PICTURE_FAILURE
} = createRequestActionTypes('POST_PROFILE_PICTURE');

const OPEN_REGISTRATION_VIEW = 'OPEN_REGISTRATION_VIEW';
const CLOSE_REGISTRATION_VIEW = 'CLOSE_REGISTRATION_VIEW';
const UPDATE_NAME = 'UPDATE_NAME';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const UPDATE_CODE = 'UPDATE_CODE';
const SELECT_TEAM = 'SELECT_TEAM';
const CLOSE_TEAM_SELECTOR = 'CLOSE_TEAM_SELECTOR';
const DISMISS_INTRODUCTION = 'DISMISS_INTRODUCTION';

const openRegistrationView = () => {
  return { type: OPEN_REGISTRATION_VIEW };
};

const closeRegistrationView = () => {
  return { type: CLOSE_REGISTRATION_VIEW };
};

const dismissIntroduction = () => {
  return { type: DISMISS_INTRODUCTION };
};

const putUser = () => {
  return (dispatch, getStore) => {
    dispatch({ type: CREATE_USER_REQUEST });
    const uuid = DeviceInfo.getUniqueID();
    const name = getStore().registration.get('name');
    const team = getStore().registration.get('selectedTeam', '');
    const email = getStore().registration.get('email', '');
    const picture = getStore().registration.get('picture', '');

    return api.putUser({ uuid, name, team, picture, email })
      .then(response => {
        dispatch({ type: CREATE_USER_SUCCESS, payload: response });
        dispatch({ type: CLOSE_REGISTRATION_VIEW });
      })
      .catch(error => dispatch({ type: CREATE_USER_FAILURE, error: error }));
  };
};

const postProfilePicture = imageData => {
  return (dispatch, getStore) => {
    dispatch({ type: POST_PROFILE_PICTURE_REQUEST });
    const uuid = DeviceInfo.getUniqueID();

    return api.putUser({ uuid, imageData })
      .then(response => {
        dispatch(getUser())
        .then(() => {
          dispatch({ type: POST_PROFILE_PICTURE_SUCCESS, payload: response });
        });
      })
      .catch(error => dispatch({ type: POST_PROFILE_PICTURE_FAILURE, error: error }));
  };
}

const selectTeam = team => {
  return (dispatch, getStore) => {
    const teams = getStore().team.get('teams').toJS();
    const currentName = getStore().registration.get('name');
    const currentTeam = _.find(teams, ['id', team]);

    dispatch({ type: CLOSE_TEAM_SELECTOR });
    dispatch({ type: SELECT_TEAM, payload: team });
    // Generate new name if not given name
    // if (!currentName) {
    //   dispatch({ type: UPDATE_NAME, payload: namegen.generateName(currentTeam.name) });
    // }
  };
};
const updateName = name => ({ type: UPDATE_NAME, payload: name });
const updateProfile = profile => ({ type: UPDATE_PROFILE, payload: profile });
const updateCode = code => ({ type: UPDATE_CODE, payload: code });

const generateName = () => {
  return (dispatch, getStore) => {
    const currentTeamId = getStore().registration.get('selectedTeam');

    if (currentTeamId) {
      const teams = getStore().team.get('teams').toJS();
      const selectedTeam = _.find(teams, ['id', currentTeamId]);
      if (selectedTeam) {
        dispatch({ type: UPDATE_NAME, payload: namegen.generateName(selectedTeam.name) });
      }
    }
  };
};

const getUser = () => {
  return dispatch => {
    dispatch({ type: GET_USER_REQUEST });
    const uuid = DeviceInfo.getUniqueID();
    return api.getUser(uuid)
      .then(user => {
        dispatch({ type: GET_USER_SUCCESS, payload: user });
      })
      .catch(error => {
        dispatch({ type: GET_USER_FAILURE, error: error });
      });
  };
};



const {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE
} = createRequestActionTypes('LOGIN_USER');

const loginUser = (inviteCode) => {

  return dispatch => {
    const uuid = DeviceInfo.getUniqueID();
    const code = inviteCode ? inviteCode.toLowerCase() : '';
    dispatch({ type: LOGIN_USER_REQUEST });

    return api.loginUser({ code, uuid })
      .then(user => {
        if (user.status === 'OK'){
          const userResponse = user.user;
          const { name, email, team } = userResponse;

          selectTeam(team);
          dispatch(updateProfile({ name, email, code }));

          dispatch({ type: LOGIN_USER_SUCCESS, payload: { user: userResponse, code } })

          // return api.putUser({ uuid, name, team, email })
          //   .then(response => {
          //     dispatch({ type: LOGIN_USER_SUCCESS, payload: userResponse });
          //   })
          //   .catch(error => dispatch({ type: LOGIN_USER_FAILURE, error: error }));


        } else {
          dispatch({ type: LOGIN_USER_FAILURE });
        }
      })
      .catch(error => {
        dispatch({ type: LOGIN_USER_FAILURE, error: error });
      });
  }
};

const OPEN_LOGIN_VIEW = 'OPEN_LOGIN_VIEW';
const showLogin = () => {
  return { type: OPEN_LOGIN_VIEW };
};

const CLOSE_WELCOME_VIEW = 'CLOSE_WELCOME_VIEW';
const closeWelcome = () => {
  return { type: CLOSE_WELCOME_VIEW };
}


export {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  POST_PROFILE_PICTURE_REQUEST,
  POST_PROFILE_PICTURE_SUCCESS,
  POST_PROFILE_PICTURE_FAILURE,
  OPEN_REGISTRATION_VIEW,
  CLOSE_REGISTRATION_VIEW,
  UPDATE_NAME,
  UPDATE_PROFILE,
  UPDATE_CODE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SELECT_TEAM,
  DISMISS_INTRODUCTION,
  OPEN_LOGIN_VIEW,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  CLOSE_WELCOME_VIEW,
  putUser,
  postProfilePicture,
  openRegistrationView,
  closeRegistrationView,
  updateName,
  updateProfile,
  generateName,
  getUser,
  selectTeam,
  dismissIntroduction,
  loginUser,
  showLogin,
  closeWelcome,
  updateCode
};
