import React from 'react';
import {withStyles} from 'material-ui/styles';
import BottomNavigation, {BottomNavigationAction} from "material-ui/BottomNavigation";
import RestoreIcon from 'material-ui-icons/Restore';
import ExploreIcon from 'material-ui-icons/Explore';

const styles = (theme) => ({});

class NavigationPanel extends React.Component {
  state = {
    value: 0
  };

  handleNavigationChange = (e, value) => {
    this.setState({value});
    if (value === 0) return this.props.onMyChatsSelect();
    if (value === 1) return this.props.onAllChatsSelect();
  };

  render() {
    const {value} = this.state;
    return (
      <BottomNavigation showLabels value={value} onChange={this.handleNavigationChange}>
        <BottomNavigationAction label="My Chats" icon={<RestoreIcon/>}/>
        <BottomNavigationAction label="Explore" icon={<ExploreIcon/>}/>
      </BottomNavigation>
    )
  }
}


export default withStyles(styles)(NavigationPanel);
