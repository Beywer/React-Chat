import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import ChatPage from 'components/ChatPage';
import * as fromChats from 'reducers/chats'
import * as fromAuth from 'reducers/auth';
import * as fromMessages from 'reducers/messages';
import {createChat, fetchAllChats, fetchMyChats, setActiveChat, deleteChat, joinChat, leaveChat} from 'actions/chats';
import {logout, updateUserProfile} from "actions/auth";
import {sendMessage, mountChat, unmountChat, socketsConnect} from "actions/sockets";
import {getChatErrorMessage, getIsConnected} from "reducers/services";

const mapStateToProps = (state) => {
  const activeChatId = fromChats.getActiveChatId(state);
  const activeChat = fromChats.getChat(state, activeChatId);
  const currentUser = fromAuth.getCurrentUser(state);
  const currentUserId = fromAuth.getUserId(currentUser);

  return {
    allChats: fromChats.getByIds(state, fromChats.getAllIds(state)),
    myChats: fromChats.getByIds(state, fromChats.getMyIds(state)),
    activeChat,
    activeChatId,
    isChatMember: fromChats.isChatMember(state, currentUserId, activeChatId),
    isChatCreator: fromChats.isChatCreator(state, currentUserId, activeChatId),
    isChatMemberOrCreator: fromChats.isChatMemberOrCreator(state, currentUserId, activeChatId),
    messages: fromMessages.getMessages(state),
    currentUserId,
    currentUser,
    error: getChatErrorMessage(state),
    isConnected: getIsConnected(state)
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchAllChats,
  fetchMyChats,
  setActiveChat,
  createChat,
  deleteChat,
  leaveChat,
  logout,
  joinChat,
  sendMessage,
  updateUserProfile,
  mountChat,
  unmountChat,
  socketsConnect
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
