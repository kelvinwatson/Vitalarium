import React from 'react';
import { Link } from 'react-router-dom';
import { DraggableTypes } from '../../Models/DraggableTypes';
import { DropTarget } from 'react-dnd';
import Task from '../Task/Task';
import DebugLog from '../../Utils/DebugLog';
import './Sprints.css'

const sprintTarget = {
  drop(props,monitor){
    DebugLog('drop',props);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Sprints extends React.Component {
  render(){
    const {
      currSprint,
      nextSprint,
      onClickSprintTask,
      connectDropTarget,
      isOver,
    } = this.props;

    DebugLog('currSprint',currSprint);
    DebugLog('nextSprint',nextSprint);
    let renCurrSprintTasks, renNextSprintTasks;
    if (currSprint.tasks && currSprint.tasks.length > 0){
      renCurrSprintTasks = currSprint.tasks.map((task, index) => {
        return <Task onClick={(e)=>onClickSprintTask(task)} key={task.id} task={task} isLast={index===(currSprint.tasks.length-1)}/>
      });
    } else {
      renCurrSprintTasks = <Task task={null} caption={'DRAG AND DROP TASK HERE'} cta={''}/>
    }
    if (nextSprint.tasks && nextSprint.tasks.length > 0){
      renNextSprintTasks = nextSprint.tasks.map((task, index) => {
        return <Task onClick={(e)=>onClickSprintTask(task)} key={task.id} task={task} isLast={index===(nextSprint.tasks.length-1)}/>
      });
    }else{
      renNextSprintTasks = <Task task={null} caption={'DRAG AND DROP TASK HERE'} cta={''}/>;
    }

    return connectDropTarget(
      <div className="mh4-ns Sprints">
        <header className="fn">
          <h1 className="f2 lh-title fw9 mb3 mt0 pt3 bw2">
            Sprints
          </h1>
        </header>

        <div className="fn">
          <h2 className="f3 mid-gray lh-title">
            Current Sprint
          </h2>
          <time className="Sprints__Time">{currSprint.startDate} to {currSprint.endDate}</time>
          <p className="f6 ttu tracked gray">-- Your tasks for this sprint --</p>

          <div className="Sprint mt3">
            <ul className="list pl0 mt0 measure">
              {renCurrSprintTasks}
              {/*<li className="flex items-center   ph0-l bb b--black-10 dim Task">
                <i className="fa fa-edit w2 h2 w3-ns h3-ns br-100 fa-3x tc Task__Icon" aria-hidden="true"></i>
                <div className="pl3 flex-auto">
                  <span className="f6 db black-70">Do laundry</span>
                  <span className="f6 db black-70">Small</span>
                </div>
                <div>
                  <a href="tel:" className="f6 link blue hover-dark-gray">Due 15-Dec-2017</a>
                </div>
              </li>*/}
            </ul>
          </div>
        </div>

        <div className="fn mt5">
          <h2 className="f3 mid-gray lh-title">
            Next Sprint
          </h2>
          <time className="Sprints__Time">{nextSprint.startDate} to {nextSprint.endDate}</time>
          <p className="f6 ttu tracked gray">-- Looking ahead --</p>

          <div className="Sprint mt3">
            <ul className="list pl0 mt0 measure">
              {renNextSprintTasks}
            </ul>
          </div>
        </div>

        {/*<div className="fn fl-ns">
          <p className="lh-copy measure mt4 mt0-ns">

          </p>
        </div>*/}
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'red',
          }} />
        }
      </div>
    )
  }
}

export default DropTarget(DraggableTypes.TASK, sprintTarget, collect)(Sprints);
