import React from 'react';
import {Redirect} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import Tabs, {Tab} from "material-ui/Tabs";

import LoginForm from "components/LoginForm";
import SignUpForm from "components/SignUpForm";

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
});

class WelcomePage extends React.Component {

  state = {};

  constructor(props) {
    super(props);
    this.state = {selectedTabIndex: 0};
    this.handleTabItemClick = this.handleTabItemClick.bind(this);
  }

  handleTabItemClick(e, tabIndex) {
    this.setState({selectedTabIndex: tabIndex});
  }

  render() {
    const {classes, signup, login, isAuthenticated} = this.props;
    const {selectedTabIndex} = this.state;
    console.log(this.props);

    if (isAuthenticated) {
      return <Redirect to="/chat"/>
    }

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

            {selectedTabIndex === 0 && <LoginForm onSubmit={login}/>}
            {selectedTabIndex === 1 && <SignUpForm onSubmit={signup}/>}
          </Paper>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(WelcomePage);
