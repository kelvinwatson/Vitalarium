import { connect } from 'react-redux';
// import DebugLog from '../Utils/DebugLog';
import TaskModal from '../Components/TaskModal/TaskModal';
import { createTask, createTaskCloseModal, createTaskCloseWarningModal } from '../Actions';
import Task from '../Models/Task';

const mapStateToProps = (state) => {
  return {
    isOpen: state.task.isOpenCreateTaskModal,
    isShowCloseWarning: state.task.isShowCloseWarningModal,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTask: (id, title, description, size, sprint, dueDate, comments)=>{
      dispatch(createTask(new Task(id, title, description, size, sprint, dueDate, comments)));
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
