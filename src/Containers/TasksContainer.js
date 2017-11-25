import { connect } from 'react-redux';
// import DebugLog from '../Utils/DebugLog';
import Tasks from '../Components/Tasks/Tasks';
import { createTaskOpenModal } from '../Actions';

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickAddTask: ()=>{
      dispatch(createTaskOpenModal());
    },
  }
}

const TasksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks)

export default TasksContainer;
