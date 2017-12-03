import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Login from '../Components/Login/Login';
import { login } from '../Actions';

const mapStateToProps = (state) => {
  return {
    isLoginInProgress: state.login.isLoading,
    isLoginSuccess: state.login.isSuccess,
    isLoginFailure: state.login.isFailure,
    isLoggedIn: state.login.isLoggedIn,
    user: state.login.user,
    status: state.login.status,
    previousProvider: state.login.previousProvider,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSignIn: (provider)=>{
      dispatch(login(provider));
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer;
