import * as types from 'constants/chats';
import {combineReducers} from "redux";

const initialState = {
  activeId: '',
  allIds: [],
  myIds: [],
  byIds: {}
};

const activeId = (state = initialState.activeId, action = {}) => {
  switch (action.type) {
    case types.SET_ACTIVE_CHAT:
      return getChatId(action.payload.chat);
    case types.UNSET_ACTIVE_CHAT:
      return '';
    default:
      return state;
  }
};

const allIds = (state = initialState.allIds, action = {}) => {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    case types.CREATE_CHAT_SUCCESS:
      return [...state, getChatId(action.payload.chat)];
    case types.DELETE_CHAT_SUCCESS:
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
      return [...state, getChatId(action.payload.chat)];
    case types.DELETE_CHAT_SUCCESS:
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
        }, {})
      };
    case types.CREATE_CHAT_SUCCESS:
      return {
        ...state,
        [getChatId(action.payload.chat)]: action.payload.chat
      };
    case types.DELETE_CHAT_SUCCESS:
      const newState = {...state};
      delete newState[getChatId(action.payload.chat)];
      return newState;
    default:
      return state;
  }
};

export const getChatId = (chat) => chat._id;
export const getChat = (state, id) => state.byIds[id];
export const getByIds = (state, idList) => idList.map(id => state.byIds[id]);
export const isChatCreator = (state, userId, chatId) => {
  if (!chatId) return false;
  const chat = getChat(state, chatId);
  if (!chat) return false;
  return chat.creator && chat.creator._id === userId;
};
export const isChatMember = (state, userId, chatId) => {
  return getChat(state, chatId)
    .members
    .map(m => m._id)
    .indexOf(userId) !== -1;
};

export const chatsReducer = combineReducers({
  activeId,
  allIds,
  myIds,
  byIds
});

export default chatsReducer;
