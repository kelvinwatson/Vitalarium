import React from 'react';
import { Link } from 'react-router-dom';
import { DraggableTypes } from '../../Models/DraggableTypes';
import { DropTarget } from 'react-dnd';
import Task from '../Task/Task';
import DebugLog from '../../Utils/DebugLog';
import './Sprint.css'

const sprintTarget = {
  drop(props, monitor){
    DebugLog('drop props',props);
    DebugLog('drop monitor',monitor);
    return {
      sprint: props.sprint,
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    // canDrop: monitor.canDrop(),
  };
}

class Sprint extends React.Component {
  render(){
    const {
      caption,
      hoverColor,
      sprint,
      title,
      onClickSprintTask,
      connectDropTarget,
      isOver,
    } = this.props;

    let sprintTasks;
    if (sprint.tasks && sprint.tasks.length > 0){
      sprintTasks = sprint.tasks.map((task, index) =>
        <Task onClick={(e)=>onClickSprintTask(task)} key={task.id} task={task}
          isLast={index===(sprint.tasks.length-1)}/>
      );
    } else {
      sprintTasks = <Task task={null} caption={'DRAG AND DROP TASK HERE'} cta={''}/>
    }


    return connectDropTarget(
      <div>
        <div className="fn">
          <h2 className="f3 mid-gray lh-title">
            {title}
          </h2>
          <time className="Sprint__Time">{sprint.startDate} to {sprint.endDate}</time>
          <p className="f6 ttu tracked gray">{caption}</p>

          <div className="Sprint mt3">
            <ul className={`list pl0 mt0 measure ${isOver ? 'bg-green' : '' }`}>
              {sprintTasks}
            </ul>
          </div>
        </div>

        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.3,
            backgroundColor: 'gray',
          }} />
        }
      </div>
    )
  }
}

export default DropTarget(DraggableTypes.TASK, sprintTarget, collect)(Sprint);
