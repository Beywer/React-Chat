import SocketClient from 'socket.io-client';
import {
  MOUNT_CHAT,
  RECEIVE_DELETE_CHAT,
  RECEIVE_MESSAGE, RECEIVE_NEW_CHAT, SEND_MESSAGE,
  SOCKET_CONNECTION_FAILURE, SOCKET_CONNECTION_MISSING, SOCKET_CONNECTION_REQUEST,
  SOCKET_CONNECTION_SUCCESS, UNMOUNT_CHAT
} from "constants/sockets";
import {getToken} from "reducers/auth";
import {getActiveChatId, getChatId} from "reducers/chats";
import {unsetActiveChat} from "actions/chats";
import {origin} from "utils/callApi";

let socket = null;

export function missingSocketConnection() {
  return {type: SOCKET_CONNECTION_MISSING};
}

export function socketsConnect() {
  return function (dispatch, getState) {
    dispatch({type: SOCKET_CONNECTION_REQUEST});

    const token = getToken(getState());
    socket = new SocketClient(`ws://${origin}`, {
      query: {token}
    });

    socket.on('connect', () => dispatch({type: SOCKET_CONNECTION_SUCCESS}));

    socket.on('error', () => dispatch({type: SOCKET_CONNECTION_FAILURE}));
    socket.on('connection_error', () => dispatch({type: SOCKET_CONNECTION_FAILURE}));

    socket.on('new-message', (message) => dispatch({type: RECEIVE_MESSAGE, payload: message}));
    socket.on('new-chat', ({chat}) => dispatch({type: RECEIVE_NEW_CHAT, payload: chat}));
    socket.on('delete-chat', ({chat}) => {
      dispatch({type: RECEIVE_DELETE_CHAT, payload: chat});

      const activeChatId = getActiveChatId(getState());
      if (activeChatId === getChatId(chat)) {
        dispatch(unsetActiveChat());
      }
    });
  }
}

export function sendMessage(content) {
  return function (dispatch, getState) {
    if (!socket) {
      return dispatch(missingSocketConnection());
    }

    const message = {content, chatId: getActiveChatId(getState())};
    socket.emit(
      'send-message',
      message,
      () => dispatch({type: SEND_MESSAGE, payload: message})
    );
  }
}

export function mountChat(chatId) {
  return function (dispatch, getState) {
    if (!socket) {
      return dispatch(missingSocketConnection());
    }

    socket.emit('mount-chat', chatId);
    dispatch({type: MOUNT_CHAT, payload: {chatId}});
  }
}

export function unmountChat(chatId) {
  return function (dispatch, getState) {
    if (!socket) {
      return dispatch(missingSocketConnection());
    }

    socket.emit('unmount-chat', chatId);
    dispatch({type: UNMOUNT_CHAT, payload: {chatId}})
  }
}
