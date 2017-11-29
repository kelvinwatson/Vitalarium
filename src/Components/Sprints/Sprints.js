import React from 'react';
import { Link } from 'react-router-dom';
import Sprint from '../Sprint/Sprint';
import Task from '../Task/Task';
import DebugLog from '../../Utils/DebugLog';
import './Sprints.css'

export default class Sprints extends React.Component {
  render(){
    const {
      currSprint,
      nextSprint,
      onClickSprintTask,
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

    return (
      <div className="mh4-ns Sprints">
        <header className="fn">
          <h1 className="f2 lh-title fw9 mb3 mt0 pt3 bw2">
            Sprints
          </h1>
        </header>

        <Sprint sprint={currSprint}
          title={'Current Sprint'} caption={'-- YOUR TASKS FOR THIS SPRINT --'}
          hoverColor={'green'}/>

        <Sprint sprint={nextSprint}
          title={'Next Sprint'} caption={'-- LOOKING AHEAD --'}
          hoverColor={'blue'}/>
      </div>
    )
  }
}
