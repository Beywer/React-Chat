import React from 'react';
import withStyles from "material-ui/styles/withStyles";
import Paper from "material-ui/Paper/Paper";
import Typography from "material-ui/Typography/Typography";
import TextField from "material-ui/TextField/TextField";
import Button from "material-ui/Button/Button";

const styles = (theme) => ({
  paper: {
    padding: theme.spacing.unit * 2.5,
    width: '40%'
  },
  textField: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class UserProfile extends React.Component {

  handleUsernameChange = (e) => this.updateUserProfile('username', e.target.value);
  handleFirstNameChange = (e) => this.updateUserProfile('firstName', e.target.value);
  handleLastNameChange = (e) => this.updateUserProfile('lastName', e.target.value);
  updateUserProfile = (valueName, value) => this.setState({[valueName]: value});

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.validate()) {
      return;
    }

    const {username, firstName, lastName} = this.state;
    this.props.onSave(username, firstName, lastName);
    this.props.onClose();
  };

  validate = () => {
    if (!this.state.username) {
      this.setState({isUsernameValid: false});
      return false;
    }

    this.setState({isUsernameValid: true});
    return true;
  };

  constructor(props) {
    super(props);
    this.state = {
      username: props.username || '',
      firstName: props.firstName || '',
      lastName: props.lastName || '',
      isUsernameValid: true,
    }
  }

  render() {
    const {username, firstName, lastName} = this.state;
    const {classes} = this.props;

    return (
      <Paper className={classes.paper}>
        <form onSubmit={this.handleSubmit}>
          <Typography variant="title">Edit profile</Typography>

          <TextField
            fullWidth
            required
            value={username}
            className={classes.textField}
            label="Username"
            placeholder="Enter your username"
            onChange={this.handleUsernameChange}
          />

          <TextField
            fullWidth
            value={firstName}
            className={classes.textField}
            label="First name"
            placeholder="Enter your first name"
            onChange={this.handleFirstNameChange}
          />

          <TextField
            fullWidth
            value={lastName}
            className={classes.textField}
            label="Last name"
            placeholder="Enter your last name"
            onChange={this.handleLastNameChange}
          />

          <Button
            color="primary"
            type="submit"
          >Save</Button>

          <Button
            onClick={this.handleSubmit}
          >Close</Button>

        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(UserProfile);
