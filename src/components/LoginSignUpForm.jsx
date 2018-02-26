import React from 'react';
import {withStyles} from 'material-ui/styles';
import classNames from "classnames";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";


const styles = (theme) => ({
  form: {
    padding: theme.spacing.unit * 3
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 1
  },
  submitButton: {
    marginTop: theme.spacing.unit * 2
  },
  username: {},
  password: {},
  repeatedPassword: {}
});

class LoginSignUpForm extends React.Component {

  state = {
    username: '',
    password: '',
    repeatedPassword: ''
  };

  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
  }

  handleValueChange(e, valueName) {
    this.setState({[valueName]: e.target.value});
  }

  handleSubmitButtonClick() {
    const {classes, isSignUpForm} = this.props;
    const {username, password, repeatedPassword} = this.state;
    if (!username) {
      return this.highlightEmptyField(classes.username);
    }
    if (!password) {
      return this.highlightEmptyField(classes.password);
    }
    if (isSignUpForm) {
      if (!repeatedPassword) {
        return this.highlightEmptyField(classes.repeatedPassword);
      } else if (password !== repeatedPassword) {
        return this.setState({repeatedPassword: ''}, () => this.highlightEmptyField(classes.repeatedPassword));
      }
    }
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit({username, password, repeatedPassword});
    }
  }

  highlightEmptyField(className) {
    const input = document.querySelector(`.${className} input`);
    if (input) input.focus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSignUpForm !== this.props.isSignUpForm) {
      this.setState({username: '', password: '', repeatedPassword: ''});
    }
  }

  render() {
    const {isSignUpForm, classes} = this.props;
    const {repeatedPassword, username, password} = this.state;
    return (
      <div className={classes.form}>
        <TextField
          required
          autoFocus
          fullWidth={true}
          value={username}
          onChange={(e) => this.handleValueChange(e, 'username')}
          className={classNames(classes.textField, classes.username)}
          label="Username"
          placeholder="Type your username..."/>
        <TextField
          required
          fullWidth={true}
          type="password"
          value={password}
          onChange={(e) => this.handleValueChange(e, 'password')}
          className={classNames(classes.textField, classes.password)}
          label="Password"
          placeholder="Type your password..."/>
        {isSignUpForm && <TextField
          required
          fullWidth={true}
          type="password"
          value={repeatedPassword}
          onChange={(e) => this.handleValueChange(e, 'repeatedPassword')}
          className={classNames(classes.textField, classes.repeatedPassword)}
          label="Repeat password"
          placeholder="Repeat your password..."/>
        }

        <Button
          variant="raised"
          color="primary"
          fullWidth
          onClick={this.handleSubmitButtonClick}
          className={classes.submitButton}>
          {isSignUpForm ? 'Sign up' : 'Login'}
        </Button>

      </div>
    )
  }
}

export default withStyles(styles)(LoginSignUpForm);
