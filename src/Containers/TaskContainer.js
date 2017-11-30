import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Task from '../Components/Task/Task';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    caption: ownProps.caption,
    cta: ownProps.cta,
    isLast: ownProps.isLast,
    isHighlight: ownProps.isHighlight,
    onClick: ownProps.onClick,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDropTask: (task, dropResult)=>{
      DebugLog('dispatch updateTask here!!!');
    }
  }
}

const TaskContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Task)

export default TaskContainer;
