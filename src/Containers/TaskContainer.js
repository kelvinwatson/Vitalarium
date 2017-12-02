import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Task from '../Components/Task/Task';
import { updateTask } from '../Actions';

const mapStateToProps = (state, ownProps) => {
  DebugLog('ownProps',ownProps);
  return {
    caption: ownProps.caption,
    cta: ownProps.cta,
    isLast: ownProps.isLast,
    isOdd: ownProps.isOdd,
    index: ownProps.index,
    isHighlight: ownProps.isHighlight,
    onClick: ownProps.onClick,
    // isOver: ownProps.isOver,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDropTask: (task, dropResult)=>{
      const prevSprintId = task.sprint;
      switch(dropResult.target){
        case 'backlog':
          task.sprint = 'backlog';
          break;
        default:
          task.sprint = dropResult.sprint.id;
      }
      dispatch(updateTask(task, prevSprintId));
    }
  }
}


const TaskContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Task)

export default TaskContainer;
