import {bindActionCreators} from 'redux';
import WelcomePage from 'components/WelcomePage';
import {connect} from 'react-redux';
import {signup, login} from 'actions/auth';
import * as fromAuth from 'reducers/auth';

const mapStateToProps = (state) => ({
  isAuthenticated: fromAuth.isAuthenticated(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signup,
  login
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
