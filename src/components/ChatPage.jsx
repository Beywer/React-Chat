import React from 'react';
import {withStyles} from 'material-ui/styles';
import * as fromChats from 'reducers/chats';

import ChatHeader from "components/ChatHeader";
import Sidebar from "components/Sidebar";
import Chat from "components/Chat";
import ErrorMessage from "components/ErrorMessage";

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
});

class ChatPage extends React.Component {

  state = {
    showOnlyMyChats: true,
    activeChat: {}
  };

  handleMyChatsSelect = () => this.setState({showOnlyMyChats: true});
  handleAllChatsSelect = () => this.setState({showOnlyMyChats: false});

  componentDidMount() {
    const {fetchAllChats, fetchMyChats, socketsConnect} = this.props;

    Promise.all([fetchAllChats(), fetchMyChats()])
      .then(() => {
        socketsConnect();
      });

    // Смена чата при переходе по ссылке
    const activeChatId = this.props.location.pathname.replace('/chat/', '');
    if (activeChatId !== this.props.activeChatId) {
      this.props.setActiveChat(activeChatId);
    }
  }

  render() {
    const {
      classes,
      allChats,
      myChats,
      createChat,
      activeChat,
      activeChatId,
      setActiveChat,
      isChatMember,
      isChatCreator,
      isChatMemberOrCreator,
      deleteChat,
      leaveChat,
      logout,
      joinChat,
      messages,
      sendMessage,
      currentUserId,
      currentUser,
      updateUserProfile,
      error,
    } = this.props;
    const chats = this.state.showOnlyMyChats ? myChats : allChats;

    return (
      <div className={classes.root}>
        <ChatHeader
          chatName={fromChats.getChatName(activeChat)}
          isChatMember={isChatMember}
          isChatCreator={isChatCreator}
          onLogout={logout}
          onChatLeave={() => leaveChat(activeChatId)}
          onChatDelete={() => deleteChat(activeChatId)}
          currentUser={currentUser}
          updateUserProfile={updateUserProfile}
        />
        <Sidebar
          chats={chats}
          onMyChatsSelect={this.handleMyChatsSelect}
          onAllChatsSelect={this.handleAllChatsSelect}
          activeChatId={activeChatId}
          onChatCreate={createChat}
          onChatSelect={setActiveChat}
        />
        <Chat
          messages={messages}
          activeChatId={activeChatId}
          isChatMemberOrCreator={isChatMemberOrCreator}
          joinChat={joinChat}
          sendMessage={sendMessage}
          currentUserId={currentUserId}
        />

        <ErrorMessage error={error}/>
      </div>);
  }
}

export default withStyles(styles)(ChatPage);
