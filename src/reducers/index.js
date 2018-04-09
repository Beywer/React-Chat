import {combineReducers} from 'redux';
import auth from './auth';
import chats from './chats';
import messages from './messages';
import services from "reducers/services";

export default combineReducers({
  auth,
  chats,
  messages,
  services,
});
