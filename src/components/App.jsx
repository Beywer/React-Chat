import {Router, Route, Switch, Redirect} from 'react-router-dom';
import React from 'react';

import ChatPage from "containers/ChatPage";
import WelcomePage from "containers/WelcomePage";
import PrivateRoute from "containers/PrivateRoute";
import history from 'utils/history';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/(welcome)?" component={WelcomePage}/>
      <PrivateRoute path="/chat" component={ChatPage}/>
      <Redirect to="/"/>
    </Switch>
  </Router>
);

export default App;
