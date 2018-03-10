import React from 'react';
import {withStyles} from 'material-ui/styles';

import Avatar from "components/Avatar";
import {ListItem, ListItemText} from "material-ui/List";

const styles = (theme) => ({});

const ChatItem = ({classes, title, onClick}) => (
  <ListItem button onClick={onClick}>
    <Avatar colorFrom={title}>{title}</Avatar>
    <ListItemText primary={title}/>
  </ListItem>
);

export default withStyles(styles)(ChatItem);
