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

    DebugLog('***SPRINTS currSprint',currSprint);
    DebugLog('***SPRINTS nextSprint',nextSprint);

    return (
      <div className="mh4-ns Sprints">
        <header className="fn">
          <h1 className="f2 lh-title fw9 mb3 mt0 pt3 bw2">
            Sprints
          </h1>
        </header>

        <Sprint sprint={currSprint} onClickSprintTask={onClickSprintTask}
          title={'Current Sprint'} caption={'-- YOUR TASKS FOR THIS SPRINT --'}
          hoverColor={'green'}/>

        <Sprint sprint={nextSprint} onClickSprintTask={onClickSprintTask}
          title={'Next Sprint'} caption={'-- LOOKING AHEAD --'}
          hoverColor={'blue'}/>
      </div>
    )
  }
}
