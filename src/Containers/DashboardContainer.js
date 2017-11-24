import { connect } from 'react-redux';
// import DebugLog from '../Utils/DebugLog';
import Dashboard from '../Components/Dashboard/Dashboard';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: Boolean(state.login.user),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer;
