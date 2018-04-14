import combineReducers from "redux/es/combineReducers";
import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, RECEIVE_AUTH_FAILURE, RECEIVE_AUTH_REQUEST,
  RECEIVE_AUTH_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST,
  SIGNUP_SUCCESS, UPDATE_USER_PROFILE_FAILURE, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS
} from "constants/auth";
import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST, CREATE_CHAT_SUCCESS, DELETE_CHAT_FAILURE, DELETE_CHAT_REQUEST, DELETE_CHAT_SUCCESS,
  FETCH_ALL_CHATS_FAILURE, FETCH_ALL_CHATS_REQUEST, FETCH_ALL_CHATS_SUCCESS,
  FETCH_CHAT_FAILURE, FETCH_CHAT_REQUEST, FETCH_CHAT_SUCCESS,
  FETCH_MY_CHATS_FAILURE, FETCH_MY_CHATS_REQUEST,
  FETCH_MY_CHATS_SUCCESS, JOIN_CHAT_FAILURE, JOIN_CHAT_REQUEST, JOIN_CHAT_SUCCESS, LEAVE_CHAT_FAILURE,
  LEAVE_CHAT_REQUEST, LEAVE_CHAT_SUCCESS
} from "constants/chats";
import {
  SOCKET_CONNECTION_FAILURE, SOCKET_CONNECTION_MISSING, SOCKET_CONNECTION_REQUEST,
  SOCKET_CONNECTION_SUCCESS
} from "constants/sockets";

const initialState = {
  isFetching: {
    signUp: false,
    logIn: false,
    logOut: false,
    receiveAuth: false,
    allChats: false,
    myChats: false,
    chat: false,
    createChat: false,
    joinChat: false,
    leaveChat: false,
    deleteChat: false,
    sockets: false,
    editUser: false
  },
  errors: {
    auth: null,
    chat: null
  },
  isConnected: false
};

export function isFetching(state = initialState.isFetching, action = {}) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {...state, signUp: true};
    case SIGNUP_SUCCESS:
    case SIGNUP_FAILURE:
      return {...state, signUp: false};

    case LOGIN_REQUEST:
      return {...state, logIn: true};
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
      return {...state, logIn: false};

    case LOGOUT_REQUEST:
      return {...state, logOut: true};
    case LOGOUT_SUCCESS:
    case LOGOUT_FAILURE:
      return {...state, logOut: false};

    case RECEIVE_AUTH_REQUEST:
      return {...state, receiveAuth: true};
    case RECEIVE_AUTH_SUCCESS:
    case RECEIVE_AUTH_FAILURE:
      return {...state, receiveAuth: false};

    case FETCH_ALL_CHATS_REQUEST:
      return {...state, allChats: true};
    case FETCH_ALL_CHATS_SUCCESS:
    case FETCH_ALL_CHATS_FAILURE:
      return {...state, allChats: false};

    case FETCH_MY_CHATS_REQUEST:
      return {...state, myChats: true};
    case FETCH_MY_CHATS_SUCCESS:
    case FETCH_MY_CHATS_FAILURE:
      return {...state, myChats: false};

    case FETCH_CHAT_REQUEST:
      return {...state, chat: true};
    case FETCH_CHAT_SUCCESS:
    case FETCH_CHAT_FAILURE:
      return {...state, chat: false};

    case CREATE_CHAT_REQUEST:
      return {...state, createChat: true};
    case CREATE_CHAT_SUCCESS:
    case CREATE_CHAT_FAILURE:
      return {...state, createChat: false};

    case JOIN_CHAT_REQUEST:
      return {...state, joinChat: true};
    case JOIN_CHAT_SUCCESS:
    case JOIN_CHAT_FAILURE:
      return {...state, joinChat: false};

    case LEAVE_CHAT_REQUEST:
      return {...state, leaveChat: true};
    case LEAVE_CHAT_SUCCESS:
    case LEAVE_CHAT_FAILURE:
      return {...state, leaveChat: false};

    case DELETE_CHAT_REQUEST:
      return {...state, deleteChat: true};
    case DELETE_CHAT_SUCCESS:
    case DELETE_CHAT_FAILURE:
      return {...state, deleteChat: false};

    case SOCKET_CONNECTION_REQUEST:
      return {...state, sockets: true};
    case SOCKET_CONNECTION_SUCCESS:
    case SOCKET_CONNECTION_FAILURE:
      return {...state, sockets: false};

    case UPDATE_USER_PROFILE_REQUEST:
      return {...state, editUser: true};
    case UPDATE_USER_PROFILE_SUCCESS:
    case UPDATE_USER_PROFILE_FAILURE:
      return {...state, editUser: false};

    default:
      return state;
  }
}

export function errors(state = initialState.errors, action = {}) {
  switch (action.type) {
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
      // Used for internal purposes
      // case RECEIVE_AUTH_FAILURE:
      return {...state, auth: action.payload.message};
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
      // case RECEIVE_AUTH_SUCCESS:
      return {...state, auth: null};

    case FETCH_MY_CHATS_FAILURE:
    case FETCH_ALL_CHATS_FAILURE:
    case FETCH_CHAT_FAILURE:
    case CREATE_CHAT_FAILURE:
    case JOIN_CHAT_FAILURE:
    case LEAVE_CHAT_FAILURE:
    case DELETE_CHAT_FAILURE:
    case SOCKET_CONNECTION_FAILURE:
    case UPDATE_USER_PROFILE_FAILURE:
      return {...state, chat: action.payload.message};

    case FETCH_MY_CHATS_SUCCESS:
    case FETCH_ALL_CHATS_SUCCESS:
    case FETCH_CHAT_SUCCESS:
    case CREATE_CHAT_SUCCESS:
    case JOIN_CHAT_SUCCESS:
    case LEAVE_CHAT_SUCCESS:
    case DELETE_CHAT_SUCCESS:
    case SOCKET_CONNECTION_SUCCESS:
    case UPDATE_USER_PROFILE_SUCCESS:
      return {...state, chat: null};

    default:
      return state;
  }
}

export function isConnected(state = initialState.isConnected, action = {}) {
  switch (action.type) {
    case SOCKET_CONNECTION_MISSING:
    case SOCKET_CONNECTION_FAILURE:
      return false;

    case SOCKET_CONNECTION_SUCCESS:
      return true;

    default:
      return state;
  }
}

export const isSignUpFetching = (state) => state.services.isFetching.signUp;
export const isLogInFetching = (state) => state.services.isFetching.logIn;
export const isLogOutFetching = (state) => state.services.isFetching.logOut;
export const isReceiveAuthFetching = (state) => state.services.isFetching.receiveAuth;
export const isAllChatsFetching = (state) => state.services.isFetching.allChats;
export const isMyChatsFetching = (state) => state.services.isFetching.myChats;
export const isChatFetching = (state) => state.services.isFetching.chat;
export const isCreateChatFetching = (state) => state.services.isFetching.createChat;
export const isJoinChatFetching = (state) => state.services.isFetching.joinChat;
export const isLeaveChatFetching = (state) => state.services.isFetching.leaveChat;
export const isDeleteChatFetching = (state) => state.services.isFetching.deleteChat;
export const isSocketsFetching = (state) => state.services.isFetching.sockets;
export const isEditUserFetching = (state) => state.services.isFetching.editUser;

export const getAuthErrorMessage = (state) => state.services.errors.auth;
export const getChatErrorMessage = (state) => state.services.errors.chat;

export const getIsConnected = (state) => state.services.isConnected;

export default combineReducers({
  isFetching, errors, isConnected
})
