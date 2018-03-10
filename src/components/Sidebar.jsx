import React from 'react';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

import ChatsList from "components/ChatsList";
import SearchBar from "components/SearchBar";
import NavigationPanel from "components/NavigationPanel";
import CreateChatButton from "components/CreateChatButton";

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

const Sidebar = ({classes, chats, onMyChatsSelect, onAllChatsSelect, onChatSelect, onChatCreate}) => (
  <Drawer
    variant="permanent"
    classes={{paper: classes.drawerPaper}}>
    <SearchBar/>
    <Divider/>
    <ChatsList
      chats={chats}
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
);

export default withStyles(styles)(Sidebar);
