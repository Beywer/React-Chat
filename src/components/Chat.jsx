import React from 'react';
import {withStyles} from 'material-ui/styles';

import MessageList from "components/MessageList";
import MessageInput from "components/MessageInput";
import Paper from "material-ui/Paper/Paper";
import Typography from "material-ui/Typography/Typography";

const styles = (theme) => ({
  chatLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  greetContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  greenMessage: {
    padding: theme.spacing.unit * 3
  }
});

const Chat = ({classes, messages, isChatMemberOrCreator, currentUserId, activeChatId, joinChat, sendMessage}) => (
  <main className={classes.chatLayout}>
    {/* Приветсвенное сообщение, если не выбран чат */}
    {!activeChatId && <div className={classes.greetContainer}>
      <Paper className={classes.greenMessage}>
        <Typography variant="display1" paragraph={true}>
          Start messaging…
        </Typography>
        <Typography variant="body1" gutterBottom={false}>
          Use <strong>Global</strong> to explore communities around here.
        </Typography>
        <Typography variant="body1" gutterBottom={false}>
          Use <strong>Recents</strong> to see your recent conversations.
        </Typography>
      </Paper>
    </div>}


    {activeChatId && <MessageList messages={messages} currentUserId={currentUserId}/>}
    {activeChatId && <MessageInput isChatMemberOrCreator={isChatMemberOrCreator}
                                   joinChat={() => joinChat(activeChatId)}
                                   onMessageInput={sendMessage}/>}
  </main>
);

export default withStyles(styles)(Chat);
