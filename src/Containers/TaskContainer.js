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
      break;
  }
  DebugLog('preprocessTaskForDragDrop');
};

const TaskContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Task)

export default TaskContainer;
