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
    DebugLog('beginDrag',props.task);
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
    DebugLog('item', item);
    DebugLog('endDrag task',item.task);
    DebugLog('endDrag dropResult',dropResult);
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
      isHighlight,
      onClick,
      task,
      connectDragSource,
      isDragging,
    } = this.props;

    let ren;
    if (task){
      ren =
        <li onClick={onClick}
          className={`${isHighlight? 'Task--Highlight':''} flex items-center ph0-l ${isLast?'':'bb'} b--black-10 dim Task`}>
          <i className="fa fa-edit w2 h2 w3-ns h3-ns br-100 fa-3x tc Task__Icon" aria-hidden="true"></i>
          <div className="pl3 flex-auto">
            <span className="f6 db black-70">{task.title}</span>
            <span className="f6 db black-70">Sprint: {task.sprint}</span>
          </div>
          <div>
            <a className="f6 link blue hover-dark-gray">Due {convertDateMillsecondsToHyphenatedMonthName(task.dueDate)}</a>
          </div>
        </li>;

    } else { //empty state
      ren =
        <li onClick={onClick} className="flex items-center ph0-l b--black-10 dim Task Task--Empty Task__AnimatedBackground--EmptyState bg-washed-green">
          <i className="fa fa-arrows w2 h2 w3-ns h3-ns br-100 fa-3x tc Task__Icon" aria-hidden="true"></i>
          <div className="pl3 flex-auto">
            <span className="f6 db black-70">{caption}</span>
            <span className="f6 db black-70"></span>
          </div>
          <div>
            <a className="f6 link blue hover-dark-gray">{cta}</a>
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
