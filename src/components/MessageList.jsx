import Message from "components/Message";
import React from 'react';
import {withStyles} from 'material-ui/styles';
import * as fromMessages from 'reducers/messages';
import * as fromAuth from 'reducers/auth';

const styles = (theme) => ({
    messagesWrapper: {
      overflowX: 'hidden',
      width: '100%',
      padding: theme.spacing.unit * 3,
      boxSizing: 'border-box',
      height: '100%',
      paddingBottom: '112px',
    },
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
    return (
      <div className={classes.messagesWrapper} ref="messagesWrapper">
        {messages && messages.map((message) =>
          <Message key={fromMessages.getMessageId(message)}
                   sender={fromAuth.getUsername(fromMessages.getSender(message))}
                   content={fromMessages.getContent(message)}
                   createdAt={fromMessages.createdAt(message)}
                   isStatusMessage={fromMessages.isStatusMessage(message)}
                   isMessageFromMe={fromAuth.getUserId(fromMessages.getSender(message)) === currentUserId}/>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(MessageList);
