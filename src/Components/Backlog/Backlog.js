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
    // canDrop: monitor.canDrop(),
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
      tasks,
      taskJustCreated,
      connectDropTarget,
      isOver,
    } = this.props;

    let ren;
    if (tasks && tasks.length > 0){
      ren = tasks.map((task, index) =>
        <TaskContainer onClick={(e)=>this.onClickBacklogTask(task)} key={task.id} task={task} isLast={index==(tasks.length-1)} isHighlight={taskJustCreated && taskJustCreated.id===task.id}/>
      )
    } else { //empty
      ren = <TaskContainer onClick={this.onClickAddTask} task={null} caption={'No tasks yet'} cta={'Add a new task'}/>
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

        <ul className="list pl0 mt0 measure">
          <li onClick={this.onClickAddTask}
            className="flex items-center   ph0-l b--black-10 dim Task">
            <i className="fa fa-plus w2 h2 w3-ns h3-ns br-100 fa-3x tc Task__Icon" aria-hidden="true"></i>
            <div className="pl3 flex-auto">
              <span className="f6 db black-70">Add a new task</span>
            </div>
            <div>
            </div>
          </li>
        </ul>

        <h2 className="f3 mid-gray lh-title">Tasks not yet assigned to a sprint</h2>
        <time className="f6 ttu tracked gray">Drag & drop to add task to sprint</time>

        <ul className={`list pl0 mt3 measure ${isOver ? 'bg-green' : '' }`}>
          {ren}
        </ul>

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
export default DropTarget(DraggableTypes.TASK, backlogTarget, collect)(Backlog);
