import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Sprints from '../Components/Sprints/Sprints';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state) => {
  return {
    currSprint: state.project.project.sprints[0],
    nextSprint: state.project.project.sprints[1],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickTask: ()=> {
      DebugLog('task clicked');
    }
  }
}

const SprintsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sprints)

export default SprintsContainer;
