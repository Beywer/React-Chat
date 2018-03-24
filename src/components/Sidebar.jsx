import React from 'react';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

import ChatsList from "components/ChatsList";
import SearchBar from "components/SearchBar";
import NavigationPanel from "components/NavigationPanel";
import CreateChatButton from "components/CreateChatButton";
import {getChatName} from "reducers/chats";

const styles = (theme) => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: 320,
  },
  newChatButton: {
    position: 'absolute',
    left: 'auto',
    right: theme.spacing.unit * 3,
    bottom: theme.spacing.unit * 2 + 48, // + bottom navigation
  },
});


class Sidebar extends React.Component {

  state = {
    filterString: ''
  };

  handleFilterStringChange = (e) => this.setState({filterString: e.target.value});

  render() {
    const {classes, chats, onMyChatsSelect, onAllChatsSelect, activeChatId, onChatSelect, onChatCreate} = this.props;
    const {filterString} = this.state;

    const filteredChats = filterString ? chats.filter(chat => getChatName(chat).indexOf(filterString) !== -1) : chats;

    return (
      <Drawer
        variant="permanent"
        classes={{paper: classes.drawerPaper}}>
        <SearchBar
          onChange={this.handleFilterStringChange}
        />
        <Divider/>
        <ChatsList
          chats={filteredChats}
          activeChatId={activeChatId}
          onChatSelect={onChatSelect}
        />

        <CreateChatButton
          className={classes.newChatButton}
          onChatCreate={onChatCreate}
        />
        <NavigationPanel
          onMyChatsSelect={onMyChatsSelect}
          onAllChatsSelect={onAllChatsSelect}
        />
      </Drawer>
    )
  }
}

export default withStyles(styles)(Sidebar);
