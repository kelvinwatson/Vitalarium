import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Backlog from '../Components/Backlog/Backlog';
import { createTaskOpenModal, updateTaskOpenPanel } from '../Actions';

const mapStateToProps = (state) => {
  return {
    taskJustCreated: state.task.task,
    tasks: state.project.project.backlog,
    project: state.project.project,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickAddTask: ()=>{
      dispatch(createTaskOpenModal());
    },
    onClickBacklogTask: (task) => {
      DebugLog('onClickBacklogTask task',task);
      dispatch(updateTaskOpenPanel(task));
    },
  }
}

const BacklogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Backlog)

export default BacklogContainer;
