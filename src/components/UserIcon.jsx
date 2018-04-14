import React from 'react';
import {withStyles} from 'material-ui/styles';
import IconButton from "material-ui/IconButton";
import Menu, {MenuItem} from "material-ui/Menu";
import MUIUserIcon from "material-ui-icons/AccountCircle";
import Modal from "material-ui/Modal/Modal";
import UserProfile from "components/UserProfile";
import {getUserFirstName, getUserLastName, getUsername} from "reducers/auth";

const styles = (theme) => ({
  menuButton: {
    color: 'white'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class UserIcon extends React.Component {

  state = {
    userMenuAnchor: null,
    isUserProfileOpen: false
  };

  handleUserMenuOpen = (e) => this.setState({userMenuAnchor: e.currentTarget});
  handleUserMenuClose = () => this.setState({userMenuAnchor: null});
  handleEditProfileClick = () => {
    this.handleUserMenuClose();
    this.setState({isUserProfileOpen: true});
  };
  handleLogoutClick = () => {
    this.handleUserMenuClose();
    this.props.onLogout();
  };


  handleUserProfileSave = (username, firstName, lastName) => {
    if (this.props.onUserProfileChange) this.props.onUserProfileChange(username, firstName, lastName);
  };
  handleUserProfileClose = (e) => {
    this.setState({isUserProfileOpen: false});
  };

  render() {
    const {userMenuAnchor, isUserProfileOpen} = this.state;
    const {classes, currentUser, disabled} = this.props;

    return (
      <React.Fragment>
        <IconButton
          className={classes.menuButton}
          onClick={this.handleUserMenuOpen}
          disabled={disabled}
        >
          <MUIUserIcon/>
        </IconButton>

        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={this.handleUserMenuClose}
        >
          <MenuItem onClick={this.handleEditProfileClick}>Edit profile</MenuItem>
          <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
        </Menu>

        <Modal
          disableAutoFocus={true}
          open={isUserProfileOpen}
          onClose={this.handleUserProfileClose}
          className={classes.modal}
        >
          <UserProfile
            username={getUsername(currentUser)}
            firstName={getUserFirstName(currentUser)}
            lastName={getUserLastName(currentUser)}
            onSave={this.handleUserProfileSave}
            onClose={this.handleUserProfileClose}
          />
        </Modal>

      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserIcon);
