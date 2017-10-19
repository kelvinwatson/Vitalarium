import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Navigation from '../Components/Navigation/Navigation';
// import { setNavigation, unsetNavigation } from '../Actions';

const mapStateToProps = (state) => {

  DebugLog('state',state);
  return {
    page: state.navigation.page,
    list: state.navigation.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNavigationClicked: (target) => {
      // dispatch(setNavigation(target));
      DebugLog('nav clicked', target);
    }
  }
}

const NavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)

export default NavigationContainer;
