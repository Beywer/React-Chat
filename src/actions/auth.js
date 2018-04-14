import { loginApi, logoutApi, receiveAuthApi, signupApi, updateUserProfileApi } from 'utils/api';
import * as types from 'constants/auth';
import { getToken } from 'reducers/auth';
import { fetchChat } from 'actions/chats';
import { getActiveChatId } from 'reducers/chats';
import {
  isEditUserFetching,
  isLogInFetching,
  isLogOutFetching,
  isReceiveAuthFetching,
  isSignUpFetching,
} from 'reducers/services';

export function signup(username, password) {
  return (dispatch, getState) => {
    if (isSignUpFetching(getState())) return Promise.resolve();

    dispatch({ type: types.SIGNUP_REQUEST });

    return signupApi(username, password)
      .then((json) => {
        if (!json.token) throw new Error('Token has not be provided');
        localStorage.setItem('token', json.token);
        dispatch({ type: types.SIGNUP_SUCCESS, payload: json });
      })
      .catch(err => dispatch({ type: types.SIGNUP_FAILURE, payload: err }));
  };
}

export function login(username, password) {
  return (dispatch, getState) => {
    if (isLogInFetching(getState())) return Promise.resolve();

    dispatch({ type: types.LOGIN_REQUEST });

    return loginApi(username, password)
      .then((json) => {
        if (!json.token) throw new Error('Token has not be provided');
        localStorage.setItem('token', json.token);
        dispatch({ type: types.LOGIN_SUCCESS, payload: json });
      })
      .catch(err => dispatch({ type: types.LOGIN_FAILURE, payload: err }));
  };
}

export function logout() {
  return (dispatch, getState) => {
    if (isLogOutFetching(getState())) return Promise.resolve();

    dispatch({ type: types.LOGOUT_REQUEST });

    return logoutApi()
      .then((data) => {
        localStorage.removeItem('token');
        dispatch({ type: types.LOGOUT_SUCCESS, payload: data });
      })
      .catch(err => dispatch({ type: types.LOGOUT_FAILURE, payload: err }));
  };
}

export function receiveAuth() {
  return function (dispatch, getState) {
    if (isReceiveAuthFetching(getState())) return Promise.resolve();

    dispatch({ type: types.RECEIVE_AUTH_REQUEST });

    const token = getToken(getState());
    return receiveAuthApi(token)
      .then(json => dispatch({ type: types.RECEIVE_AUTH_SUCCESS, payload: json }))
      .catch(err => dispatch({ type: types.RECEIVE_AUTH_FAILURE, payload: err }));
  };
}

export function updateUserProfile(username, firstName, lastName) {
  return function (dispatch, getState) {
    if (isEditUserFetching(getState())) return Promise.resolve();

    dispatch({ type: types.UPDATE_USER_PROFILE_REQUEST });

    const token = getToken(getState());
    return updateUserProfileApi(token, { username, firstName, lastName })
      .then((data) => {
        dispatch({ type: types.UPDATE_USER_PROFILE_SUCCESS, payload: data });
        dispatch(receiveAuth());

        const activeChatId = getActiveChatId(getState());
        if (activeChatId) {
          dispatch(fetchChat(activeChatId));
        }
      })
      .catch(err => dispatch({ type: types.UPDATE_USER_PROFILE_FAILURE, payload: err }));
  };
}
