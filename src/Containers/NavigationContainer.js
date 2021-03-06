import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Navigation from '../Components/Navigation/Navigation';
import { login, logout } from '../Actions';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    // page: state.navigation.page,
    // list: state.navigation.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNavigationClicked: (target) => {
      // dispatch(setNavigation(target));
      // DebugLog('nav clicked', target);
    },
    onLoginLogoutClicked: (e, isLoggedIn)=>{
      if (isLoggedIn){
        // e.preventDefault();
        dispatch(logout());
      }
    },
  }
}

const NavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

export default NavigationContainer;
