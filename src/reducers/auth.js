import * as types from 'constants/index';

const token = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!token,
  user: {},
  token,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };

    case types.RECEIVE_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };

    case types.RECEIVE_AUTH_FAILURE:
    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: ''
      };
    case types.LOGOUT_REQUEST:
      return state;
    default:
      return state;
  }
}
