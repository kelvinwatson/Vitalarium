import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import TaskPanel from '../Components/TaskPanel/TaskPanel';
import { updateTask, updateTaskClosePanel, updateTaskCloseWarningModal } from '../Actions';
import Task from '../Models/Task';

const mapStateToProps = (state) => {
  return {
    task: state.task.task,
    // userId: state.login.user.id,
    // projectId: state.project.project.id,
    currentSprintId: state.project.project.sprints[0].id,
    nextSprintId: state.project.project.sprints[1].id,
    isOpen: state.task.isOpenUpdateTaskPanel,
    // isShowCloseWarning: state.task.isShowCreateCloseWarningModal,
    // isCreateFailure: state.task.isCreateFailure,
  }
}

const mapDispatchToProps = (dispatch, own) => {
  return {
    updateTask: (task, prevSprint) => {
      DebugLog('updateTask task', task);
      DebugLog('updateTask prevSprint', prevSprint);
      dispatch(updateTask(task, prevSprint));
    },
    close: ()=>{
      dispatch(updateTaskClosePanel());
    },
    showCloseCreateTaskWarningModal: () => {
      // dispatch(createTaskCloseWarningModal());
    }
  }
}

const TaskPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskPanel)

export default TaskPanelContainer;
