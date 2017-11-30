import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Task from '../Components/Task/Task';
import { updateTask } from '../Actions';

const mapStateToProps = (state, ownProps) => {
  return {
    caption: ownProps.caption,
    cta: ownProps.cta,
    isLast: ownProps.isLast,
    isHighlight: ownProps.isHighlight,
    onClick: ownProps.onClick,
    // isOver: ownProps.isOver,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDropTask: (task, dropResult)=>{
      preprocessTaskForDragDrop(task, dropResult);

      DebugLog('dispatch updateTask here!!!');
    }
  }
}

const preprocessTaskForDragDrop = (task, dropResult) => {
  switch(dropResult.target){
    case 'backlog':
      break;
    case 'sprint':
      const previousSprint = task.sprint; //set source sprint
      task.sprint = dropResult.sprint.id; //set destination sprint
      return {

      }
      break;
  }
};

const TaskContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Task)

export default TaskContainer;
