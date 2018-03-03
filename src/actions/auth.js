import {
  SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS,
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS
} from 'constants/index';
import fetch from "isomorphic-fetch";

export function signup(username, password) {
  return (dispatch) => {
    dispatch({type: SIGNUP_REQUEST});

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
      .then(json => {
        if (json.success) return json;
        throw new Error(json.message);
      })
      .then(json => {
        if (!json.token) throw new Error('Token has not be provided');
        localStorage.setItem('token', json.token);
        dispatch({type: SIGNUP_SUCCESS, payload: json})
      })
      .catch(err => dispatch({type: SIGNUP_FAILURE, payload: err}));
  }
}

export function login(username, password) {
  return (dispatch) => {
    dispatch({type: LOGIN_REQUEST});

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
      .then(json => {
        if (json.success) return json;
        throw new Error(json.message);
      })
      .then(json => {
        if (!json.token) throw new Error('Token has not be provided');
        localStorage.setItem('token', json.token);
        dispatch({type: LOGIN_SUCCESS, payload: json})
      })
      .catch(err => dispatch({type: LOGIN_FAILURE, payload: err}));
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({type: LOGOUT_REQUEST});
  }
}
