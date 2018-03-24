import React from 'react';
import {withStyles} from 'material-ui/styles';
import grey from 'material-ui/colors/grey';

import Avatar from "components/Avatar";
import {ListItem, ListItemText} from "material-ui/List";

const styles = (theme) => ({
  selected: {
    backgroundColor: grey[200]
  }
});

const ChatItem = ({classes, title, onClick, selected}) => (
  <ListItem button onClick={onClick} className={selected ? classes.selected : ''}>
    <Avatar colorFrom={title}>{title}</Avatar>
    <ListItemText primary={title}/>
  </ListItem>
);

export default withStyles(styles)(ChatItem);
