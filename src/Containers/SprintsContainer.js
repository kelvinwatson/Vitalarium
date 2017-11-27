import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Sprints from '../Components/Sprints/Sprints';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state) => {
  DebugLog('SprintsContainer',state.project.project.sprints[0]);
  DebugLog('SprintsContainer',state.project.project.sprints[1]);

  

  return {
    currSprint: state.project.project.sprints[0],
    nextSprint: state.project.project.sprints[1],
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
