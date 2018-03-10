import * as types from "constants/chats";
import callApi from "utils/callApi";
import {redirect} from "actions/services";
import {createChatApi, deleteChatApi, getChatApi} from "utils/api";
import {getChatId} from "reducers/chats";

export function fetchMyChats() {
  return function (dispatch, getState) {
    const {token} = getState().auth;
    dispatch({type: types.FETCH_MY_CHATS_REQUEST});

    return callApi('/chats/my', token)
      .then(data => dispatch({type: types.FETCH_MY_CHATS_SUCCESS, payload: data}))
      .catch(error => dispatch({type: types.FETCH_MY_CHATS_FAILURE, payload: error}))
  }
}

export function fetchAllChats() {
  return function (dispatch, getState) {
    const {token} = getState().auth;
    dispatch({type: types.FETCH_ALL_CHATS_REQUEST});

    return callApi('/chats', token)
      .then(data => dispatch({type: types.FETCH_ALL_CHATS_SUCCESS, payload: data}))
      .catch(error => dispatch({type: types.FETCH_ALL_CHATS_FAILURE, payload: error}))
  }
}

export function fetchChat(chatId) {
  return function (dispatch, getState) {
    const {token} = getState().auth;
    dispatch({type: types.FETCH_CHAT_REQUEST});

    return getChatApi(chatId, token)
      .then(data => {
        dispatch({type: types.FETCH_CHAT_SUCCESS, payload: data});
        return data;
      })
      .catch(error => dispatch({type: types.FETCH_CHAT_FAILURE, payload: error}))
  }
}

export function setActiveChat(chatId) {
  return function (dispatch, getState) {
    return dispatch(fetchChat(chatId))
      .then(data => {
        if (!data) {
          return dispatch({type: types.UNSET_ACTIVE_CHAT});
        }

        dispatch(redirect(`/chat/${getChatId(data.chat)}`));
        dispatch({type: types.SET_ACTIVE_CHAT, payload: data});
      })
  }
}

export function createChat(title) {
  return function (dispatch, getState) {
    const {token} = getState().auth;
    dispatch({type: types.CREATE_CHAT_REQUEST});

    return createChatApi(title, token)
      .then(data => dispatch({type: types.CREATE_CHAT_SUCCESS, payload: data}))
      .catch(error => dispatch({type: types.CREATE_CHAT_FAILURE}));
  }
}

export function deleteChat(chatId) {
  return function (dispatch, getState) {
    const {token} = getState().auth;
    dispatch({type: types.DELETE_CHAT_REQUEST});

    return deleteChatApi(chatId, token)
      .then(data => {
        dispatch(redirect('/chat'));
        dispatch({type: types.UNSET_ACTIVE_CHAT});
        dispatch({type: types.DELETE_CHAT_SUCCESS, payload: data});
      })
      .catch(err => dispatch({type: types.DELETE_CHAT_FAILURE, payload: err}));
  }
}
