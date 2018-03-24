import {SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS} from "constants/messages";
import {getActiveChatId} from "reducers/chats";
import {getToken} from "reducers/auth";
import {sendMessageApi} from "utils/api";
import {fetchChat} from "actions/chats";

export function sendMessage(message) {
  return function (dispatch, getState) {
    dispatch({type: SEND_MESSAGE_REQUEST});

    const activeChatId = getActiveChatId(getState());
    const token = getToken(getState());

    if (!activeChatId) {
      dispatch({type: SEND_MESSAGE_FAILURE, payload: `No active chat id: ${activeChatId}`});
      return Promise.error();
    }

    return sendMessageApi(activeChatId, message, token)
      .then(data => {
        dispatch({type: SEND_MESSAGE_SUCCESS, payload: data});
        dispatch(fetchChat(activeChatId));
      })
      .catch(err => dispatch({type: SEND_MESSAGE_SUCCESS, payload: err}));
  }
}
