import React from 'react';
import {withStyles} from 'material-ui/styles';
import List from 'material-ui/List';
import ChatItem from "components/ChatItem";
import {getChatId} from "reducers/chats";

const styles = (theme) => ({
  chatsList: {
    height: 'calc(100% - 56px)',
    overflowY: 'auto',
  },
});

const ChatsList = ({classes, chats, activeChatId, onChatSelect, disabled}) => (
  <List className={classes.chatsList}>
    {chats && chats.map((chat, index) => (
      <ChatItem
        key={index}
        {...chat}
        disabled={disabled}
        selected={getChatId(chat) === activeChatId}
        onClick={() => onChatSelect(getChatId(chat))}
      />
    ))}
  </List>
);

export default withStyles(styles)(ChatsList);
