import { connect } from 'react-redux';
// import DebugLog from '../Utils/DebugLog';
import Login from '../Components/Login/Login';
import { login } from '../Actions';

const mapStateToProps = (state) => {
  return {
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
