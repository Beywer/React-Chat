import React from 'react';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Button from "material-ui/Button";
import AddIcon from 'material-ui-icons/Add';

import ChatsList from "components/ChatsList";
import SearchBar from "components/SearchBar";
import NavigationPanel from "components/NavigationPanel";

const styles = (theme) => ({
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: 320,
    },
    newChatButton: {
        position: 'absolute',
        left: 'auto',
        right: theme.spacing.unit * 3,
        bottom: theme.spacing.unit * 2 + 48, // + bottom navigation
    },
});

const Sidebar = ({classes, chats}) => (
    <Drawer
        variant="permanent"
        classes={{paper: classes.drawerPaper}}>
        <SearchBar/>
        <Divider/>
        <ChatsList chats={chats}/>

        <Button
            variant="fab"
            color="primary"
            className={classes.newChatButton}>
            <AddIcon/>
        </Button>
        <NavigationPanel/>
    </Drawer>
);

export default withStyles(styles)(Sidebar);
