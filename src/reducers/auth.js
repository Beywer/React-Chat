import * as types from 'constants/auth';

const token = localStorage.getItem('token');

const initialState = {
  user: {},
  token,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case types.RECEIVE_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };

    case types.RECEIVE_AUTH_FAILURE:
    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        token: '',
      };
    case types.LOGOUT_REQUEST:
      return state;
    default:
      return state;
  }
}

export const isAuthenticated = state => !!getToken(state);
export const getCurrentUser = state => state.auth.user;
export const getToken = state => state.auth.token;

export const getUserId = user => user._id;
export const getUsername = user => user.username;
export const getUserFirstName = user => user.firstName;
export const getUserLastName = user => user.lastName;
