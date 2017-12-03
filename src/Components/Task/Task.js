import React from 'react';
import { Link } from 'react-router-dom';
import { DragSource } from 'react-dnd';
import { DraggableTypes } from '../../Models/DraggableTypes';
import DebugLog from '../../Utils/DebugLog';
import { convertDateMillsecondsToHyphenatedMonthName }  from '../../Utils/DateUtils';
import { switchTheme } from '../../Utils/Themes';
import './Task.css'

const taskSource = {
  beginDrag(props){
    return {
      task: props.task,
    };
  },

  canDrag: function(props, monitor) {
    return props.canDrag; //disable empty task dragging
  },

  endDrag(props, monitor, component) {
    //emit drag stop action

    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    // CardActions.moveCardToList(item.id, dropResult.listId);

    //TODO: dispatch(updateTask()) with new sprint
    props.onDropTask(item.task, dropResult)
  }
};

/**
 * Specifies which props to inject into the Task component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class Task extends React.Component {
  render(){
    const {
      caption,
      cta,
      isLast,
      isOdd,
      index,
      isHighlight,
      onClick,
      task,
      connectDragSource,
      isDragging,
    } = this.props;

    //<a className={`f6 hover-dark-gray Task__Status ${task.status === 'Not Started' ? 'Task__Status--NotStarted' : task.status === 'In Progress' ? 'Task__Status--InProgress' : 'Task__Status--Done'}`}>{task.status}</a>

    let statusIcon;
    if (task){
      if (task.status === 'Not Started'){
        statusIcon = 'fa-circle-o Task__Status--NotStartedColor';
      }
      else if (task.status === 'In Progress'){
        statusIcon = 'fa-spinner Task__Status--InProgressColor';
      } else {
        statusIcon = 'fa-check-circle-o Task__Status--DoneColor ';
      }
    }
    let ren;
    if (task){
      ren =
        <li onClick={onClick}
          className={`${isOdd ? '':'Task__BackgroundGray'} ${isHighlight? 'Task--Highlight':''} flex items-center ph0-l ${isLast?'':''} b--black-10 dim Task Task__NonEmpty`}>
          <i className="fa fa-pencil w2 h2 w3-ns h3-ns br-100 fa-2x tc Task__Icon Task__NonEmptyIcon" aria-hidden="true"></i>
          <div className="pl3 flex-auto">
            <span className="f6 db black-70">{task.title}</span>
            {/*<span className="f6 db black-70">Sprint: {task.sprint}</span>*/}
          </div>
          <a className="Task__StatusIconWrapper" title={task.status} aria-hidden="true">
            <i className={`fa ${statusIcon} w2 h2 w3-ns h3-ns br-100 fa-2x Task__StatusIcon`} aria-hidden="true"></i>
          </a>
        </li>;

    } else { //empty state
      ren =
        <li onClick={onClick} className="flex items-center ph0-l b--black-10 dim Task Task--Empty Task__AnimatedBackground--EmptyState bg-washed-green">
          <i className="fa fa-arrows w2 h2 w3-ns h3-ns br-100 fa-2x tc Task__Icon Task--EmptyIcon" aria-hidden="true"></i>
          <div className="pl3 flex-auto">
            <span className="f6 db black-70">{caption}</span>
            {/*<span className="f6 db black-70"></span>*/}
          </div>
          <div>
            <a className="f6 link blue hover-dark-gray Task__Cta">{cta}</a>
          </div>
        </li>
    }
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isDragging? 'yellow' : '',
        cursor: 'move',
        }}>
        {ren}
      </div>
    )
  }
}
export default DragSource(DraggableTypes.TASK, taskSource, collect)(Task);
