import React from 'react';
import {withStyles} from 'material-ui/styles';
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import Tabs, {Tab} from "material-ui/Tabs";
import TextField from "material-ui/TextField/TextField";
import Button from "material-ui/es/Button/Button";

const styles = (theme) => ({
  formWrapper: {
    textAlign: 'center',
    padding: theme.spacing.unit * 3
  },
  formPaper: {
    display: 'inline-block',
    width: '500px',
  },
  tabItem: {
    flex: '1 0'
  },
  form: {
    padding: theme.spacing.unit * 3
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 1
  },
  submitButton: {
    marginTop: theme.spacing.unit * 2
  }
});

class WelcomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedTabIndex: 0};
    this.handleTabItemClick = this.handleTabItemClick.bind(this);
  }

  handleTabItemClick(e, tabIndex) {
    this.setState({selectedTabIndex: tabIndex});
  }

  render() {
    const {classes} = this.props;
    const {selectedTabIndex} = this.state;
    return (<div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              DogeCodes React Chat
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.formWrapper}>
          <Paper className={classes.formPaper}>
            <AppBar position="static" color="default">
              <Tabs
                value={selectedTabIndex}
                indicatorColor="secondary"
                textColor="inherit"
                onChange={this.handleTabItemClick}>
                <Tab label="Login" className={classes.tabItem}/>
                <Tab label="Sign up" className={classes.tabItem}/>
              </Tabs>
            </AppBar>


            <div className={classes.form}>
              <TextField
                ref="username"
                required
                fullWidth={true}
                className={classes.textField}
                label="Username"
                placeholder="Type your username..."/>
              <TextField
                ref="password"
                required
                fullWidth={true}
                type="password"
                className={classes.textField}
                label="Password"
                placeholder="Type your password..."/>
              {selectedTabIndex === 1 &&
              <TextField
                ref="passwordRepeat"
                required
                fullWidth={true}
                type="password"
                className={classes.textField}
                label="Repeat password"
                placeholder="Repeat your password..."/>
              }

              <Button
                variant="raised"
                color="primary"
                fullWidth
                className={classes.submitButton}>
                {selectedTabIndex === 0 ? 'Login' : 'Sign up'}
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(WelcomePage);
