import React from 'react';
import {withStyles} from 'material-ui/styles';
import Input from "material-ui/Input";
import Paper from "material-ui/Paper";
import Button from "material-ui/Button/Button";

const styles = (theme) => ({
  messageInputWrapper: {
    position: 'fixed',
    left: 'auto',
    right: '20px',
    bottom: 0,
    width: `calc(100% - 320px - 20px)`,
    padding: theme.spacing.unit * 3,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default
  },
  messageInput: {
    padding: theme.spacing.unit * 2,
  },
});

class MessageInput extends React.Component {

  state = {
    message: '',
  };

  handleMessageChange = (e) => {
    this.setState({message: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.message) return;

    this.props.onMessageInput(this.state.message);
    this.setState({message: ''});
  };

  render() {
    const {classes, isChatMemberOrCreator, joinChat} = this.props;
    const {message} = this.state;
    return (
      <form className={classes.messageInputWrapper} onSubmit={this.handleSubmit}>
        <Paper className={classes.messageInput} elevation={6}>
          {isChatMemberOrCreator && <Input fullWidth
                                           type="text"
                                           placeholder="Type your message…"
                                           value={message}
                                           onChange={this.handleMessageChange}/>
          }
          {!isChatMemberOrCreator && <Button variant="raised" color="primary" fullWidth={true} onClick={joinChat}>
            JOIN
          </Button>
          }
        </Paper>
      </form>
    )
  }
}

export default withStyles(styles)(MessageInput);
