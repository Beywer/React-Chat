import * as types from 'constants/index';
import fetch from "isomorphic-fetch";

export function signup(username, password) {
  return (dispatch) => {
    dispatch({type: types.SIGNUP_REQUEST});

    return fetch('http://localhost:8000/v1/signup', {
      method: 'POST',
      query: {
        test1: 'asdfasd',
        test2: 23
      },
      body: JSON.stringify({username, password}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(throwOnError)
      .then(json => {
        if (!json.token) throw new Error('Token has not be provided');
        localStorage.setItem('token', json.token);
        dispatch({type: types.SIGNUP_SUCCESS, payload: json})
      })
      .catch(err => dispatch({type: types.SIGNUP_FAILURE, payload: err}));
  }
}

export function login(username, password) {
  return (dispatch) => {
    dispatch({type: types.LOGIN_REQUEST});

    return fetch('http://localhost:8000/v1/login', {
      method: 'POST',
      query: {
        test1: 'asdfasd',
        test2: 23
      },
      body: JSON.stringify({username, password}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(throwOnError)
      .then(json => {
        if (!json.token) throw new Error('Token has not be provided');
        localStorage.setItem('token', json.token);
        dispatch({type: types.LOGIN_SUCCESS, payload: json})
      })
      .catch(err => dispatch({type: types.LOGIN_FAILURE, payload: err}));
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({type: types.LOGOUT_REQUEST});
  }
}

export function receiveAuth() {
  return function (dispatch, getState) {
    const {token} = getState().auth;

    if (!token) {
      dispatch({type: types.RECEIVE_AUTH_FAILURE})
    }

    return fetch('http://localhost:8000/v1/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(throwOnError)
      .then(json => dispatch({type: types.LOGIN_SUCCESS, payload: json}))
      .catch(err => dispatch({type: types.LOGIN_FAILURE, payload: err}));
  }
}

function throwOnError(jsonResult) {
  if (jsonResult.success) return jsonResult;
  throw new Error(jsonResult.message);
}
