import { Record, Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const LOGIN_USER_REQUEST = 'auth/LOGIN_USER_REQUEST';
const LOGIN_USER_RESPONSE = 'auth/LOGIN_USER_RESPONSE';
const CREATE_USER_REQUEST = 'auth/CREATE_USER_REQUEST';
const CREATE_USER_RESPONSE = 'auth/CREATE_USER_RESPONSE';
const RESET_PASSWORD_REQUEST = 'auth/RESET_PASSWORD_REQUEST';
const RESET_PASSWORD_RESPONSE = 'auth/RESET_PASSWORD_RESPONSE';
const GET_ACCESS_TOKEN_API_RESPONSE = 'auth/GET_ACCESS_TOKEN_API_RESPONSE';

const loginUserRequest = createAction(LOGIN_USER_REQUEST);
const loginUserResponse = createAction(LOGIN_USER_RESPONSE);
const createUserRequest = createAction(CREATE_USER_REQUEST);
const createUserResponse = createAction(CREATE_USER_RESPONSE);
const resetPasswordRequest = createAction(RESET_PASSWORD_REQUEST);
const resetPasswordResponse = createAction(RESET_PASSWORD_RESPONSE);
const getAccessTokenApiResponse = createAction(GET_ACCESS_TOKEN_API_RESPONSE);

const authenRecord = new Record({
  isUserLogin: false,
  isLogin: false,
  isCreateUser: false,
  isLoginSuccess: false,
  isResetPassword: false,
  resetPasswordResponse: null,
  token: Map()
});

const initialState = authenRecord();

/**
|--------------------------------------------------
| HANDLE ACTIONS
|--------------------------------------------------
*/
const actions = {
  [LOGIN_USER_REQUEST]: state => state.set('isLogin', true),
  [CREATE_USER_REQUEST]: state => state.set('isCreateUser', true),
  [RESET_PASSWORD_REQUEST]: state => state.set('isResetPassword', true)
};

export default handleActions(actions, initialState);
