import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Login from '../Components/Login/Login';

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer;
