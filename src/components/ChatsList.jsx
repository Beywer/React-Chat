import React from 'react';
import {withStyles} from 'material-ui/styles';
import List from 'material-ui/List';
import ChatItem from "components/ChatItem";

const styles = (theme) => ({
  chatsList: {
    height: 'calc(100% - 56px)',
    overflowY: 'auto',
  },
});

const ChatsList = ({classes, chats}) => (
  <List className={classes.chatsList}>
    {chats && chats.map((chat, index) => (
      <ChatItem key={index} {...chat}/>
    ))}
  </List>
);

export default withStyles(styles)(ChatsList);
