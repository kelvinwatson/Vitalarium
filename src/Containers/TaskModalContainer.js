import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import TaskModal from '../Components/TaskModal/TaskModal';
import { createTask, createTaskCloseModal, createTaskCloseWarningModal } from '../Actions';
import Task from '../Models/Task';

const mapStateToProps = (state) => {
  return {
    userId: state.login.user.id,
    projectId: state.project.project.id,
    currentSprintId: state.project.project.sprints[0].id,
    nextSprintId: state.project.project.sprints[1].id,
    projectId: state.project.project.id,
    isOpen: state.task.isOpenCreateTaskModal,
    isShowCloseWarning: state.task.isShowCreateCloseWarningModal,
    isCreateSuccess: state.task.isCreateSuccess,
    isCreateFailure: state.task.isCreateFailure,
  }
}

const mapDispatchToProps = (dispatch, own) => {
  return {
    createTask: (task)=>{
      dispatch(createTask(task));
    },
    close: ()=>{
      dispatch(createTaskCloseModal());
    },
    showCloseCreateTaskWarningModal: () => {
      dispatch(createTaskCloseWarningModal());
    }
  }
}

const TaskModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModal)

export default TaskModalContainer;
