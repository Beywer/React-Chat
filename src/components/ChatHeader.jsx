import React from 'react';
import {withStyles} from 'material-ui/styles';
import Typography from "material-ui/Typography/Typography";
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Menu from "material-ui/Menu/Menu";
import MenuItem from "material-ui/Menu/MenuItem";
import IconButton from "material-ui/IconButton/IconButton";
import MoreVertIcon from "material-ui-icons/MoreVert";
import UserIcon from "material-ui-icons/AccountCircle";

const styles = (theme) => ({
  appBar: {
    position: 'fixed',
    width: `calc(100% - 320px)`,
  },
  menuButton: {
    color: 'white'
  },
  spaceDivider: {
    flex: '1 0'
  }
});

class ChatHeader extends React.Component {

  state = {
    menuButtonAnchor: null,
    userMenuAnchor: null
  };

  handleMenuOpen = (e) => this.setState({menuButtonAnchor: e.currentTarget});
  handleMenuClose = () => this.setState({menuButtonAnchor: null});
  handleDeleteChatClick = (e) => {
    this.handleMenuClose();
    this.props.onChatDelete();
  };

  handleUserMenuOpen = (e) => this.setState({userMenuAnchor: e.currentTarget});
  handleUserMenuClose = () => this.setState({userMenuAnchor: null});
  handleEditProfileClick = () => {
    this.handleUserMenuClose();
    console.log('handleEditProfileClick');
  };
  handleLogoutClick = () => {
    this.handleUserMenuClose();
    this.props.onLogout();
  };

  render() {
    const {classes, chatName, isChatCreator} = this.props;
    const {menuButtonAnchor, userMenuAnchor} = this.state;

    return (
      <AppBar color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            {chatName || 'DogeCodes React Chat'}
          </Typography>

          {
            isChatCreator &&
            <IconButton
              className={classes.menuButton}
              onClick={this.handleMenuOpen}
            >
              <MoreVertIcon/>
            </IconButton>
          }

          <Menu
            anchorEl={menuButtonAnchor}
            open={Boolean(menuButtonAnchor)}
            onClose={this.handleMenuClose}
          >
            <MenuItem onClick={this.handleDeleteChatClick}>
              Delete
            </MenuItem>
          </Menu>

          <div className={classes.spaceDivider}/>

          <IconButton
            className={classes.menuButton}
            onClick={this.handleUserMenuOpen}
          >
            <UserIcon/>
          </IconButton>

          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={this.handleUserMenuClose}
          >
            <MenuItem onClick={this.handleEditProfileClick}>Edit profile</MenuItem>
            <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(ChatHeader);
