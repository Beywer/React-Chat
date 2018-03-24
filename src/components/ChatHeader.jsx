import React from 'react';
import {withStyles} from 'material-ui/styles';
import Typography from "material-ui/Typography/Typography";
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Menu from "material-ui/Menu/Menu";
import MenuItem from "material-ui/Menu/MenuItem";
import IconButton from "material-ui/IconButton/IconButton";
import MoreVertIcon from "material-ui-icons/MoreVert";
import UserIcon from 'components/UserIcon';

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
  };

  handleMenuOpen = (e) => this.setState({menuButtonAnchor: e.currentTarget});
  handleMenuClose = () => this.setState({menuButtonAnchor: null});
  handleDeleteChatClick = (e) => {
    this.handleMenuClose();
    this.props.onChatDelete();
  };
  handleLeaveChatClick = (e) => {
    this.handleMenuClose();
    this.props.onChatLeave();
  };


  render() {
    const {classes, chatName, isChatCreator, isChatMember, onLogout, currentUser, updateUserProfile} = this.props;
    const {menuButtonAnchor} = this.state;

    return (
      <AppBar color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            {chatName || 'DogeCodes React Chat'}
          </Typography>

          {
            (isChatCreator || isChatMember) &&
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
            {isChatCreator && <MenuItem onClick={this.handleDeleteChatClick}>Delete</MenuItem>}
            {isChatMember && <MenuItem onClick={this.handleLeaveChatClick}>Leave</MenuItem>}
          </Menu>

          <div className={classes.spaceDivider}/>

          <UserIcon
            onLogout={onLogout}
            currentUser={currentUser}
            onUserProfileChange={updateUserProfile}
          />
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(ChatHeader);
