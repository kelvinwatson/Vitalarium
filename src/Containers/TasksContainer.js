import { connect } from 'react-redux';
// import DebugLog from '../Utils/DebugLog';
import Tasks from '../Components/Tasks/Tasks';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const TasksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks)

export default TasksContainer;
