import React from 'react';
import {withStyles} from 'material-ui/styles';
import Typography from "material-ui/Typography";
import Avatar from "components/Avatar";
import Paper from "material-ui/Paper";

import classnames from "classnames";
import colorFrom from "utils/colorFrom";
import {fromNow} from "utils/date";

const styles = (theme) => ({
  messageWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
  },
  messageWrapperFromMe: {
    justifyContent: 'flex-end',
  },
  statusMessageWrapper: {
    justifyContent: 'center',
    flexFlow: 'column nowrap'
  },
  message: {
    maxWidth: '70%',
    minWidth: '10%',
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
  },
  messageFromMe: {
    marginRight: theme.spacing.unit * 2,
    backgroundColor: '#e6dcff'
  },
});

const Message = ({sender, content, createdAt, classes, isStatusMessage, isMessageFromMe}) => {
  const userAvatar = (
    <Avatar colorFrom={sender}>{sender}</Avatar>
  );
  return (
    isStatusMessage ?
      <div className={classnames(
        classes.messageWrapper,
        classes.statusMessageWrapper
      )}>
        <Typography><span style={{color: colorFrom(sender)}}>{sender}</span> {content}</Typography>
        <Typography variant="caption">
          {fromNow(createdAt)}
        </Typography>
      </div>
      :
      <div className={classnames(
        classes.messageWrapper,
        isMessageFromMe && classes.messageWrapperFromMe
      )}>
        {!isMessageFromMe && userAvatar}
        <Paper className={classnames(
          classes.message,
          isMessageFromMe && classes.messageFromMe
        )}>
          <Typography variant="caption" style={{color: colorFrom(sender)}}>
            {sender}
          </Typography>
          <Typography variant="body1">
            {content}
          </Typography>
          <Typography variant="caption">
            {fromNow(createdAt)}
          </Typography>
        </Paper>
        {isMessageFromMe && userAvatar}
      </div>
  );
};

export default withStyles(styles)(Message);
