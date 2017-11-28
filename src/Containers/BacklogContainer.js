import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Backlog from '../Components/Backlog/Backlog';
import { createTaskOpenModal } from '../Actions';

const mapStateToProps = (state) => {
  return {
    taskJustCreated: state.task.task,
    tasks: state.project.project.backlog,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickAddTask: ()=>{
      dispatch(createTaskOpenModal());
    },
  }
}

const BacklogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Backlog)

export default BacklogContainer;
