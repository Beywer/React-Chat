import Message from "components/Message";
import React from 'react';
import {withStyles} from 'material-ui/styles';
import * as fromMessages from 'reducers/messages';
import * as fromAuth from 'reducers/auth';
import Typography from "material-ui/Typography/Typography";

const styles = (theme) => ({
    messagesWrapper: {
      overflowX: 'hidden',
      width: '100%',
      padding: theme.spacing.unit * 3,
      boxSizing: 'border-box',
      height: '100%',
      paddingBottom: '112px',
    },
    nowMessages: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    }
  })
;

class MessageList extends React.Component {

  componentDidMount() {
    this.scrollDownHistory();
  }

  componentDidUpdate() {
    this.scrollDownHistory();
  }

  scrollDownHistory() {
    const messagesWrapper = this.refs.messagesWrapper;
    if (messagesWrapper) {
      messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    }
  }

  render() {
    const {classes, messages, currentUserId} = this.props;

    const nowMessages = !messages || (messages.length === 0);

    const content = nowMessages ? (
        <div className={classes.nowMessages}>
          <Typography variant="display1">There is no messages yet</Typography>
        </div>
      )
      :
      (
        messages.map((message) =>
          <Message key={fromMessages.getMessageId(message)}
                   sender={fromAuth.getUsername(fromMessages.getSender(message))}
                   content={fromMessages.getContent(message)}
                   createdAt={fromMessages.createdAt(message)}
                   isStatusMessage={fromMessages.isStatusMessage(message)}
                   isMessageFromMe={fromAuth.getUserId(fromMessages.getSender(message)) === currentUserId}/>
        )
      );

    return (
      <div className={classes.messagesWrapper} ref="messagesWrapper">
        {content}
      </div>
    )
  }
}

export default withStyles(styles)(MessageList);
