import React from 'react';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Reboot from 'material-ui/Reboot';
import TextField from 'material-ui/TextField';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import BottomNavigation, {BottomNavigationAction} from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import Explore from 'material-ui-icons/Explore';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Paper from 'material-ui/Paper';

const styles = theme => {
  return {
    root: {
      width: '100%',
      height: 430,
      marginTop: theme.spacing.unit * 3,
      zIndex: 1,
      overflow: 'hidden',
    },
    appFrame: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    appBar: {
      position: 'absolute',
      width: `calc(100% - 320px)`,
    },
    'appBar-left': {
      marginLeft: 320,
    },
    'appBar-right': {
      marginRight: 320,
    },
    drawerPaper: {
      position: 'relative',
      height: '100%',
      width: 320,
    },
    drawerHeader: theme.mixins.toolbar,
    content: {
      backgroundColor: theme.palette.background.default,
      width: '100%',
      padding: theme.spacing.unit * 3,
      height: 'calc(100% - 56px)',
      marginTop: 56,
      [theme.breakpoints.up('sm')]: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
      display: 'flex',
      flexFlow: 'column nowrap'
    },
    chatIcon: {
      marginRight: theme.spacing.unit * 2
    },
    messagesList: {
      flex: 1,
      display: 'flex',
      flexFlow: 'column nowrap'
    },
    message: {
      width: 'auto',
      maxWidth: '50%'
    },
    ownMessage: {
      width: 'auto',
      maxWidth: '50%',
      alignSelf: 'flex-end',
      display: 'flex',
      flexFlow: 'row-reverse nowrap',

    },
    messagePaper: {
      margin: theme.spacing.unit * 1,
      padding: theme.spacing.unit * 1.5
    },
    eventInfo: {
      display: 'block',
    },
    messageInputContainer: {
      padding: theme.spacing.unit * 2,
    }
  }
};

const chats = [
  {name: 'React Talks', shortName: "RT", lastUpdate: '2 min ago'},
  {name: 'Riot Talks', shortName: "RT", lastUpdate: '5 min ago'},
  {name: 'Elite dangerous', shortName: "ED", lastUpdate: '2 days ago'},
];

const messages = [
  {type: 'MESSAGE', message: 'Hello message', userName: 'Beywer', shortName: 'Be', time: '2 min ago'},
  {type: 'EVENT', userName: 'Ann', info: 'joined', time: '2 min ago'},
  {type: 'MESSAGE', message: 'Hi everyone', userName: 'Ann', shortName: 'A', time: '1 min ago'},
];

class App extends React.Component {

  render() {
    const {classes} = this.props;
    return (
      <Reboot>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Avatar classes={{root: classes.chatIcon}}>
                <div>RT</div>
              </Avatar>
              <Typography variant="title" color="inherit" noWrap>
                DogeCodes React Chat
              </Typography>
              <IconButton
                aria-label="More"
                color="inherit"
                // aria-owns={anchorEl ? 'long-menu' : null}
                aria-haspopup="true"
              >
                <MoreVertIcon/>
              </IconButton>

              <div style={{flex: 1}}></div>

              <IconButton
                aria-label="More"
                color="inherit"
                aria-haspopup="true"
              >
                <AccountCircle/>
              </IconButton>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            classes={{paper: classes.drawerPaper}}>
            <Toolbar className={classes.drawerHeader}>
              <TextField fullWidth={true} placeholder="Search chats"/>
            </Toolbar>
            <Divider/>
            <List>
              {chats.map(chatInfo => (
                <ListItem key={chatInfo.name} button>
                  <Avatar>
                    <div>{chatInfo.shortName}</div>
                  </Avatar>
                  <ListItemText primary={chatInfo.name} secondary={chatInfo.lastUpdate}/>
                </ListItem>
              ))}
            </List>

            <BottomNavigation
              value={0}
              // onChange={this.handleChange}
              showLabels
            >
              <BottomNavigationAction label="My chats" icon={<RestoreIcon/>}/>
              <BottomNavigationAction label="Explore" icon={<Explore/>}/>
            </BottomNavigation>
          </Drawer>

          <main className={classes.content}>
            <List classes={{root: classes.messagesList}}>
              {messages.map((messageInfo, idx) => {
                  if (messageInfo.type === 'MESSAGE') {
                    return <ListItem key={idx}
                                     classes={{root: messageInfo.userName === 'Beywer' ? classes.ownMessage : classes.message}}>
                      <Avatar>
                        <div>{messageInfo.shortName}</div>
                      </Avatar>
                      <Paper elevation={3} classes={{root: classes.messagePaper}}>
                        <Typography variant="title" color="inherit" noWrap>{messageInfo.userName}</Typography>
                        <Typography>{messageInfo.message}</Typography>
                        <Typography variant='caption' noWrap>{messageInfo.time}</Typography>
                      </Paper>
                    </ListItem>
                  } else {
                    return <ListItem key={idx} classes={{root: classes.eventInfo}}>
                      <Typography variant="body1" align='center'
                                  noWrap>{messageInfo.userName} {messageInfo.info}</Typography>
                      <Typography variant='caption' align='center' noWrap>{messageInfo.time}</Typography>
                    </ListItem>
                  }
                }
              )}
            </List>
            <Paper elevation={2} classes={{root: classes.messageInputContainer}}>
              <TextField fullWidth={true} placeholder="Type your message..."/>
            </Paper>
          </main>
        </div>
      </Reboot>
    );
  }
}

export default withStyles(styles)(App);
