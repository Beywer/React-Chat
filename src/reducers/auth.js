import {
  SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS,
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS
} from 'constants/index';

const token = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!token,
  user: {},
  token,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };

    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: ''
      };
    case LOGOUT_REQUEST:
      return state;
    default:
      return state;
  }
}
