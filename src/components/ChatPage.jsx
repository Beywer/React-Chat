import ChatHeader from "components/ChatHeader";
import {withStyles} from 'material-ui/styles';
import Sidebar from "components/Sidebar";
import Chat from "components/Chat";
import React from 'react';

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
    const {fetchAllChats, fetchMyChats} = this.props;
    Promise.all([fetchAllChats(), fetchMyChats()]);
  }

  render() {
    const {
      classes,
      allChats,
      myChats,
      getChat,
      isChatCreator,
      createChat,
      setActiveChat,
      deleteChat,
      logout
    } = this.props;
    const chats = this.state.showOnlyMyChats ? myChats : allChats;
    const messages = [];
    const activeChatId = this.props.location.pathname.replace('/chat/', '');
    const activeChat = getChat(activeChatId) || {};
    return (
      <div className={classes.root}>
        <ChatHeader
          chatName={activeChat && activeChat.title}
          isChatCreator={isChatCreator(activeChatId)}
          onChatDelete={() => deleteChat(activeChatId)}
          onLogout={logout}
        />
        <Sidebar
          chats={chats}
          onMyChatsSelect={this.handleMyChatsSelect}
          onAllChatsSelect={this.handleAllChatsSelect}
          onChatCreate={createChat}
          onChatSelect={setActiveChat}
        />
        <Chat
          messages={messages}
        />
      </div>);
  }
}

export default withStyles(styles)(ChatPage);
