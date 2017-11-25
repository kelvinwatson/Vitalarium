import { connect } from 'react-redux';
// import DebugLog from '../Utils/DebugLog';
import TaskModal from '../Components/TaskModal/TaskModal';
import { createTask, createTaskCloseModal } from '../Actions';
import Task from '../Models/Task';

const mapStateToProps = (state) => {
  return {
    isOpen: state.task.isOpenModal,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveTask: (id, title, description, size, sprint, dueDate, comments)=>{
      dispatch(createTask(new Task(id, title, description, size, sprint, dueDate, comments)));
    },
    onOutsideModalContentClicked: ()=>{      
      dispatch(createTaskCloseModal());
    }
  }
}

const TaskModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModal)

export default TaskModalContainer;
