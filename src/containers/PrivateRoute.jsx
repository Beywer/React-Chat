import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {receiveAuth} from 'actions/auth';
import * as fromAuth from 'reducers/auth';

class PrivateRoute extends React.Component {

  componentDidMount() {
    this.props.receiveAuth();
  }

  render() {
    const {component: Component, isAuthenticated, ...rest} = this.props;
    return (
      <React.Fragment>
        <Route {...rest} render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/welcome",
                state: {from: props.location}
              }}/>
          )
        }/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: fromAuth.isAuthenticated(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  receiveAuth
}, dispatch);


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PrivateRoute)
);
