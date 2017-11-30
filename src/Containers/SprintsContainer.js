import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Sprints from '../Components/Sprints/Sprints';
import { updateTaskOpenPanel } from '../Actions';

const mapStateToProps = (state) => {
  return {
    currSprint: state.project.project.sprints[0],
    nextSprint: state.project.project.sprints[1],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onClickTask: ()=> {
    //   DebugLog('task clicked');
    // },
    onClickSprintTask: (task) => {
      DebugLog('onClickSprintTask task',task);
      dispatch(updateTaskOpenPanel(task));
    }
  }
}

const SprintsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sprints)

export default SprintsContainer;
