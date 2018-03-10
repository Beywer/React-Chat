import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import ChatPage from 'components/ChatPage';
import * as fromChats from 'reducers/chats'
import * as fromAuth from 'reducers/auth';
import {createChat, fetchAllChats, fetchMyChats, setActiveChat, deleteChat} from 'actions/chats';
import {logout} from "actions/auth";

const mapStateToProps = (state) => ({
  allChats: fromChats.getByIds(state.chats, state.chats.allIds),
  myChats: fromChats.getByIds(state.chats, state.chats.myIds),
  getChat: (activeId) => fromChats.getChat(state.chats, activeId),
  isChatCreator: (chatId) => fromChats.isChatCreator(state.chats, fromAuth.getCurrentUserId(state.auth), chatId),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchAllChats,
  fetchMyChats,
  setActiveChat,
  createChat,
  deleteChat,
  logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
