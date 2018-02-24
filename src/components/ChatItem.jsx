import React from 'react';
import {withStyles} from 'material-ui/styles';

import Avatar from "material-ui/Avatar";
import {ListItem, ListItemText} from "material-ui/List";

import titleInitials from "utils/titleInitials";

const styles = (theme) => ({});

const ChatItem = ({chat}) => (
    <ListItem button>
        <Avatar>{titleInitials(chat.title)}</Avatar>
        <ListItemText primary={chat.title}/>
    </ListItem>
);

export default withStyles(styles)(ChatItem);
