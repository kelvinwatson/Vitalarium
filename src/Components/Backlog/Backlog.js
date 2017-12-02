import React from 'react';
import { DraggableTypes } from '../../Models/DraggableTypes';
import { DropTarget } from 'react-dnd';
import TaskContainer from '../../Containers/TaskContainer';
import DebugLog from '../../Utils/DebugLog';
import './Backlog.css'

const backlogTarget = {
  drop(props, monitor){
    return {
      project: props.project,
      status: 'Dropped task to backlog',
      target: 'backlog',
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

class Backlog extends React.Component {
  constructor(props){
    super(props);
    this.onClickAddTask = this.onClickAddTask.bind(this);
    this.onClickBacklogTask = this.onClickBacklogTask.bind(this);
  }

  onClickAddTask(){
    this.props.onClickAddTask();
  }

  onClickBacklogTask(task){
    this.props.onClickBacklogTask(task);
  }

  render(){
    const {
      canDrop,
      isOver,
      tasks,
      taskJustCreated,
      connectDropTarget,
    } = this.props;

    DebugLog('Backlog tasks', tasks);

    let ren;
    if (tasks && tasks.length > 0){
      ren = tasks.map((task, index) =>
        <TaskContainer key={task.id} task={task} canDrag={true}
          onClick={(e)=>this.onClickBacklogTask(task)}
          isLast={index==(tasks.length-1)} isOdd={(index % 2 === 1)}
          isHighlight={taskJustCreated && taskJustCreated.id===task.id}/>
      );
    } else { //empty
      ren =
        <TaskContainer task={null} canDrag={false}
          onClick={this.onClickAddTask}
          caption={'No tasks yet'}
          cta={'Add a new task'}/>
    }
    return connectDropTarget(
      <div className="mh4-ns Tasks">
        <header className="fn pr4-ns">
          <h1 className="f2 lh-title fw9 mb3 mt0 pt3 bw2">
            Backlog
          </h1>
          <h2 className="f3 mid-gray lh-title">
          </h2>
        </header>

        <ul className="list pl0 mt1 measure">
          <li onClick={this.onClickAddTask}
            className="flex items-center   ph0-l b--black-10 dim Task">
            <i className="fa fa-plus w2 h2 w3-ns h3-ns br-100 fa-3x tc Task__Icon" aria-hidden="true"></i>
            <div className="pl3 flex-auto">
              <span className="f6 db black-70">Add a new task</span>
            </div>
          </li>
        </ul>

        <h2 className="f3 mid-gray lh-title">Tasks not yet assigned to a sprint</h2>
        <time className="f6 ttu tracked gray pb3">Drag & drop to add task to sprint</time>

        <ul className={`list pl0 mt3 measure ${isOver ? 'bg-light-green DragDropTarget__CursorMove DragDropTarget__DashedRoundedBorder' : canDrop ? 'DragDropTarget__DashedRoundedBorder':''}`}>
          <div className={`${isOver?'o-0':''}`}>
            {ren}
          </div>
        </ul>
      </div>
    )
  }
}
export default DropTarget(DraggableTypes.TASK, backlogTarget, collect)(Backlog);
