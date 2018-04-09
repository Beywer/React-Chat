import * as types from "constants/chats";
import {redirect} from "actions/services";
import {
  createChatApi, deleteChatApi, getAllChatsApi, getChatApi, getMyChatsApi, joinChatApi, leaveChatApi
} from "utils/api";
import {getActiveChatId, getChatId} from "reducers/chats";
import {getToken} from "reducers/auth";
import {mountChat, unmountChat} from "actions/sockets";
import {
  isAllChatsFetching, isChatFetching, isCreateChatFetching, isDeleteChatFetching, isJoinChatFetching,
  isLeaveChatFetching, isMyChatsFetching
} from "reducers/services";

export function fetchMyChats() {
  return function (dispatch, getState) {
    if (isMyChatsFetching(getState())) return Promise.resolve();

    dispatch({type: types.FETCH_MY_CHATS_REQUEST});

    const token = getToken(getState());
    return getMyChatsApi(token)
      .then(data => dispatch({type: types.FETCH_MY_CHATS_SUCCESS, payload: data}))
      .catch(error => dispatch({type: types.FETCH_MY_CHATS_FAILURE, payload: error}))
  }
}

export function fetchAllChats() {
  return function (dispatch, getState) {
    if (isAllChatsFetching(getState())) return Promise.resolve();

    dispatch({type: types.FETCH_ALL_CHATS_REQUEST});

    const token = getToken(getState());
    return getAllChatsApi(token)
      .then(data => dispatch({type: types.FETCH_ALL_CHATS_SUCCESS, payload: data}))
      .catch(error => dispatch({type: types.FETCH_ALL_CHATS_FAILURE, payload: error}))
  }
}

export function fetchChat(chatId) {
  return function (dispatch, getState) {
    if (isChatFetching(getState())) return Promise.resolve();

    dispatch({type: types.FETCH_CHAT_REQUEST});

    const token = getToken(getState());
    return getChatApi(chatId, token)
      .then(data => {
        dispatch({type: types.FETCH_CHAT_SUCCESS, payload: data});
        return data;
      })
      .catch(error => {
        dispatch({type: types.FETCH_CHAT_FAILURE, payload: error});
        return null; // иначе setActiveChat примет action и попытается сделать его активным чатом
      })
  }
}

export function setActiveChat(chatId) {
  return function (dispatch, getState) {

    const prevActiveChatId = getActiveChatId(getState());
    if (prevActiveChatId) dispatch(unmountChat(prevActiveChatId));

    return dispatch(fetchChat(chatId))
      .then(data => {
        if (!data) {
          return dispatch(unsetActiveChat());
        }

        dispatch({type: types.SET_ACTIVE_CHAT, payload: data});
        dispatch(redirect(`/chat/${getChatId(data.chat)}`));
        dispatch(mountChat(chatId));
      })
  }
}

export function unsetActiveChat() {
  return function (dispatch) {
    dispatch({type: types.UNSET_ACTIVE_CHAT});
    dispatch(redirect('/chat'));
  }
}

export function createChat(title) {
  return function (dispatch, getState) {
    if (isCreateChatFetching(getState())) return Promise.resolve();

    dispatch({type: types.CREATE_CHAT_REQUEST});

    const token = getToken(getState());
    return createChatApi(title, token)
      .then(data => dispatch({type: types.CREATE_CHAT_SUCCESS, payload: data}))
      .catch(error => dispatch({type: types.CREATE_CHAT_FAILURE}));
  }
}

export function deleteChat(chatId) {
  return function (dispatch, getState) {
    if (isDeleteChatFetching(getState())) return Promise.resolve();

    dispatch({type: types.DELETE_CHAT_REQUEST});

    const token = getToken(getState());
    return deleteChatApi(chatId, token)
      .then(data => {
        dispatch(unsetActiveChat());
        dispatch({type: types.DELETE_CHAT_SUCCESS, payload: data});
      })
      .catch(err => dispatch({type: types.DELETE_CHAT_FAILURE, payload: err}));
  }
}

export function joinChat(chatId) {
  return function (dispatch, getState) {
    if (isJoinChatFetching(getState())) return Promise.resolve();

    dispatch({type: types.JOIN_CHAT_REQUEST});

    const token = getToken(getState());
    return joinChatApi(chatId, token)
      .then(data => {
        dispatch(fetchChat(chatId));
        dispatch({type: types.JOIN_CHAT_SUCCESS, payload: data})
      })
      .catch(err => dispatch({type: types.JOIN_CHAT_FAILURE, payload: err}));
  }
}

export function leaveChat(chatId) {
  return function (dispatch, getState) {
    if (isLeaveChatFetching(getState())) return Promise.resolve();

    dispatch({type: types.LEAVE_CHAT_REQUEST});

    const token = getToken(getState());
    return leaveChatApi(chatId, token)
      .then(data => {
        dispatch(fetchChat(chatId));
        dispatch({type: types.LEAVE_CHAT_SUCCESS, payload: data})
      })
      .catch(err => dispatch({type: types.LEAVE_CHAT_FAILURE, payload: err}));
  }
}
