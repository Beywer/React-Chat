import React from 'react';
import {withStyles} from 'material-ui/styles';
import BottomNavigation, {BottomNavigationAction} from "material-ui/BottomNavigation";
import RestoreIcon from 'material-ui-icons/Restore';
import ExploreIcon from 'material-ui-icons/Explore';

const styles = (theme) => ({});


const NavigationPanel = ({onMyChatsSelect, onAllChatsSelect}) => (
  <BottomNavigation showLabels>
    <BottomNavigationAction label="My Chats" icon={<RestoreIcon/>} onClick={onMyChatsSelect}/>
    <BottomNavigationAction label="Explore" icon={<ExploreIcon/>} onClick={onAllChatsSelect}/>
  </BottomNavigation>
);

export default withStyles(styles)(NavigationPanel);
