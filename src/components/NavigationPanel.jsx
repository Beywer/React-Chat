import React from 'react';
import {withStyles} from 'material-ui/styles';
import BottomNavigation, {BottomNavigationAction} from "material-ui/BottomNavigation";
import RestoreIcon from 'material-ui-icons/Restore';
import ExploreIcon from 'material-ui-icons/Explore';

const styles = (theme) => ({});

const NavigationPanel = () => (
    <BottomNavigation showLabels>
        <BottomNavigationAction label="My Chats" icon={<RestoreIcon/>}/>
        <BottomNavigationAction label="Explore" icon={<ExploreIcon/>}/>
    </BottomNavigation>
);

export default withStyles(styles)(NavigationPanel);
