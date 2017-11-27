import { connect } from 'react-redux';
// import DebugLog from '../Utils/DebugLog';
import TutorialOverlay from '../Components/TutorialOverlay/TutorialOverlay';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state) => {
  return {
    isShow: state.login.isFirstTime,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const TutorialOverlayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorialOverlay)

export default TutorialOverlayContainer;
