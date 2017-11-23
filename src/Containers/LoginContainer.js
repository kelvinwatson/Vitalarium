import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Login from '../Components/Login/Login';
import { login } from '../Actions';

const mapStateToProps = (state) => {
  DebugLog('LoginContainer state',state);
  return {
    isLoginInProgress: state.login.isLoading,
    isLoginSuccess: state.login.isSuccess,
    isLoginFailure: state.login.isFailure,
    status: state.login.status,
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
