import { connect } from 'react-redux';
// import DebugLog from '../Utils/DebugLog';
import Sprints from '../Components/Sprints/Sprints';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const SprintsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sprints)

export default SprintsContainer;
