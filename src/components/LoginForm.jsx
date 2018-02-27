import React from 'react';
import fetch from 'isomorphic-fetch';
import {withStyles} from 'material-ui/styles';
import TextField from "material-ui/TextField/TextField";
import Button from "material-ui/es/Button/Button";

const styles = (theme) => ({
  form: {
    padding: theme.spacing.unit * 3
  },
  topOffset: {
    marginTop: theme.spacing.unit * 2
  }
});

class LoginForm extends React.Component {

  state = {
    username: {value: '', isValid: true},
    password: {value: '', isValid: true},
  };

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleInputChange(e) {
    const {value, name} = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value
      }
    }));
  }

  handleSubmitClick(e) {
    if (!this.validate()) {
      return;
    }

    fetch('https://dogecodes-chat-api.herokuapp.com/v1/login', {
      method: 'POST',
      query: {
        test1: 'asdfasd',
        test2: 23
      },
      body: JSON.stringify({
        username: this.state.username.value,
        password: this.state.password.value
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(console.log)
      .catch(console.error);
  }

  validate() {
    const usernameIsValid = !!this.state.username.value,
      passwordIsValid = !!this.state.password.value;
    this.setState((prevState => ({
      username: {...prevState.username, isValid: usernameIsValid},
      password: {...prevState.password, isValid: passwordIsValid}
    })));
    return usernameIsValid && passwordIsValid;
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.form}>
        <TextField
          required
          fullWidth
          className={classes.topOffset}
          label="Username"
          placeholder="Input your username"
          name="username"
          value={this.state.username.value}
          error={!this.state.username.isValid}
          onChange={this.handleInputChange}
        />
        <TextField
          required
          fullWidth
          type="password"
          className={classes.topOffset}
          label="Password"
          placeholder="Input your password"
          name="password"
          value={this.state.password.value}
          error={!this.state.password.isValid}
          onChange={this.handleInputChange}
        />

        <Button
          variant="raised"
          color="primary"
          fullWidth
          className={classes.topOffset}
          onClick={this.handleSubmitClick}
        >Login</Button>
      </div>
    )
  }
}

export default withStyles(styles)(LoginForm);
