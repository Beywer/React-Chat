import { getChatMessages } from 'reducers/chats';
import { FETCH_CHAT_SUCCESS } from 'constants/chats';
import { RECEIVE_MESSAGE } from 'constants/sockets';

const initialState = [];

export default function messagesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return [...state, action.payload.message];
    case FETCH_CHAT_SUCCESS:
      return [...getChatMessages(action.payload.chat)];
    default:
      return state;
  }
}

export const getMessages = state => state.messages;

export const getMessageId = message => message._id;
export const getSender = message => message.sender;
export const getContent = message => message.content;
export const createdAt = message => message.createdAt;
export const isStatusMessage = message => message.statusMessage || false;
