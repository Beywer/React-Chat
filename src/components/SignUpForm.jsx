import React from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from "material-ui/TextField/TextField";
import Button from "material-ui/Button/Button";

const styles = (theme) => ({
  form: {
    padding: theme.spacing.unit * 3
  },
  topOffset: {
    marginTop: theme.spacing.unit * 2
  }
});

class SignUpForm extends React.Component {

  state = {
    username: {value: '', isValid: true},
    password: {value: '', isValid: true},
    repeatedPassword: {value: '', isValid: true},
  };

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();

    if (!this.validate()) {
      return;
    }

    const {username, password} = this.state;
    this.props.onSubmit(username.value, password.value);
  }

  validate() {
    const password = this.state.password.value, repeatedPassword = this.state.repeatedPassword.value;
    const usernameIsValid = !!this.state.username.value,
      passwordIsValid = !!password && password === repeatedPassword,
      repeatedPasswordIsValid = !!repeatedPassword && password === repeatedPassword;
    this.setState((prevState => ({
      username: {...prevState.username, isValid: usernameIsValid},
      password: {...prevState.password, isValid: passwordIsValid},
      repeatedPassword: {...prevState.repeatedPassword, isValid: repeatedPasswordIsValid}
    })));
    return usernameIsValid && passwordIsValid && repeatedPasswordIsValid;
  }

  render() {
    const {classes} = this.props;
    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <TextField
          required
          fullWidth
          type="text"
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
        <TextField
          required
          fullWidth
          type="password"
          className={classes.topOffset}
          label="Repeat password"
          placeholder="Repeat your password"
          name="repeatedPassword"
          value={this.state.repeatedPassword.value}
          error={!this.state.repeatedPassword.isValid}
          onChange={this.handleInputChange}
        />

        <Button
          variant="raised"
          color="primary"
          fullWidth
          type="submit"
          className={classes.topOffset}
        >Login</Button>
      </form>
    )
  }
}
export default withStyles(styles)(SignUpForm);
