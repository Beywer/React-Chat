import React from 'react';
import {withStyles} from 'material-ui/styles';

import Avatar from "components/Avatar";
import {ListItem, ListItemText} from "material-ui/List";

const styles = (theme) => ({});

const ChatItem = ({classes, title}) => (
  <ListItem button>
    <Avatar colorFrom={title}>{title}</Avatar>
    <ListItemText primary={title}/>
  </ListItem>
);

export default withStyles(styles)(ChatItem);
