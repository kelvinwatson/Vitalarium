import React from 'react';
import { DraggableTypes } from '../../Models/DraggableTypes';
import { DropTarget } from 'react-dnd';
import TaskContainer from '../../Containers/TaskContainer';
import DebugLog from '../../Utils/DebugLog';
import '../../global.css';
import './Sprint.css'

const sprintTarget = {
  drop(props, monitor){
    DebugLog('drop props',props);
    return {
      status: 'Dropped task to sprint',
      target: 'sprint',
      sprint: props.sprint,
    }
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

class Sprint extends React.Component {
  render(){
    const {
      canDrop,
      hoverColor,
      onClickSprintTask,
      connectDropTarget,
      isOver,

      caption,
      sprint,
      title,
    } = this.props;

    let sprintTasks;
    if (sprint.tasks && sprint.tasks.length > 0){
      sprintTasks = sprint.tasks.map((task, index) =>
        <TaskContainer key={task.id} task={task} canDrag={true}
          onClick={(e)=>onClickSprintTask(task)} 
          isLast={index===(sprint.tasks.length-1)}/>
      );
    } else {
      sprintTasks =
        <TaskContainer task={null} canDrag={false}
          caption={'DRAG AND DROP TASK HERE'}
          cta={''}/>
    }


    return connectDropTarget(
      <div>
        <div className="fn">
          <h2 className="f3 mid-gray lh-title">
            {title}
          </h2>
          <time className="Sprint__Time">{sprint.startDate} to {sprint.endDate}</time>
          <p className="f6 ttu tracked gray">{caption}</p>

          <div className="Sprint mb5">
            <ul className={`list pl0 measure ${isOver ? 'bg-light-green DragDropTarget__CursorMove DragDropTarget__DashedRoundedBorder' : canDrop ? 'DragDropTarget__DashedRoundedBorder':''}`}>
              <div className={`${isOver?'o-0':''}`}>
                {sprintTasks}
              </div>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default DropTarget(DraggableTypes.TASK, sprintTarget, collect)(Sprint);
