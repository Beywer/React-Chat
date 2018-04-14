import React from 'react';
import {withStyles} from 'material-ui/styles';
import grey from 'material-ui/colors/grey';

import Avatar from "components/Avatar";
import {ListItem, ListItemText} from "material-ui/List";
import Typography from "material-ui/Typography/Typography";
import {fromNow} from "utils/date";

const styles = (theme) => ({
  selected: {
    backgroundColor: grey[200]
  },
  chatInfo: {
    padding: `0 ${theme.spacing.unit}px`
  }
});

const ChatItem = ({classes, title, createdAt, onClick, selected, disabled}) => (
  <ListItem button onClick={onClick} className={selected ? classes.selected : ''} disabled={disabled}>
    <Avatar colorFrom={title}>{title}</Avatar>
    <div className={classes.chatInfo}>
      <ListItemText primary={title}/>
      <Typography variant="caption">{fromNow(createdAt)}</Typography>
    </div>
  </ListItem>
);

export default withStyles(styles)(ChatItem);
