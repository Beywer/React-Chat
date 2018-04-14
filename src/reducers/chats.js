import * as types from 'constants/chats';
import { combineReducers } from 'redux';
import { RECEIVE_DELETE_CHAT, RECEIVE_NEW_CHAT } from 'constants/sockets';

const initialState = {
  activeId: '',
  allIds: [],
  myIds: [],
  byIds: {},
};

const activeId = (state = initialState.activeId, action = {}) => {
  switch (action.type) {
    case types.SET_ACTIVE_CHAT:
      return getChatId(action.payload.chat);
    case types.UNSET_ACTIVE_CHAT:
      return null;
    default:
      return state;
  }
};

const allIds = (state = initialState.allIds, action = {}) => {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    case types.CREATE_CHAT_SUCCESS:
    case RECEIVE_NEW_CHAT:
      return [...state, getChatId(action.payload.chat)];
    case types.DELETE_CHAT_SUCCESS:
    case RECEIVE_DELETE_CHAT:
      return state.filter(id => id !== getChatId(action.payload.chat));
    default:
      return state;
  }
};

const myIds = (state = initialState.myIds, action = {}) => {
  switch (action.type) {
    case types.FETCH_MY_CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    case types.CREATE_CHAT_SUCCESS:
    case types.JOIN_CHAT_SUCCESS:
      return [...state, getChatId(action.payload.chat)];
    case types.DELETE_CHAT_SUCCESS:
    case types.LEAVE_CHAT_SUCCESS:
    case RECEIVE_DELETE_CHAT:
      return state.filter(id => id !== getChatId(action.payload.chat));
    default:
      return state;
  }
};

const byIds = (state = initialState.byIds, action = {}) => {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
    case types.FETCH_MY_CHATS_SUCCESS:
      return {
        ...state,
        ...action.payload.chats.reduce((byIds, chat) => {
          byIds[getChatId(chat)] = chat;
          return byIds;
        }, {}),
      };
    case types.FETCH_CHAT_SUCCESS:
    case types.CREATE_CHAT_SUCCESS:
    case RECEIVE_NEW_CHAT:
      return {
        ...state,
        [getChatId(action.payload.chat)]: action.payload.chat,
      };
    case types.DELETE_CHAT_SUCCESS:
    case RECEIVE_DELETE_CHAT:
      const newState = { ...state };
      delete newState[getChatId(action.payload.chat)];
      return newState;
    default:
      return state;
  }
};

export const getActiveChatId = state => state.chats.activeId;
export const getChat = (state, id) => state.chats.byIds[id];
export const getMyIds = state => state.chats.myIds;
export const getAllIds = state => state.chats.allIds;
export const getByIds = (state, idList) => idList.map(id => state.chats.byIds[id]);

export const getChatId = chat => chat && chat._id;
export const getChatName = chat => chat && chat.title;
export const getChatMembers = chat => chat && chat.members;
export const getChatMessages = chat => chat && chat.messages;

export const isChatCreator = (state, userId, chatId) => {
  try {
    return getChat(state, chatId).creator._id === userId;
  } catch (err) {
    return false;
  }
};
export const isChatMember = (state, userId, chatId) => {
  try {
    return !!getChatMembers(getChat(state, chatId)).find(m => m._id === userId);
  } catch (err) {
    return false;
  }
};
export const isChatMemberOrCreator = (state, userId, chatId) =>
  isChatCreator(state, userId, chatId) || isChatMember(state, userId, chatId);

export const chatsReducer = combineReducers({
  activeId,
  allIds,
  myIds,
  byIds,
});

export default chatsReducer;
